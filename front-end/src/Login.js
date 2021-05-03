import React from 'react';
import MenuBar from './MenuBar';
import './MenuBar.css';
import './Login.css'
import LoginLogout from'./LoginLogout'
import newLogo from './Logos/color-correct-icon.png';
import './App.css';
import { useHistory } from 'react-router-dom';
const Login=(props)=>{

  const history=useHistory();
  const handleClickGoHome = async() => {
    history.push({
        pathname:"./",
        auth:props.auth,
        username:props.username
        
    });
  }
  if(props.history.location.username){
    return(
      <div>
        <div className = "menu">
        <MenuBar auth={props.history.location.auth} username={props.history.location.username}>
  
          </MenuBar>
          <button  className={'logoButton'} onClick={handleClickGoHome}>
                    <img src={newLogo} className="App-logo" alt="logo" />
            </button>
        </div>
        <div className = "Login-page">
  
          <LoginLogout username={props.history.location.uesrname} position={props.history.location.position} number={props.history.location.number} secCode={props.history.location.secCode}/>
            
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
          <button  className={'logoButton'} onClick={handleClickGoHome}>
                    <img src={newLogo} className="App-logo" alt="logo" />
            </button>
        </div>
        <div className = "Login-page">
  
          <LoginLogout />
            
        </div>
      </div>
          
    )
  }
  
         
};

export default Login;