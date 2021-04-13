import React from "react";
import './MenuBar.css';
import ProfInfo from'./ProfInfo';
import './ClassDetail.css'

function ClassDetail(props){
    return(
            <div className="class-details">
                <center className="class-name">
                    {props.details.lecNum} {props.details.lecName}
                </center>
                <p className="class-info">
                {props.details.secTime} {props.details.secLoc}
                </p>
                <p className="class-detail">
                    (Brief introdcution of class) {props.details.class_intro}
                </p>
                <p className="class-detail">
                    (Prerequisites) {props.details.prereq}
                </p>
                <p className="class-detail">
                    (Recitations) {props.details.recitations}
                </p>
                <p>
                    <center>
                        <a href="./ProfInfo" class="prof-info"> 
                            {props.details.secInstructors}
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
