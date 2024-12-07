import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";

const CustomersList = () => {
  const customers = [
    {
      customer_id: "C001",
      customer_name: "Khách hàng A",
      address: "Địa chỉ 1",
      phone_number: "0123456789"
    },
    {
      customer_id: "C002",
      customer_name: "Khách hàng B",
      address: "Địa chỉ 2",
      phone_number: "0987654321"
    },
  ];

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {["#", "Customer Name", "Address", "Phone Number", "Actions"].map((header, index) => (
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
          {customers.map((customer) => (
            <TableRow key={customer.customer_id}>
              <TableCell>{customer.customer_id}</TableCell>
              <TableCell>{customer.customer_name}</TableCell>
              <TableCell>{customer.address}</TableCell>
              <TableCell>{customer.phone_number}</TableCell>
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

export default CustomersList;