import React from "react";
import { List, ListItem, ListItemText, ListItemIcon } from "@mui/material";
import { ShoppingCart, People, Category, Assignment, ExitToApp } from "@mui/icons-material";
import { Link } from "react-router-dom";
import avatar from '../assets/nu1.png'; 

const Sidebar = () => {
  return (
    <div style={{ width: "250px", background: "#1976d2", height: "100vh", display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "10px", textAlign: "center" }}>
        <h3 style={{ color: "#FFFFFF", margin: "10px", fontSize: "40px" }}>ADMIN</h3>
        <img 
          src={avatar} 
          alt="Avatar" 
          style={{ width: "100px", borderRadius: "90%" }} 
        />
      </div>
      <List style={{ flexGrow: 1 }}>
        <ListItem button component={Link} to="/products">
          <ListItemIcon><ShoppingCart style={{ color: "#FFFFFF" }} /></ListItemIcon>
          <ListItemText primary="PRODUCTS" style={{ color: "#FFFFFF" }} />
        </ListItem>
        <ListItem button component={Link} to="/customers">
          <ListItemIcon><People style={{ color: "#FFFFFF" }} /></ListItemIcon>
          <ListItemText primary="CUSTOMERS" style={{ color: "#FFFFFF" }} />
        </ListItem>
        <ListItem button component={Link} to="/categories">
          <ListItemIcon><Category style={{ color: "#FFFFFF" }} /></ListItemIcon>
          <ListItemText primary="CATEGORIES" style={{ color: "#FFFFFF" }} />
        </ListItem>
        <ListItem button component={Link} to="/orders"> {/* Thêm đường dẫn cho Orders */}
          <ListItemIcon><Assignment style={{ color: "#FFFFFF" }} /></ListItemIcon>
          <ListItemText primary="ORDERS" style={{ color: "#FFFFFF" }} />
        </ListItem>
        <ListItem button>
          <ListItemIcon><ExitToApp style={{ color: "#FFFFFF" }} /></ListItemIcon>
          <ListItemText primary="EXIT" style={{ color: "#FFFFFF" }} />
        </ListItem>
      </List>
    </div>
  );
};

export default Sidebar;