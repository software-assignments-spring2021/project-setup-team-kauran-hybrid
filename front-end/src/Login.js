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
//   const [userInput, setUserInput] = useState([]);
//   useEffect(() => {
//   // a nested function that fetches the data
//   async function fetchData() {
//     // axios is a 3rd-party module for fetching data from servers
//     const result = await axios(

//       // linking to the back-end instead of to mockaroo now
//       'http://localhost:3000/results'
//     );
//     //console.log(result.data);
//     // set the state variable
//     // this will cause a re-render of this component
//     setUserInput(result.data);
//   }
//   // fetch the data!
//   fetchData();
// // the blank array below causes this callback to be executed only once on component load
// }, []);
  console.log("Login page", props);
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