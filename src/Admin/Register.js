import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";

const Register = () => {
  return (
    <>
     <Header/>
      <div class="container">
        <label for="uname">
          <b>Username</b>
        </label>
        <input type="text" placeholder="Fullname" name="fullname"/>

        <label for="psw"><b>Email</b></label>
        <input type="text" placeholder="Email" name="email"/>

        <label for="psw"><b>Password</b></label>
        <input type="password" placeholder="Enter Password" name="password"/>

        <label for="psw"><b>Confirm  Password</b></label>
        <input type="password" placeholder="Enter Password" name="cpassword"/>

        <label for="psw"><b>Store Name</b></label>
        <input type="password" placeholder="Enter Password" name="cpassword"/>

        <button type="submit">Register</button>
        <label>
          <b>Alredy Registed User?</b> <Link to="/login">Sign In</Link>
        </label>
      </div>
    </>
  );
};

export default Register;
