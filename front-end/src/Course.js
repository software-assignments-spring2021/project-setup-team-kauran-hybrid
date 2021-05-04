import React, { useState, useEffect } from "react";
import ClassInfo from "./ClassInfo";
import {Link} from 'react-router-dom';

function Course(props){
    const [hoverState,setHoverState]=useState(false);
    const handleHover=async()=>{
        setHoverState(!hoverState)
        //console.log(hoverState);
    }
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
        
        return(
            <div className="search-item" onMouseEnter={handleHover} onMouseLeave={handleHover}>
                {!hoverState&&
                <a href = './ClassInfo'>
                    Course Number: {props.details.courseNum}{"\t"}|{"\t"}WaitListPosition: {props.details.waitlistPos}{"\t"}|{"\t"}
                </a>
                }
                {
                    hoverState&&
                    <button className="deleteButton"> delete</button>
                }
            
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