import React, { useState, useEffect } from "react";
import ClassInfo from "./ClassInfo";
import {Link} from 'react-router-dom';

function Course(props){
    return(
        <div className="search-item">
        <a href = './ClassInfo'>
            Course Number: {props.details.class_num}{"\t"}|{"\t"}Semester: {props.details.semester}{"\t"}|{"\t"}Waitlist Position:{props.details.waitlist_pos}
        </a>
        </div>
        //<a href="./Results" class="back-results-button"></a>
    )   
}
export default Course