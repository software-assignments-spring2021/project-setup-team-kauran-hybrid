import React from'react';
import MenuBar from './MenuBar';
import './ClassInfo.css';
import './MenuBar.css';
import ProfInfo from'./ProfInfo';
import {Link} from 'react-router-dom';

function ClassInfo(props){
    
    return(

        <div>
            <div className = "menu">
                <MenuBar>

                </MenuBar>
            </div>
            <div className="classinfo">
                <center className="class-name">
                    Class Name
                </center>
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
        </div>
        

    )
}

export default ClassInfo;