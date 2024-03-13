import React from 'react';
import { Link } from 'react-router-dom';

const Header=()=>
{
    return(
        <div className="topnav">
        <Link to="/login" className="nav-link">Login</Link>
        <Link to="/register" className="nav-link">Register</Link>
        <Link to="/dashboard" className="nav-link">Admin</Link>
        <Link to="/home" className="nav-link">Homepage</Link>
        
      </div>
    )
}

export default Header;