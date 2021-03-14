import logo from './logo.svg';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import './Home.css'
import LoginForm from'./LoginForm'
import { Link } from 'react-router-dom';
import "./MenuBar.css";
const MenuBar=()=>{
    return (

        <header className="Menu-bar">
        <center>
        <Link to="/" className="HomeLink">

        <img src={logo} className="App-logo" alt="logo"/>
              
        </Link>

        </center>
             
        <Link to="/Account" className="Account">My Account</Link>

        <Link to="/Login" className="Login">Login/Logout</Link>

        </header>

    )
    
}
export default MenuBar;