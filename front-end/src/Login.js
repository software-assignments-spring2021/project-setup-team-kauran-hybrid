import logo from './logo.svg';
import React from 'react';
import MenuBar from './MenuBar';
import './MenuBar.css';
import ReactDOM from 'react-dom';
import App from './App'
import './Login.css'
import LoginLogout from'./LoginLogout'
import { Link, Switch } from 'react-router-dom';
import axios from "axios";
import {useState,useEffect} from'react';

const Login=(props)=>{

  if(props.history.location.username){
    return(
      <div>
        <div className = "menu">
        <MenuBar auth={props.history.location.auth} username={props.history.location.username}>
  
          </MenuBar>
        </div>
        <div className = "Login-page">
  
          <LoginLogout username={props.history.location.uesrname} position={props.history.location.position} number={props.history.location.number} />
            
        </div>
        
      </div>
          
    )
  }
  else{
    return(
      <div>
        <div className = "menu">
        <MenuBar auth={props.history.location.auth} username={props.history.location.username}>
  
          </MenuBar>
        </div>
        <div className = "Login-page">
  
          <LoginLogout />
            
        </div>
      </div>
          
    )
  }
  
         
};

export default Login;