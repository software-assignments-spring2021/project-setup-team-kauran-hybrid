import logo from './logo.svg';
//import './App.css';
import React,{useState,useEffect} from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import './ProfInfo.css'
import LoginForm from'./LoginForm'
import { Link } from 'react-router-dom';
import ClassModules from'./ClassModules';
// import Button from './Button'
import MenuBar from './MenuBar';
import Professor from './Professor'
import axios from "axios";
import newLogo from './Logos/color-correct-icon.png';
import './App.css';
import { useHistory } from 'react-router-dom';

const dotenv=require('dotenv');
dotenv.config({path:'./.env'})

const ProfInfo=(props)=>{
  const history=useHistory();
  const goBack = () => {
    window.history.back();
  }

  // const [profinfo, setProfInfo] = useState([]);
  // axios.get("http://localhost:3000/prof_info").then(response=>{setProfInfo(response.data)})
  
  const [profinfo, setProfInfo] = useState([]);
  // const prof_info = [profinfo];
  useEffect(() => {
    // a nested function that fetches the data
    async function fetchData() {
      // axios is a 3rd-party module for fetching data from servers
      await axios(
        // retrieving some mock data about animals for sale
        `${process.env.REACT_APP_WEBHOST}:3000/prof_info`
      ).then(res=>setProfInfo({
        state:true,
        data:res.data
      }));
      // set the state variable
      // this will cause a re-render of this component
      // setProfInfo(result.data);
    }
    // fetch the data!
    fetchData();

  // the blank array below causes this callback to be executed only once on component load
}, []);
  
  const handleClickGoHome = async() => {
    history.push({
        pathname:"./",
        auth:props.auth,
        username:props.username
        
    });
  }
  let is_mobile = !!navigator.userAgent.match(/iphone|android|blackberry/ig) || false;
  if (!is_mobile) {
    return(
      <div className='prof-page'>
        <div className = "menu">
          <MenuBar>

          </MenuBar>
          <button  className={'logoButton'} onClick={handleClickGoHome}>
                    <img src={newLogo} className="App-logo" alt="logo" />
          </button>
        </div>
        
        {/* <div className='prof-page'> */}

          {/* {profinfo.map(item => (
              <Professor details={item} />
          ))}
           */}
           {
             profinfo.state ?
             <Professor details={profinfo.data} />:
             <p>
             Be patient...we're getting the professor...
            </p>
           }
          {/* <Professor details={profinfo} /> */}
          <div className='classes'>
          <center>
              
              <a className='Button' onClick={goBack}>Return to the Class Info page</a>
              {/* <a className='Button' href = './ClassInfo'>Return to the Class Info page</a> */}
              
          </center>
          </div>

        {/* </div> */}
        
      </div>
    )
  }
  else {
    return(
      <div className='prof-page-1'>
        <div className = "menu-1">
          <MenuBar>

          </MenuBar>
          <button  className={'logoButton'} onClick={handleClickGoHome}>
                    <img src={newLogo} className="App-logo" alt="logo" />
          </button>
        </div>
        
        {/* <div className='prof-page'> */}

          {/* {profinfo.map(item => (
              <Professor details={item} />
          ))}
           */}
           {
             profinfo.state ?
             <Professor details={profinfo.data} />:
             <p>
             Be patient...we're getting the professor...
            </p>
           }
          {/* <Professor details={profinfo} /> */}
          <div className='classes-1'>
          <center>
              
              <a className='Button-1' onClick={goBack}>Return to the Class Info page</a>
              {/* <a className='Button' href = './ClassInfo'>Return to the Class Info page</a> */}
              
          </center>
          </div>

        {/* </div> */}
        
      </div>
    )
  }
    

      
    
};




export default ProfInfo;