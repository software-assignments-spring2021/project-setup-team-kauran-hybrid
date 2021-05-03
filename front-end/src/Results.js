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

const Results=(props)=>{
    const history=useHistory();
    const [userInput, setUserInput] = useState([]);
    useEffect(() => {
    // a nested function that fetches the data
    async function fetchData() {
      // axios is a 3rd-party module for fetching data from servers
      const result = await axios(
  
        // linking to the back-end instead of to mockaroo now
        'http://waitlisthopper.com:3000/results'
      );
      //console.log(result.data);
      // set the state variable
      // this will cause a re-render of this component
      setUserInput(result.data);
    }
  
    // fetch the data!
    fetchData();
  
  // the blank array below causes this callback to be executed only once on component load
  }, []);
   //console.log("Results page", userInput.email, userInput.number, userInput.position);
    const handleClickGoLogin = async() => {
        history.push({
            pathname:"./Login",
            username:userInput.email,
            number: userInput.number,
            position:userInput.position
        });
    }
    const handleClickGoHome = async() => {
        history.push({
            pathname:"./",
            auth:props.auth,
            username:props.username
            
        });
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
                <p>Your possibility of getting into this class is: {userInput.probGetIn}% {"\n"}

                    Here are some alternative classes.
                </p>
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
  