import logo from './logo.svg';
//import './App.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import './Home.css'
import LoginForm from'./LoginForm'
import { Link } from 'react-router-dom';
// import Button from './Button'
import MenuBar from './MenuBar';
import Dropdown from './Dropdown';

const Home=(props)=>{
      return(
        <div>
          <div className = "menu">
            <MenuBar>

            </MenuBar>

            <dd-wrapper>
             
            </dd-wrapper>
          </div>
          <div className="Home">

            <LoginForm/>
          
          </div>
        </div>
      )
   
};




export default Home;