// import logo from "./logo.svg";
import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./Admin/Header";
import Login from "./Admin/Login";
import Register from "./Admin/Register";
import Dashboard from "./Admin/Dashboard";
import Category from "./Admin/Category/Category";
import Product from "./Admin/Product/Product";
import Add from "./Admin/Category/Add";
import Productadd from "./Admin/Product/Add";
import CategoryList from "./Front/CategoryList";
import ProductList from "./Front/ProductList";

function App() {
  return (
    <>
    <Router>
    
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register/>} />
        <Route exact path="/dashboard" element={<Dashboard/>} />
        <Route exact path="/category" element={<Category/>} />
        <Route exact path="/product" element={<Product/>} />
        <Route exact path="/addcategory" element={<Add />} />
        <Route exact path="/addproduct" element={<Productadd />} />
        <Route exact path="/home" element={<CategoryList />} />
        <Route exact path="/product/:id" element={<ProductList />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
