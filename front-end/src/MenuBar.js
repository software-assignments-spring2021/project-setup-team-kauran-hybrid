import logo from './logo.svg';
import newLogo from './Logos/color-correct-icon.png';
import './App.css';
//import Button from 'react-bootstrap/Button';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import './Home.css'
import LoginForm from'./LoginForm'
import { Link,useHistory } from 'react-router-dom';
import "./MenuBar.css";
// import 'bootstrap/dist/css/bootstrap.min.css';
const MenuBar=(props)=>{
    //console.log('menubar',props);
    const history=useHistory();
    const handleClickGoHome = async() => {
        history.push({
            pathname:"./",
            auth:props.auth,
            username:props.username
            
        });
    }
    const handleClickGoAccount = async() => {
        history.push({
            pathname:"./Account",
            auth:props.auth,
            username:props.username
            
        });
    }
    const handleClickGoLogin = async() => {
        history.push({
            pathname:"./Login",
            auth:props.auth,
            username:props.username
            
        });
    }
    const handleClickGoHomeHistory = async() => {
        history.push({
            pathname:"./",
            auth:props.hisotry.location.auth,
            username:props.history.location.username
            
        });
    }
    const handleClickGoAccountHistory = async() => {
        history.push({
            pathname:"./Account",
            auth:props.hisotry.location.auth,
            username:props.history.location.username
            
        });
    }
    const handleClickGoLoginHistory = async() => {
        history.push({
            pathname:"./Login",
            auth:props.hisotry.location.auth,
            username:props.history.location.username
            
        });
    }
    if(props.auth){
        console.log("menubar props.auth", props);
        
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
                <button className="goodButton" onClick={handleClickGoHome}>Home</button>
    
    
                <button className="goodButton" onClick={handleClickGoAccount}>MyAccount</button>
    
                    
                <button className="goodButton" onClick={handleClickGoLogin}>Login/Logout</button>
    
                    
    
                    {/* <button className="btn"><i class="fa fa-folder"></i> Folder</button> */}
                
                </nav>
               
    
                <center>
                <button onClick={handleClickGoHome} className={'logoButton'}>
                <img src={newLogo} className="App-logo" alt="logo" />
                </button>
                
                <p>
                    {/* Waitlist Hopper */}
                </p>
                
                </center>
            </div>
            
        )
    }
    else if(props.history?.location.auth){
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
                <button className="goodButton" onClick={handleClickGoHomeHistory}>Home</button>
    
    
                <button className="goodButton" onClick={handleClickGoAccountHistory}>MyAccount</button>
    
                    
                <button className="goodButton" onClick={handleClickGoLoginHistory}>Login/Logout</button>
    
                    
    
                    {/* <button className="btn"><i class="fa fa-folder"></i> Folder</button> */}
                
                </nav>
               
    
                <center>
                <button onClick={handleClickGoHomeHistory} className={'logoButton'}>
                <img src={newLogo} className="App-logo" alt="logo" />
                </button>
                
                <p>
                    {/* Waitlist Hopper */}
                </p>
                
                </center>
            </div>
            
        )
    }
    else{
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
                <button onClick={handleClickGoHome} className={'logoButton'}>
                <img src={newLogo} className="App-logo" alt="logo" />
                </button>
                
                <p>
                    {/* Waitlist Hopper */}
                </p>
                
                </center>
            </div>
            
            )
        }
    
}
export default MenuBar; 