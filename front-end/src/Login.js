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
        <div className="Login-page">
            <MenuBar>

            </MenuBar>  
            <p>
              Waitlisted?
            </p>
            <LoginLogout/>

            
          {/* </header> */}
          
        </div>
      )
      
      
};

export default Login;