import React, { useState, useEffect } from 'react';
import './MenuBar.css';
import ProfInfo from'./ProfInfo';
import './ClassDetail.css';
import axios from 'axios';

function ClassDetail(props){
    const [articleId, setArticleId] = useState([]);

    useEffect(async() => {
        // POST request using axios inside useEffect React hook
        const article = { prof: props.details.secInstructors };
        await axios.post('http://localhost:3000/prof_info', article)
            .then(response => setArticleId(response.data.id));

    // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, []);
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
                        
                        {props.details.secInstructors.map(item => (
                            
                            <a href="./ProfInfo" className="prof-info"> 
                            Instructors: {item}
                            </a>
                        ))}
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
