import React from "react";
import { useLocation } from "react-router-dom"; 
import SearchIcon from '@mui/icons-material/Search'; 

const Header = () => {
  const location = useLocation();

  // Xác định tiêu đề dựa trên đường dẫn
  const getTitle = () => {
    switch (location.pathname) {
      case "/products":
        return "PRODUCTS";
      case "/customers":
        return "CUSTOMERS";
      case "/categories": // Đảm bảo đường dẫn chính xác
        return "CATEGORIES";
      case "/orders": // Thêm đường dẫn cho Orders
        return "ORDERS";
      default:
        return "WELCOME";
    }
  };

  return (
    <div style={{ background: "#1976d2", color: "#fff", padding: "10px", 
      display: "flex", justifyContent: "space-between", alignItems: "center",
      marginTop: "40px", marginLeft: "20px", marginRight: "20px" }}>
      <h2 style={{ margin: 0 }}>{getTitle()}</h2>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <input 
            type="text" 
            placeholder="Tìm kiếm" 
            style={{ 
              padding: "13px", 
              width: "500px", 
              borderRadius: "4px 0 0 4px", 
              border: "none" 
            }} 
          />
          <button style={{ 
            background: "#4CAF50", 
            color: "#fff", 
            border: "none", 
            padding: "10px 12px", 
            borderRadius: "0 4px 4px 0", 
            cursor: "pointer", 
            display: "flex", 
            alignItems: "center" 
          }}>
            <SearchIcon style={{ color: "#fff" }} />
          </button>
        </div>
        <button style={{ 
          background: "#fff", 
          color: "#1976d2", 
          border: "1px solid #1976d2", 
          padding: "10px 20px", 
          borderRadius: "4px", 
          cursor: "pointer", 
          marginLeft: "15px", 
          transition: "background 0.3s, color 0.3s", 
        }} 
        onMouseEnter={(e) => {
          e.target.style.background = "#1976d2"; 
          e.target.style.color = "#fff"; 
        }}
        onMouseLeave={(e) => {
          e.target.style.background = "#fff"; 
          e.target.style.color = "#1976d2"; 
        }}>
          ADMIN
        </button>
      </div>
    </div>
  );
};

export default Header;