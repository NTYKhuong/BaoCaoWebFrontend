import React from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Products from './pages/Products';

const App = () => {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flex: 1 }}>
        <Header />
        <div style={{ padding: "20px" }}>
          <Products/>
        </div>
      </div>
    </div>
  );
};

export default App;