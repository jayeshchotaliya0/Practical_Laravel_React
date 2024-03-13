import React from "react";
import { Link } from "react-router-dom";


const Leftpanal = () => {
   
  return (
    <>
      <div class="w3-sidebar w3-light-grey w3-bar-block menu">
        <h3 class="w3-bar-item">Menu</h3>
        <Link to="/dashboard" class="w3-bar-item w3-button">
          User
        </Link>
        <Link to="/category" class="w3-bar-item w3-button">
          Category
        </Link>
        <Link to="/product" class="w3-bar-item w3-button">
          product
        </Link>
      </div>
    </>
  );
};

export default Leftpanal;
