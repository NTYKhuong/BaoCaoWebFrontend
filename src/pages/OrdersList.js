import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box } from "@mui/material";
import { message, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { createOrder, deleteOrder, getCustomerById, getOrder, getOrderById, getOrderDetailsByOrderId, updateOrder } from "../services/AdminService";
import OrdersForm from "../components/Orders/OrdersForm";
import axios from "axios";

const { confirm } = Modal;

const OrdersList = ({ searchOrder }) => {
  const [orders, setOrders] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);

  useEffect(() => {
    if(searchOrder !== "") {
      const filteredOrders = orders.filter((order) =>
        order.order_date.toString().includes(searchOrder.toString()) ||
        order.total_price.toString().includes(searchOrder.toString()) ||
        order.customer_name.toLowerCase().includes(searchOrder.toLowerCase())
      );
      setOrders(filteredOrders);
    }
    else {
      fetchOrders();      
    }
  }, [searchOrder]);

  const fetchOrders = async () => {
    try {
      const response = await getOrder();
      const fullOrder = response.map(order => {
        return axios.get(`http://localhost:5281/api/Customers/${order.customer_id}?id=${order.customer_id}`)
          .then(customerResponse => {
            const customerName = customerResponse.data.data.customer_name;
            return { ...order, customer_name: customerName };
          });
        });
      
        Promise.all(fullOrder)
        .then(order => {
          setOrders(order);
        });
    } catch (error) {
      message.error('Có lỗi khi tải hóa đơn:' + error);
    }
  };

  const openModal = (Order = null) => {
    setEditingOrder(Order);
    setIsOpenModal(true);
  };

  const closeModal = () => {
    setIsOpenModal(false);
    setEditingOrder(null);
  };

  const handleAddEditOrders = async (values) => {
    try {
      if (editingOrder) {
        await updateOrder(editingOrder.order_id, values);
        message.success('Cập nhật hóa đơn thành công');
      } else {
        await createOrder(values);
        message.success('Thêm hóa đơn thành công');
      }
      fetchOrders();
      setIsOpenModal(false);
    } catch (error) {
      message.error('Có lỗi xảy ra khi thêm/sửa hóa đơn: ' + error);
    }
  };

  const editOrder = async (id) => {
    try {
      setIsOpenModal(true);
      const orderResponse = await getOrderById(id);
      //console.log("Dữ liệu Order từ API:", orderResponse.data);
      // Gọi API lấy thông tin Customers và OrderDetails
      const customerResponse = await getCustomerById(orderResponse.data.customer_id);
      //console.log("Dữ liệu Customer từ API:", customerResponse.data);
      const orderDetailsResponse = await getOrderDetailsByOrderId(id);

      // Hợp nhất dữ liệu
      const combinedData = {
        ...orderResponse.data,
        customer_name: customerResponse.data.customer_name,
        address: customerResponse.data.address,
        phone_number: customerResponse.data.phone_number,
        Order_details: orderDetailsResponse.data,
      };

      //console.log("Dữ liệu hợp nhất gửi vào form:", combinedData); // Debug

      setEditingOrder(combinedData);
    } catch (error) {
      message.error("Có lỗi xảy ra khi sửa hóa đơn: " + error);
    }
  };


  const handleDeleteOrder = async (id) => {
    try {
      await deleteOrder(id);
      message.success('Xóa hóa đơn thành công');
      fetchOrders();
    } catch (error) {
      const errorMessage = error.message || 'Có lỗi xảy ra khi xóa hóa đơn!';
      message.error(errorMessage);
    }
  };

  const handleDelete = (id) => {
    confirm({
      title: 'Bạn có chắc chắn muốn xóa hóa đơn này?',
      icon: <ExclamationCircleOutlined />,
      content: 'Thao tác này không thể hoàn tác!',
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      onOk() {
        handleDeleteOrder(id);
      },
      onCancel() {
        console.log('Hủy thao tác xóa');
      },
    });
  };

  return (
    <Box>
      <Box display="flex" justifyContent="flex-start" marginBottom={2}>
        <Button onClick={() => openModal()} variant="contained" color="primary" size="medium" style={{ marginLeft: "10px" }}>
          Thêm Mới
        </Button>
        <OrdersForm visible={isOpenModal} onOk={(value) => handleAddEditOrders(value)} onCancel={closeModal} initialValues={editingOrder} />
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {["STT", "Ngày Lập", "Tổng Giá Bán", "Tên Khách Hàng", "Actions"].map((header, index) => (
                <TableCell
                  key={index}
                  style={{
                    backgroundColor: "#1976d2",
                    color: "#fff",
                    textAlign: "center",
                    fontSize: "14px",
                  }}
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order, index) => (
              <TableRow key={order.order_id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{new Date(order.order_date).toLocaleDateString()}</TableCell>
                <TableCell>{order.total_price.toLocaleString()} VNĐ</TableCell>{/*.toFixed(2)*/}
                <TableCell>{order.customer_name}</TableCell>
                <TableCell style={{ display: "flex", justifyContent: "center" }}>
                  <Button onClick={() => editOrder(order.order_id)} variant="contained" color="primary" size="small" style={{ marginRight: "10px" }}>
                    Sửa
                  </Button>
                  <Button onClick={() => handleDelete(order.order_id)} variant="contained" color="secondary" size="small">
                    Xóa
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default OrdersList;
