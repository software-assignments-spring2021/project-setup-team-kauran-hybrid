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

const Home=(props)=>{
      return(
        <div className="App-page">
          <MenuBar>

          </MenuBar>
            
             
            <p>
              Waitlisted?
            </p>
            <LoginForm/>

            
          {/* </header> */}
          
        </div>
      )
      

        
      
};




export default Home;