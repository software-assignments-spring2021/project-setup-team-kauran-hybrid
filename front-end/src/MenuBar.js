import logo from './logo.svg';
import './App.css';
//import Button from 'react-bootstrap/Button';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import './Home.css'
import LoginForm from'./LoginForm'
import { Link } from 'react-router-dom';
import "./MenuBar.css";
// import 'bootstrap/dist/css/bootstrap.min.css';
const MenuBar=()=>{
    
    return (
        
        <div className="menu">
            {/* <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"
                integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l"
                crossorigin="anonymous"
                /> */}
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
             
            </link> 
                
            <nav className="many-links"> 
            <a href="./" className="goodButton">Home</a>


            <a href="./Account" className="goodButton">MyAccount</a>

                
            <a href="./Login" className="goodButton">Login/Logout</a>

                

                {/* <button className="btn"><i class="fa fa-folder"></i> Folder</button> */}
            
            </nav>
           

            <center>
            <Link to ="/">
            <img src={logo} className="App-logo" alt="logo" />
            </Link>
            
            <p>
                Waitlist Hopper
            </p>
            
            </center>
        </div>
        
    )
    
}
export default MenuBar;