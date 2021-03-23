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

const ProfInfo=(props)=>{

  const goBack = () => {
    window.history.back();
  }
  
  const [profinfo, setProfInfo] = useState([]);
  const prof_info = [profinfo];
  useEffect(() => {
    // a nested function that fetches the data
    async function fetchData() {
      // axios is a 3rd-party module for fetching data from servers
      const result = await axios(
        // retrieving some mock data about animals for sale
        "https://my.api.mockaroo.com/professor.json?key=2f789220"
      );
      // set the state variable
      // this will cause a re-render of this component
      setProfInfo(result.data);
    }
    // fetch the data!
    fetchData();

  // the blank array below causes this callback to be executed only once on component load
}, []);
  

    return(
      <div className='prof-page'>
        <div className = "menu">
          <MenuBar>

          </MenuBar>
        </div>
        
        {/* <div className='prof-page'> */}

          {prof_info.map(item => (
              <Professor key={item.id} details={item} />
          ))}
          <div className='classes'>
          <center>
              
              {/* <a className='Button' onclick={goBack}>Go Back</a> */}
              <a className='Button' href='./ClassInfo'>Return to the Class Info page</a> 
              
          </center>
          </div>

        {/* </div> */}
        
      </div>
    )
    

      
    
};




export default ProfInfo;