import React, { useState, useEffect } from "react";
import ClassInfo from "./ClassInfo";
import {Link} from 'react-router-dom';

function Course(props){
    if(props.page=='results'){
        //console.log(props.details.courseNum);
        return(
            <div className="search-item">
            <a href = './ClassInfo'>
                {props.details.courseNum}{" "}|{" "}{props.details.courseName}{" "}|{' '}Status:
            </a>
            </div>
            //<a href="./Results" class="back-results-button"></a>
        ) 
    }
    else if(props.page=='accounts'){
        // props.details.map(i=>{
        //     console.log('item inside',i.courseNum)
        // });
        console.log(props.details);
        return(
            <div className="search-item">
            <a href = './ClassInfo'>
                Course Number: {props.details.courseNum}{"\t"}|{"\t"}WaitListPosition: {props.details.waitlistPos}{"\t"}|{"\t"}
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