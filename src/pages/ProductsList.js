import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box } from "@mui/material";
import { message } from 'antd';
import axios from "axios";

import { getProduct } from '../services/AdminService';

const ProductsList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProduct();
  }, []);
  
  const loadProduct = async () => {
    try {
      const productData = await getProduct();
      const fullProduct = productData.map(product => {
        return axios.get(`http://localhost:5281/api/Category/${product.category_id}?id=${product.category_id}`)
          .then(categoryResponse => {
            const categoryName = categoryResponse.data.category_name;
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

  return (
    <Box>
      <Box display="flex" justifyContent="flex-start" marginBottom={2}>
        <Button variant="contained" color="primary" size="medium" style={{ marginLeft: "10px" }}>
          Thêm Mới
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {[
                "#",
                "Product Name",
                "Image",
                "Inventory Quantity",
                "Original Price",
                "Sale Price",
                "Category Name",
                "Actions",
              ].map((header, index) => (
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
                  <Button variant="contained" color="primary" size="small" style={{ marginRight: "10px" }}>
                    Edit
                  </Button>
                  <Button variant="contained" color="secondary" size="small">
                    Del
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
