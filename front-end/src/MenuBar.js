import newLogo from './Logos/color-correct-icon.png';
import './App.css';
import React, {useState} from 'react';
import './Home.css';
import { Link,useHistory } from 'react-router-dom';
import "./MenuBar.css";
import Dropdown from './Dropdown';
import DropdownMenu from './DropdownMenu';
import { GlobalStyles } from './global';

// import 'bootstrap/dist/css/bootstrap.min.css';
const MenuBar=(props)=>{
    const [open, setOpen] = useState(false);
    let is_mobile = !!navigator.userAgent.match(/iphone|android|blackberry/ig) || false;
    // console.log(is_mobile);
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
    const handleClickLogout=async()=>{
        // history.push({
        //     pathname:"./Login",
        //     auth:props.hisotry.location.auth,
        //     username:props.history.location.username
            
        // });
        localStorage.removeItem('username');
        localStorage.removeItem('auth');
        //console.log(localStorage);
        history.push('/');
    }
    if(localStorage.auth){

        if (is_mobile) {
            return (
                
                <React.Fragment>
                    {/* <GlobalStyles/> */}
                    <div>
                    <Dropdown open={open} setOpen={setOpen} />
                    <DropdownMenu open={open} setOpen={setOpen}/>
                    </div>
                    
                    <div className="menu" style={{height:'20vh'}} >
                        {/* <link
                            rel="stylesheet"
                            href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"
                            integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l"
                            crossorigin="anonymous"
                            /> */}
                        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
                        
                        </link> 

                        
                            
                        {/* <div className="many-links"> 
                        <button className="goodButton" onClick={handleClickGoHome}>Home</button>
                        <button className="goodButton" onClick={handleClickGoAccount}>MyAccount</button>
                        <button className="goodButton" onClick={handleClickLogout}>Logout</button> 
                        </div> */}
                    
            
                        {/* <center>
                        <button onClick={handleClickGoHome} className={'logoButton'}>
                        <img src={newLogo} className="App-logo" alt="logo" style={{height:'20vw',top:'20vw'}}/>
                        </button>
                        
                        <p>
                            
                        </p>
                        
                        </center> */}
                    </div>
                </React.Fragment>
                
                
            )
        }
        else {
            // display dropdown menu for mobile users
            return (
            
                <div className="menu">
                    {/* <link
                        rel="stylesheet"
                        href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"
                        integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l"
                        crossorigin="anonymous"
                        /> */}

                    <button onClick={handleClickGoHome} className={'logoButton'}>
                    <img src={newLogo} className="App-logo" alt="logo" />
                    </button>
                    <div className="many-links"> 
                    <button className="goodButton" onClick={handleClickGoHome}>Home</button>
        
                    <button className="goodButton" onClick={handleClickGoAccount}>MyAccount</button>
                        
                    {/* <button className="goodButton" onClick={handleClickGoLogin}>Login/Logout</button> */}
        
                    <button className="goodButton" onClick={handleClickLogout}>Logout</button> 
        
                        {/* <button className="btn"><i class="fa fa-folder"></i> Folder</button> */}
                    
                    </div>
                
        
                </div>
                
            )
        }
        
    }
 
    else{
        if (is_mobile) {
            return (
                
                <React.Fragment>
                    {/* <GlobalStyles/> */}
                    <div>
                    <Dropdown open={open} setOpen={setOpen} />
                    <DropdownMenu open={open} setOpen={setOpen}/>
                    </div>
                    
                    <div className="menu" style={{height:'20vh'}} >
                        {/* <link
                            rel="stylesheet"
                            href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"
                            integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l"
                            crossorigin="anonymous"
                            /> */}
                        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
                        
                        </link> 

                        
                            
                        {/* <div className="many-links"> 
                        <button className="goodButton" onClick={handleClickGoHome}>Home</button>
                        <button className="goodButton" onClick={handleClickGoAccount}>MyAccount</button>
                        <button className="goodButton" onClick={handleClickLogout}>Logout</button> 
                        </div> */}
                    
            
                        {/* <center>
                        <button onClick={handleClickGoHome} className={'logoButton'}>
                        <img src={newLogo} className="App-logo" alt="logo" style={{height:'20vw',top:'20vw'}} />
                        </button>
                        
                        <p>
                           
                        </p>
                        
                        </center> */}
                    </div>
                </React.Fragment>
                
                
            )
        }
        else {
            // display dropdown menu for mobile users
            return (
            
                <div className="menu">
                    {/* <link
                        rel="stylesheet"
                        href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"
                        integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l"
                        crossorigin="anonymous"
                        /> */}
                    {/* <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
                    
                    </link>  */}
                    
                    
                    
                    
                   
                    <div className="many-links"> 
                    <button className="goodButton" onClick={handleClickGoHome}>Home</button>
        
        
                    <button className="goodButton" onClick={handleClickGoAccount}>MyAccount</button>
        
                        
                    {/* <button className="goodButton" onClick={handleClickGoLogin}>Login/Logout</button> */}
        
                    <button className="goodButton" onClick={handleClickGoLogin}>Login</button> 
        
                        {/* <button className="btn"><i class="fa fa-folder"></i> Folder</button> */}
                    
                    </div>
                
        
                    
                </div>
                
            )
        }
    }
}
export default MenuBar; 
