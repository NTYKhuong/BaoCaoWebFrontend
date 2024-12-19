import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box } from "@mui/material";
import { message, Modal } from "antd";
import { ExclamationCircleOutlined } from '@ant-design/icons';

import { createCategory, deleteCategory, getCategory, getCategoryById, updateCategory } from "../services/AdminService";
import CategoriesForm from "../components/Category/CategoriesForm";

const { confirm } = Modal;

const CategoriesList = ({ searchCategory }) => {
  const [categories, setCategories] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  useEffect(() => {
    if(searchCategory !== "") {
      const filteredCategory = categories.filter((category) =>
        category.category_name.toLowerCase().includes(searchCategory.toLowerCase())
      );
      setCategories(filteredCategory);
    }
    else {
      fetchCategories();
    }
  }, [searchCategory]);

  const fetchCategories = async () => {
    try {
      const response = await getCategory();
      setCategories(response);
    } catch (error) {
      message.error('Có lỗi khi tải danh mục:' + error);
    }
  };

  const openModal = (Category = null) => {
    setEditingCategory(Category);
    setIsOpenModal(true);
  };

  const closeModal = () => {
    setIsOpenModal(false);
    setEditingCategory(null);
  };

  const handleAddEditCategory = async (values) => {
    try {
      if (editingCategory) {
        await updateCategory(editingCategory.category_id, values);
        message.success('Cập nhật loại thành công');
      } else {
        await createCategory(values);
        message.success('Thêm loại thành công');
      }
      fetchCategories();
      setIsOpenModal(false);
    } catch (error) {
      message.error('Có lỗi xảy ra khi thêm/sửa loại: ' + error);
    }
  };

  const editCategory = async (id) => {
    try {
      setIsOpenModal(true);
      const data = await getCategoryById(id);
      setEditingCategory(data.data);
    } catch (error) {
      message.error('Có lỗi xảy ra khi sửa loại: ' + error);
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
        await deleteCategory(id);
        message.success('Xóa loại thành công');
        fetchCategories();
    } catch (error) {
        const errorMessage = error.message || 'Có lỗi xảy ra khi xóa loại!';
        message.error(errorMessage);
    }
  };

  const handleDelete = (id) => {
    confirm({
      title: 'Bạn có chắc chắn muốn xóa loại này?',
      icon: <ExclamationCircleOutlined />,
      content: 'Thao tác này không thể hoàn tác!',
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      onOk() {
        handleDeleteCategory(id);
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
        <CategoriesForm visible={isOpenModal} onOk={(value) => handleAddEditCategory(value)} onCancel={closeModal} initialValues={editingCategory} />
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {["STT", "Loại", "Actions"].map((header, index) => (
                <TableCell 
                  key={index} 
                  style={{ 
                    backgroundColor: "#1976d2", 
                    color: "#fff", 
                    textAlign: "center", 
                    fontSize: "14px" 
                  }}
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.category_id}>
                <TableCell>{category.category_id}</TableCell>
                <TableCell>{category.category_name}</TableCell>
                <TableCell style={{ display: "flex", justifyContent: "center" }}>
                  <Button onClick={() => editCategory(category.category_id)} variant="contained" color="primary" size="small" style={{ marginRight: "10px" }}>Sửa</Button>
                  <Button onClick={() => handleDelete(category.category_id)} variant="contained" color="secondary" size="small">Xóa</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CategoriesList;