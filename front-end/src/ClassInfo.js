import React from'react';
import MenuBar from './MenuBar';
import './ClassInfo.css';
import './MenuBar.css';
import './App.css';
import ProfInfo from'./ProfInfo';
import {Link} from 'react-router-dom';

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
            <p>
                <Link to = "/ProfInfo">
                    <button className="prof-info">
                        Professor Information
                    </button>
                </Link>
            </p>
            <p>
                <Link to ="/Results">
                    <button className="back-results-button">
                        Return to view other recommended courses
                    </button>
                </Link>
            </p>
        </div>

    )
}

export default ClassInfo;