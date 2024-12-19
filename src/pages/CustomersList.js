import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box } from "@mui/material";
import { message, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { createCustomer, deleteCustomer, getCustomer, getCustomerById, updateCustomer } from "../services/AdminService";
import CustomersForm from "../components/Customers/CustomersForm";

const { confirm } = Modal;

const CustomersList = ({ searchCustomer }) => {
  const [customers, setCustomers] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);

  useEffect(() => {
    if(searchCustomer !== "") {
      const filteredCustomers = customers.filter((customer) =>
        customer.customer_name.toLowerCase().includes(searchCustomer.toLowerCase()) ||
        customer.address.toLowerCase().includes(searchCustomer.toLowerCase()) ||
        customer.phone_number.toString().includes(searchCustomer.toString())
      );
      setCustomers(filteredCustomers);
    }
    else {
      fetchCustomers();
    }
  }, [searchCustomer]);

  const fetchCustomers = async () => {
    try {
      const response = await getCustomer();
      setCustomers(response);
    } catch (error) {
      message.error('Có lỗi khi tải khách hàng:' + error);
    }
  };

  const openModal = (Customer = null) => {
    setEditingCustomer(Customer);
    setIsOpenModal(true);
  };

  const closeModal = () => {
    setIsOpenModal(false);
    setEditingCustomer(null);
  };

  const handleAddEditCustomer = async (values) => {
    try {
      if (editingCustomer) {
        await updateCustomer(editingCustomer.customer_id, values);
        message.success('Cập nhật khách hàng thành công');
      } else {
        await createCustomer(values);
        message.success('Thêm khách hàng thành công');
      }
      fetchCustomers();
      setIsOpenModal(false);
    } catch (error) {
      message.error('Có lỗi xảy ra khi thêm/sửa khách hàng: ' + error);
    }
  };

  const editCustomer = async (id) => {
    try {
      setIsOpenModal(true);
      const data = await getCustomerById(id);
      setEditingCustomer(data.data);
    } catch (error) {
      message.error('Có lỗi xảy ra khi sửa khách hàng: ' + error);
    }
  };

  const handleDeleteCustomer = async (id) => {
    try {
      await deleteCustomer(id);
      message.success('Xóa khách hàng thành công');
      fetchCustomers();
    } catch (error) {
      const errorMessage = error.message || 'Có lỗi xảy ra khi xóa khách hàng!';
      message.error(errorMessage);
    }
  };

  const handleDelete = (id) => {
    confirm({
      title: 'Bạn có chắc chắn muốn xóa khách hàng này?',
      icon: <ExclamationCircleOutlined />,
      content: 'Thao tác này không thể hoàn tác!',
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      onOk() {
        handleDeleteCustomer(id);
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
        <CustomersForm visible={isOpenModal} onOk={(value) => handleAddEditCustomer(value)} onCancel={closeModal} initialValues={editingCustomer}/>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {["STT", "Tên Khách Hàng", "Địa Chỉ", "Số Điện Thoại", "Actions"].map((header, index) => (
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
            {customers.map((customer) => (
              <TableRow key={customer.customer_id}>
                <TableCell>{customer.customer_id}</TableCell>
                <TableCell>{customer.customer_name}</TableCell>
                <TableCell>{customer.address}</TableCell>
                <TableCell>{customer.phone_number}</TableCell>
                <TableCell style={{ display: "flex", justifyContent: "center" }}>
                  <Button onClick={() => editCustomer(customer.customer_id)} variant="contained" color="primary" size="small" style={{ marginRight: "10px" }}>
                    Sửa
                  </Button>
                  <Button onClick={() => handleDelete(customer.customer_id)} variant="contained" color="secondary" size="small">
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

export default CustomersList;
