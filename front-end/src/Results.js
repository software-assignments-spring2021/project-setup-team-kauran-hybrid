import React from'react';
import MenuBar from './MenuBar';
import './Results.css';
import './MenuBar.css';
import './ClassModules.css';
import ClassModules from'./ClassModules';
import axios from "axios";
import {useState,useEffect} from'react';
import {  useHistory  } from 'react-router-dom'
import newLogo from './Logos/color-correct-icon.png';
import './App.css';

const dotenv=require('dotenv');
dotenv.config({path:'./.env'})

const Results=(props)=>{
    const history=useHistory();
    const [userInput, setUserInput] = useState([]);
    

    useEffect(() => {
    // a nested function that fetches the data
    async function fetchData() {
      // axios is a 3rd-party module for fetching data from servers
      const result = await axios(
  
        // linking to the back-end instead of to mockaroo now
        `${process.env.REACT_APP_WEBHOST}:3000/results`
      ).then(res=>setUserInput({
        state:true,
        data:res.data
      }));
    //   setUserInput(result.data);
      //console.log(result.data);
    }
  
    // fetch the data!
    fetchData();
  
  // the blank array below causes this callback to be executed only once on component load
    }, []);

          
          //console.log(result.data);
       
   //console.log("Results page", userInput.email, userInput.number, userInput.position);
    const handleClickGoLogin = async() => {
        history.push({
            pathname:"./Login",
            username:userInput.data.email,
            number: userInput.data.number,
            position:userInput.data.position,
            secCode:userInput.data.secCode
        });
    }
    console.log(userInput.data);
    const handleClickGoHome = async() => {
        history.push({
            pathname:"./",
            auth:props.auth,
            username:props.username
            
        });
    }
    let is_mobile = !!navigator.userAgent.match(/iphone|android|blackberry/ig) || false;
    let size = '30px';
    if (is_mobile) {
        size = '15px';
    }
    return(
        <div>
            <MenuBar/>
            <button  className={'logoButton'} onClick={handleClickGoHome}>
                    <img src={newLogo} className="App-logo" alt="logo" />
            </button>
            <div className="results-page">

                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
             
                </link>
                <center>
                {
                userInput.state ? <p style={{fontSize: size}}>Your possibility of getting into this class is: {userInput.data.probGetIn} {"\n"}

                    
                </p>:
                 <p style={{fontSize: size}}>
                     ...we're getting your results...
                 </p>
                }
                </center>
                <ClassModules page='results'>

                </ClassModules>
                <p> Would you like to login and store this search?</p>
                <p>
                {/* <Route exact path="/Login">
                    <button className="results-button">YES!
                        
                        <Redirect to='/Login'/>
                        
                    </button>
                </Route> */}
                    
                    
                    {/* email='emailtest' position={userInput.position} number={userInput.number}  */}
                    <button className="results-button" onClick={handleClickGoLogin}>YES!</button>
                    <a href="/" className="results-button">NO! Go Back</a>
                
                </p>
                
                
            </div>
        </div>

    )

};

export default Results;
  