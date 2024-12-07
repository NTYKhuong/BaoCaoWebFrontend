import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import ProductsList from './pages/ProductsList';
import CustomersList from './pages/CustomersList';
import CategoriesList from './pages/CategoriesList';
import OrdersList from './pages/OrdersList'; // Import OrdersList

const App = () => {
  return (
    <Router>
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ flex: 1 }}>
          <Header />
          <div style={{ padding: "20px" }}>
            <Routes>
              <Route path="/products" element={<ProductsList />} />
              <Route path="/customers" element={<CustomersList />} />
              <Route path="/categories" element={<CategoriesList />} />
              <Route path="/orders" element={<OrdersList />} /> {/* Thêm đường dẫn cho Orders */}
              <Route path="/" element={<h1>Welcome to the Admin Panel</h1>} exact />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;