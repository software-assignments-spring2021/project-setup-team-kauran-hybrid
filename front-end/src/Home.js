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
  console.log('home',props);
  if(props.history?.location.auth){
    return(
      // Need to use this separate outside div for positioning purposes
      <div>
        <div className = "menu">
          <MenuBar auth={props.history.location.auth} username={props.history.location.username}/>

          {/* <Dropdown/> */}
        </div>
    
          
        
        {/* This makes it so that the top menu part does not move around */}
        <div className="Home">

          <LoginForm/>
        
        </div>
      </div>
    )
  }
  else{
    return(
      // Need to use this separate outside div for positioning purposes
      <div>
        <div className = "menu">
          <MenuBar/>

          {/* <Dropdown/> */}
        </div>
    
          
        
        {/* This makes it so that the top menu part does not move around */}
        <div className="Home">

          <LoginForm/>
        
        </div>
      </div>
    )
  }
      
   
};




export default Home;