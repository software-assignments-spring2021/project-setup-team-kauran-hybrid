import React from'react';
import ReactDOM from 'react-dom';
import MenuBar from './MenuBar';
import './ClassInfo.css';
import './MenuBar.css';
import './App.css';
import ProfInfo from'./ProfInfo';
import {Link,Switch} from 'react-router-dom';

function ClassInfo(props){
    
    return(

        <div className="App-page">
            <MenuBar>
            </MenuBar>
            <p>
                Class Name
            </p>
            <p className="time-place">
                Time and Place
            </p>
            <p className="intro">
                Brief Introduction of the Class
            </p>
            <p className="prereq">
                Prerequisites
            </p>
            <p className="prof">
                <Link to = "/ProfInfo">
                    Professor Information
                </Link>
            </p>
            

        </div>

    )
}


export default ClassInfo;