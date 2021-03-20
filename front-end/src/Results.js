import React from'react';
import MenuBar from './MenuBar';
import './Results.css';
import './MenuBar.css';
import './ClassModules.css';
import ClassModules from'./ClassModules';

const Results=(props)=>{
    
    return(
        <div>
            <div className = "menu">
                <MenuBar>

                </MenuBar>
            </div>
            <div className="results-page">

                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
             
                </link>
                <p>Your possibility of getting into this class is: 0% haha {"\n"}

                    Here are some alternative classes.
                </p>
                <ClassModules>

                </ClassModules>
                <p> Would you like to login and store this search?</p>
                <p>

                    <a href="/Login" className="results-button">YES!</a>

                    <a href="/" className="results-button">NO! Go Back</a>
                
                </p>
            </div>
        </div>

    )

};

export default Results;
  