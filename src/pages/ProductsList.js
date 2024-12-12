import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box } from "@mui/material";

const ProductsList = () => {
  const products = [
    {
      product_id: "P001",
      product_name: "Sản phẩm A",
      image_path: "src/assets/nu1.png", // Đảm bảo đường dẫn đúng
      inventory_quantity: 100,
      original_price: 200000,
      sale_price: 180000,
      description: "Mô tả sản phẩm A",
      create_time: "2023-01-01",
      update_time: "2023-06-01",
      category_id: "C001",
    },
    {
      product_id: "P002",
      product_name: "Sản phẩm B",
      image_path: "src/assets/product_b.jpg", // Đảm bảo đường dẫn đúng
      inventory_quantity: 50,
      original_price: 300000,
      sale_price: 250000,
      description: "Mô tả sản phẩm B",
      create_time: "2023-02-01",
      update_time: "2023-06-15",
      category_id: "C002",
    },
  ];

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
                "Description",
                "Create Time",
                "Update Time",
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
                <TableCell>{product.sale_price.toLocaleString()} VNĐ</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>{product.create_time}</TableCell>
                <TableCell>{product.update_time}</TableCell>
                <TableCell>{product.category_id}</TableCell>
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
