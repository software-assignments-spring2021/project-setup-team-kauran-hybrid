
import React, {useState} from 'react';
import './Home.css'
import LoginForm from'./LoginForm'
import './LoginForm.css';
// import Button from './Button'
import MenuBar from './MenuBar';
import newLogo from './Logos/color-correct-icon.png';
import './App.css';

const Home=(props)=>{
  const [open, setOpen] = useState(false);
  console.log('home',props);
  let is_mobile = !!navigator.userAgent.match(/iphone|android|blackberry/ig) || false;
  if(!is_mobile){
    return(
      // Need to use this separate outside div for positioning purposes
      <div>
        <MenuBar/>

    
        
        <button  className={'logoButton'}>
                    <img src={newLogo} className="App-logo" alt="logo" />
          </button>
        
        
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
  else{
    return(
      // Need to use this separate outside div for positioning purposes
      <div>
        <MenuBar/>

    
        <button  className={'logoButton'}  >
                    <img src={newLogo} className="App-logo" alt="logo" 
                    
                    />
          </button>
        
        {/* This makes it so that the top menu part does not move around */}
        <div className="Home" style={{height:'80vh'}}>
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