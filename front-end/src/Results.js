import React from'react';
import ReactDOM from 'react-dom';
import MenuBar from './MenuBar';
import './Results.css';
import './MenuBar.css';
import './ClassModules.css';
import ClassModules from'./ClassModules';
import {Link,Switch} from 'react-router-dom';

const Results=(props)=>{
    
    return(
       
        <div className="results-page">
            <MenuBar>

            </MenuBar>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
             
            </link>
            <p>Your possibility of getting into this class is: 0% haha{'\n'}

                Here are some alternative classes.
            </p>
            <ClassModules>

            </ClassModules>
            <p> Would you like to login and store this search?</p>
            <header>
            
            <Link to ="./Login">
            
                <button className="results-button">YES!</button>
            </Link>
            <Link to ="/">
                <button className="results-button">NO! Go Back</button>
                
            </Link>
            </header>
        </div>

    )
    //document.getElementById("results-page").style.margin="50px 10px 20px 30px";
};

export default Results;
  