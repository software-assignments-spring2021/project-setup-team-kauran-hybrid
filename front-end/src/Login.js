import logo from './logo.svg';
import React from 'react';
import MenuBar from './MenuBar';
import './MenuBar.css';
import ReactDOM from 'react-dom';
import App from './App'
import './Login.css'
import LoginLogout from'./LoginLogout'
import { Link, Switch } from 'react-router-dom';

const Login=(props)=>{
  return(
    <div>
      <div className = "menu">
        <MenuBar>

        </MenuBar>
      </div>
      <div className = "Login-page">

        <LoginLogout/>
          
      </div>
    </div>
        
  )
         
};

export default Login;