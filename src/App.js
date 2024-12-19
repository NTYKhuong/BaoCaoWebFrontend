import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import ProductsList from './pages/ProductsList';
import CustomersList from './pages/CustomersList';
import CategoriesList from './pages/CategoriesList';
import OrdersList from './pages/OrdersList'; // Import OrdersList

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <Router>
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ flex: 1 }}>
          <Header onSearch={setSearchQuery}/>
          <div style={{ padding: "20px" }}>
            <Routes>
              <Route path="/products" element={<ProductsList searchProduct={searchQuery}/>} />
              <Route path="/customers" element={<CustomersList searchCustomer={searchQuery}/>} />
              <Route path="/categories" element={<CategoriesList searchCategory={searchQuery}/>} />
              <Route path="/orders" element={<OrdersList searchOrder={searchQuery}/>} />
              <Route path="/" element={<h1>Chào mừng đến với Bình nguyên vô tận</h1>} exact />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;