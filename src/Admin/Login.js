import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import APP_URL from "../envorment";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState("");
  const [errorpass,setErrorpss] = useState("");


  const handleSubmit=async()=>{
    let isValid = true;
    if (!email.trim()) {
      setError('Please Enter Email');
      isValid = false;
    } else {
      setError('');
    }
    if (!password.trim()) {
      setErrorpss('Please Enter password');
      isValid = false;
    } else {
      setError('');
    }
    if(isValid)
    {
      const fd = new FormData();
      fd.append("email", email);
      fd.append("password", password);
      try {
        const response = await axios.post(`${APP_URL}/login`,fd);
      
        if(response?.data?.user)
        {
          localStorage.setItem('accesstocken', btoa(response?.data?.user?.created_at));
          
          toast.success(response.data.message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });

          setTimeout(function() {
            navigate(`/dashboard`);
            window.location.reload();
          }, 1500);
        }
      
      } catch (error) {
        console.error('Error updating data:', error);
      }
    }

  }

  return (
    <>
      <Header/>
      <div class="container">
        <label for="email">
          <b>Email</b>
        </label>
        <input type="text" placeholder="Enter Email" name="email" onChange={(e)=>setEmail(e.target.value)} />
        <span className="red">{error?error:''}</span><br></br>

        <label for="psw">
          <b>Password</b>
        </label>
        <input
          type="password"
          placeholder="Enter Password"
          name="psw"
          onChange={(e)=>setPassword(e.target.value)}
        />
        <span className="red">{errorpass?errorpass:''}</span>

        <button type="button" onClick={handleSubmit}>Login</button>
        <label>
          <b>New User?</b> <Link to="/register">Register</Link>
        </label>
      </div>
      <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
    </>
  );
};

export default Login;
