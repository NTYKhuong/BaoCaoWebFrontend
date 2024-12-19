import React, { useState } from "react";
import { useLocation } from "react-router-dom"; 
import SearchIcon from '@mui/icons-material/Search'; 

const Header = ({ onSearch }) => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');

  // Xác định tiêu đề dựa trên đường dẫn
  const getTitle = () => {
    switch (location.pathname) {
      case "/products":
        return "SẢN PHẨM";
      case "/customers":
        return "KHÁCH HÀNG";
      case "/categories":
        return "DANH MỤC";
      case "/orders":
        return "HÓA ĐƠN";
      default:
        return "YOU ARE WELCOME";
    }
  };

  const filtered = (value) => {
    setSearchQuery(value);
    onSearch(value); // Truyền giá trị tìm kiếm lên cha
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
            value={searchQuery}
            onChange={(e) => filtered(e.target.value)}
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