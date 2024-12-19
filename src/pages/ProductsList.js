import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box } from "@mui/material";
import { message, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import axios from "axios";

import { getProduct, updateProduct, createProduct, deleteProduct, getProductById } from '../services/AdminService';
import ProductsForm from "../components/Products/ProductsForm";

const { confirm } = Modal;

const ProductsList = ({ searchProduct }) => {
  const [products, setProducts] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    if(searchProduct !== "") {
      const filteredProducts = products.filter((product) =>
        product.product_name.toLowerCase().includes(searchProduct.toLowerCase()) ||
        product.inventory_quantity.toString().includes(searchProduct.toString()) ||
        product.original_price.toString().includes(searchProduct.toString()) ||
        product.unit_price.toString().includes(searchProduct.toString())
      );
      setProducts(filteredProducts);
    }
    else {
      loadProduct();
    }
  }, [searchProduct]);
  
  const loadProduct = async () => {
    try {
      const productData = await getProduct();
      const fullProduct = productData.map(product => {
        return axios.get(`http://localhost:5281/api/Category/${product.category_id}?id=${product.category_id}`)
          .then(categoryResponse => {
            const categoryName = categoryResponse.data.data.category_name;
            return { ...product, category_name: categoryName };
          });
        });

      Promise.all(fullProduct)
        .then(updatedProducts => {
            setProducts(updatedProducts);
        });
    } catch (error) {
      message.error('Có lỗi xảy ra khi tải Product: ' + error);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
        await deleteProduct(id);
        message.success('Xóa sản phẩm thành công');
        loadProduct();
    } catch (error) {
        const errorMessage = error.message || 'Có lỗi xảy ra khi xóa sản phẩm!';
        message.error(errorMessage);
    }
  };

  const handleAddEditProduct = async (values) => {
    try {
      if (editingProduct) {
        // console.log(editingProduct.product_id);
        await updateProduct(editingProduct.product_id, values);
        message.success('Cập nhật sản phẩm thành công');
      } else {
        await createProduct(values);
        message.success('Thêm sản phẩm thành công');
      }
      loadProduct();
      setIsOpenModal(false);
    } catch (error) {
      message.error('Có lỗi xảy ra khi thêm/sửa sản phẩm: ' + error);
    }
  };

  const openModal = (Product = null) => {
    setEditingProduct(Product);
    setIsOpenModal(true);
  };

  const editProduct = async (id) => {
    try {
      setIsOpenModal(true);
      const data = await getProductById(id);
      setEditingProduct(data.data);
    } catch (error) {
      message.error('Có lỗi xảy ra khi sửa sản phẩm: ' + error);
    }
  };

  const closeModal = () => {
    setIsOpenModal(false);
    setEditingProduct(null);
  };

  const handleDelete = (id) => {
    confirm({
        title: 'Bạn có chắc chắn muốn xóa sản phẩm này?',
        icon: <ExclamationCircleOutlined />,
        content: 'Thao tác này không thể hoàn tác!',
        okText: 'Xóa',
        okType: 'danger',
        cancelText: 'Hủy',
        onOk() {
          handleDeleteProduct(id);
        },
        onCancel() {
            console.log('Hủy thao tác xóa');
        },
    });
  };

  return (
    <Box>
      <Box display="flex" justifyContent="flex-start" marginBottom={2}>
        <Button onClick={() => openModal()} variant="contained" color="primary" size="medium" style={{ marginLeft: "10px" }} >
          Thêm Mới
        </Button>
        <ProductsForm visible={isOpenModal} onOk={(value) => handleAddEditProduct(value)} onCancel={closeModal} initialValues={editingProduct} />
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {["STT", "Tên sản phẩm", "Hình ảnh", "Số lượng", "Giá gốc", "Giá bán", "Loại", "Actions",].map((header, index) => (
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
            {products.map((product, index) => (
              <TableRow key={product.product_id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{product.product_name}</TableCell>
                <TableCell>
                  <img
                    src={product.image_path}
                    alt={product.product_name}
                    style={{ width: "50px", height: "50px" }}
                  />
                </TableCell>
                <TableCell>{product.inventory_quantity}</TableCell>
                <TableCell>{product.original_price.toLocaleString()} VNĐ</TableCell>
                <TableCell>{product.unit_price.toLocaleString()} VNĐ</TableCell>
                {/* <TableCell>{product.description}</TableCell>
                <TableCell>{product.create_time}</TableCell>
                <TableCell>{product.update_time}</TableCell> */}
                <TableCell>{product.category_name}</TableCell>
                <TableCell style={{ display: "flex", justifyContent: "center" }}>
                  <Button onClick={() => editProduct(product.product_id)} variant="contained" color="primary" size="small" style={{ marginRight: "10px" }}>
                    Sửa
                  </Button>
                  <Button onClick={() => handleDelete(product.product_id)} variant="contained" color="secondary" size="small">
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

export default ProductsList;