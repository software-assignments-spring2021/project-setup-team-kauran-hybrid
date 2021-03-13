import React from'react';
import ReactDOM from 'react-dom';
import MenuBar from './MenuBar';
import './Results.css';
import './MenuBar.css';
import ClassModules from'./ClassModules';
import {Link,Switch} from 'react-router-dom';

const Results=(props)=>{
    return(
        <div className="results-page">
            <MenuBar>

            </MenuBar>
            <p>Your possibility of getting into this class is: 0% haha{'\n'}

                Here are some alternative classes.
            </p>
            <ClassModules>
                
            </ClassModules>

        </div>

    )
};

export default Results;
  