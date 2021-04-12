import React, { useState, useEffect } from "react";
import ClassInfo from "./ClassInfo";
import {Link} from 'react-router-dom';

function Course(props){
    if(props.page=='results'){
        return(
            <div className="search-item">
            <a href = './ClassInfo'>
                Course Number: {props.details.courseNum}{"\t"}|{"\t"}Class Name: {props.details.courseName}{"\t"}|{"\t"}Waitlist Position:{props.details.waitlist_pos}
            </a>
            </div>
            //<a href="./Results" class="back-results-button"></a>
        ) 
    }
    else if(props.page=='accounts'){
        return(
            <div className="search-item">
            <a href = './ClassInfo'>
                Course Number: {props.details.courseNum}{"\t"}|{"\t"}Semester: {}{"\t"}|{"\t"}Waitlist Position:{props.details.waitlist_pos}
            </a>
            </div>
            //<a href="./Results" class="back-results-button"></a>
        ) 
    }
    else if(props.page=='professors'){
        return(
            <div className="search-item">
            <a href = './ClassInfo'>
                Course Number: {props.details.courseNum}{"\t"}|{"\t"}Semester: {}{"\t"}|{"\t"}Waitlist Position:{props.details.waitlist_pos}
            </a>
            </div>
            //<a href="./Results" class="back-results-button"></a>
        ) 
    }
  
}
export default Course