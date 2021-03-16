import logo from './logo.svg';
//import './App.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import './Home.css'
import LoginForm from'./LoginForm'
import { Link } from 'react-router-dom';
import "./MenuBar.css";
const MenuBar=()=>{
    return (
        // <header className="Menu-bar">
        // <center>
        // <Link to="/" className="HomeLink">

        // <img src={logo} className="App-logo" alt="logo"/>
              
        // </Link>

        // </center>
             
        // <Link to="/Account" className="Account">My Account</Link>

        // <Link to="/Login" className="Login">Login/Logout</Link>

        // </header>
        <div>
            <header>
            
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
             
            </link> 
            
            <Link to="/">
            <button className="btn"><i className="fa fa-home"></i> Home</button> 
            </Link>
            <Link to="./Account">
            <button className="btn">My Account</button>
            </Link>
            <Link to="./Login">
            <button className="btn">Login/Logout</button>
            </Link>
            <button className="btn"><i class="fa fa-folder"></i> Folder</button>
            

            </header>
            <center>
            <img src={logo} className="App-logo" alt="logo" />
            </center>
        </div>
        
    )
    
}
export default MenuBar;