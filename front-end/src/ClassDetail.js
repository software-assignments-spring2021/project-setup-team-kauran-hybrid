import React, { useState, useEffect } from 'react';
import './MenuBar.css';
import ProfInfo from'./ProfInfo';
import './ClassDetail.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const dotenv=require('dotenv');
dotenv.config({path:'./.env'})

function ClassDetail(props){
    const [articleId, setArticleId] = useState([]);

    useEffect(async() => {
        // POST request using axios inside useEffect React hook
        let re = / [a-zA-Z]\.* /i;
        if (props.details.secInstructors) {
            for (let i=0; i < props.details.secInstructors.length; i++) {
                let prof = props.details.secInstructors[i];
                props.details.secInstructors[i] = prof.replace(re, ' ');
            }
            const article = { prof: props.details.secInstructors };
            await axios.post(`${process.env.REACT_APP_WEBHOST}:3000/prof_info`, article)
                .then(response => setArticleId(response.data.id));
        }

    // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, []);

    return(
            <div className="class-details">
                <center className="class-name">
                    MATH-UA {props.details.courseNum} {' '}
                    {props.details.courseName}
                </center>

                <p className="class-info">
                    Section 00{props.details.secCode} | {'\t'}
                    {props.details.secTime} | {'\t'}
                    {props.details.secLoc}
                </p>

                <p className="class-detail">
                    <Link to={{ 
                        pathname: "https://www.math.nyu.edu/dynamic/courses/undergraduate-course-descriptions/as/" 
                    }} target="_blank" >
                        See Department Website for course description and prerequisites
                    </Link>
                </p>

                <p className="prof-info">
                <center>
                    {props.details.secInstructors && props.details.secInstructors.map(item => (
                        <a href="./ProfInfo"> 
                            Prof. {item}
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
