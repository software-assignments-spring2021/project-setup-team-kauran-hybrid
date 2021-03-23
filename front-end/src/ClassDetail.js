import React from "react";
import './MenuBar.css';
import ProfInfo from'./ProfInfo';
import './ClassDetail.css'

function ClassDetail(props){
    return(
            <div className="class-details">
                <center className="class-name">
                    (Class Number) {props.details.class_number} (Class Name) {props.details.class_name}
                </center>
                <p className="class-info">
                    (Time and Place) {props.details.time}
                    {props.details.place}
                </p>
                <p className="class-detail">
                    (Brief introdcution of class) {props.details.class_intro}
                </p>
                <p className="class-detail">
                    (Prerequisites) {props.details.prereq}
                </p>
                <p>
                    <center>
                        <a href="./ProfInfo" class="prof-info"> 
                            (Professor) {props.details.prof_name}
                        </a>
                    </center>
                </p>
                <p>
                    <center>
                    <a href="./Results" class="back-results-button"> 
                        Return to view other recommended courses
                    </a>
                    </center>
                </p>
            </div>
    )
}
export default ClassDetail
