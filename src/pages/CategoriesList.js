import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";

const CategoriesList = () => {
  const categories = [
    {
      category_id: "C001",
      category_name: "Điện tử",
    },
    {
      category_id: "C002",
      category_name: "Thời trang",
    },
    {
      category_id: "C003",
      category_name: "Nhà cửa",
    },
    {
      category_id: "C004",
      category_name: "Thực phẩm",
    },
    {
      category_id: "C005",
      category_name: "Sức khỏe",
    },
  ];

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {["#", "Category Name", "Actions"].map((header, index) => (
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
                <Button variant="contained" color="primary" size="small" style={{ marginRight: "10px" }}>Edit</Button>
                <Button variant="contained" color="secondary" size="small">Del</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CategoriesList;