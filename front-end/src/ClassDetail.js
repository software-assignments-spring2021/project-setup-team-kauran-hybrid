import React from "react";
import './MenuBar.css';
import ProfInfo from'./ProfInfo';
import {Link} from 'react-router-dom';
import './ClassDetail.css'

function ClassDetail(props){
    return(
        <div>

            <div className="class-detail">
                <center className="class-name">
                    Class Name: {props.details.class_name};
                </center>
                <p className="time-place">
                    Time and Place: {props.details.time};
                    {props.details.place};
                </p>
                <p className="intro">
                    Brief introdcution of class: {props.details.class_intro};
                </p>
                <p className="prereq">
                    Prerequisites: {props.details.prereq};
                </p>
                <p>
                    <Link to = "/ProfInfo">
                        <button className="prof-info">
                            Professor: {props.details.prof_name};
                        </button>
                    </Link>
                </p>
                <p>
                    <center>
                    <Link to ="/Results">
                        <button className="back-results-button">
                            Return to view other recommended courses
                        </button>
                    </Link>
                    </center>
                </p>
            </div>
        </div>
    )
}
export default ClassDetail
