import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";

const OrdersList = () => {
  const orders = [
    {
      order_id: "O001",
      order_date: "2024-01-01",
      total_price: 100.00,
      customer_name: "Nguyễn Văn B",
    },
    {
      order_id: "O002",
      order_date: "2024-01-02",
      total_price: 150.50,
      customer_name: "Nguyễn Văn A",
    },
  ];

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {["#", "Order Date", "Total Price", "Customer Name", "Actions"].map((header, index) => (
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
          {orders.map((order, index) => (
            <TableRow key={order.order_id}>
              <TableCell>{index + 1}</TableCell> {/* Thêm số thứ tự cho hàng */}
              <TableCell>{order.order_date}</TableCell>
              <TableCell>{order.total_price.toFixed(2)} USD</TableCell>
              <TableCell>{order.customer_name}</TableCell> {/* Sửa lại để lấy customer_name */}
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

export default OrdersList;