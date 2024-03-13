import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";

const Login = () => {
  return (
    <>
      <Header/>
      <div class="container">
        <label for="uname">
          <b>Username</b>
        </label>
        <input type="text" placeholder="Enter Username" name="uname" required />

        <label for="psw">
          <b>Password</b>
        </label>
        <input
          type="password"
          placeholder="Enter Password"
          name="psw"
          required
        />

        <button type="submit">Login</button>
        <label>
          <b>New User?</b> <Link to="/register">Register</Link>
        </label>
      </div>
    </>
  );
};

export default Login;
