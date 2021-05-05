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

    let is_mobile = !!navigator.userAgent.match(/iphone|android|blackberry/ig) || false;
    // not on mobile
    if(!is_mobile){
        return(
                <div>
                    <center className="class-name">
                        MATH-UA {props.details.courseNum} {' '}
                        {props.details.courseName}
                    </center>

                    <p className="class-info">
                        Section {props.details.secCode} | {'\t'}
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
                                Section {`${rec.recCode} `} | 
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
    // is mobile
    else {
        return(
            <div>
                <center className="class-name-1">
                    MATH-UA {props.details.courseNum} {' '}
                    {props.details.courseName}
                </center>
                <center>
                    <p className="class-info-1">
                        Section {props.details.secCode} | {'\t'}
                        {props.details.secTime} | {'\t'}
                        {props.details.secLoc}
                    </p>
                </center>
                
                <center>
                    <p className="class-detail-1">
                        <Link to={{ 
                            pathname: "https://www.math.nyu.edu/dynamic/courses/undergraduate-course-descriptions/as/" 
                        }} target="_blank" >
                            See Department Website for course description and prerequisites
                        </Link>
                    </p>
                </center>

                <center>
                <p className="prof-info-1">
                {/* <center> */}
                    {props.details.secInstructors && props.details.secInstructors.map(item => (
                        <a href="./ProfInfo"> 
                            Prof. {item}
                        </a>
                    ))}  
                     
                </p>
                </center> 
                <center>
                    <p className="class-rec-1">
                        Recitations
                        <>
                        {props.details.recs && props.details.recs.length > 0 && props.details.recs.map((rec, i) => (
                            <li>
                                Section {`${rec.recCode} `} | 
                                Time: {`${rec.recTime} `} | 
                                Instructor: {`${rec.recInstructors} `} | 
                                Status: {`${rec.recStatus} `}
                            </li>
                        ))}
                        </>
                    </p>
                </center>
                <center>
                <p style={{width:'90vw'}}>
                    
                    <a href="./Results" class="back-results-button-1"> 
                        Return to view other recommended courses
                    </a>
                    
                </p>
                </center>
            </div>
        )
    }
}
export default ClassDetail
