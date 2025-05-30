import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./screens/Login";

import { Home } from "./screens/Home";
import "../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
import Signup from "./screens/Signup.jsx";
import { CartProvider } from "../src/components/ContextReducer.jsx";
import MyOrder from "./screens/MyOrder.jsx";

 const App = () => {
  return (
    
    <CartProvider>
    <Router>
     
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/creatuser" element={<Signup />}/>
        <Route path="/myOrder" element={<MyOrder/>}></Route>
      </Routes>
    </Router>
    </CartProvider>
    
  );
};

export default App;
