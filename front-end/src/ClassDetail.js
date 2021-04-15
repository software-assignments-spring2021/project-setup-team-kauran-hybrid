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
                    Section 00{props.details.secCode} | {' '}
                    {props.details.secTime} | {' '}
                    {props.details.secLoc}
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
                            Instructors: {props.details.secInstructors}
                        </a>
                    </center>
                </p>
                <p className="class-rec">
                    Recitations
                    <>
                    {props.details.recs && props.details.recs.length > 0 && props.details.recs.map((rec, i) => (
                        <li>
                            Section 00{`${rec.recCode} `} | 
                            Time: {`${rec.recTime} `} | 
                            Instructor: {`${rec.recInstructors} `} | 
                            Status: {`${rec.recStatus} `}
                        </li>
                    ))}
                    </>
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
