import logo from './logo.svg';
//import './App.css';
import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import './Home.css'
import LoginForm from'./LoginForm'
import { Link } from 'react-router-dom';
// import Button from './Button'
import MenuBar from './MenuBar';
import Dropdown from './Dropdown';
import DropdownMenu from './DropdownMenu';
import { GlobalStyles } from './global';

const Home=(props)=>{
  const [open, setOpen] = useState(false);
  console.log('home',props);
  if(props.history?.location.auth){
    return(
      // Need to use this separate outside div for positioning purposes
      
      <div>
          <MenuBar auth={props.history.location.auth} username={props.history.location.username}/>

    
          
        
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
        <MenuBar/>

    
          
        
        {/* This makes it so that the top menu part does not move around */}
        <div className="Home">
           {/* <GlobalStyles/>
            <div>
              <Dropdown open={open} setOpen={setOpen} />
              <DropdownMenu open={open} setOpen={setOpen}/>
            </div> */}
          <LoginForm/>
          
        
        </div>
      </div>
    )
  }
      
   
};




export default Home;