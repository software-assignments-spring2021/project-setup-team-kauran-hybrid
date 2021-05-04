import React from "react";
import {Link, useHistory} from 'react-router-dom';

function Course(props){
    let history = useHistory();

    let is_mobile = !!navigator.userAgent.match(/iphone|android|blackberry/ig) || false;
    let size = '20px';
    if (is_mobile) {
        size = '10px';
    }
    if(props.page=='results'){
        // console.log(props.details);
        return(
            <div className="search-item" style={{fontSize: size}}>
            {/* <Link onClick={(props)=>(history.push({pathname:'/ClassInfo',state:props.details,ok:true}))}>
                Course Number: {props.details.courseNum}{"\t"}|{"\t"}Class Name: {props.details.courseName}{"\t"}|{"\t"}Waitlist Position:{props.details.waitlist_pos}
            </Link> */}
            <Link to={{
                pathname: '/ClassInfo',
                state: { detail: props.details }}}>
                {/* {props.details.courseNum}{"\t"}00{props.details.sections[0].secCode}{"\t"}{props.details.courseName}{"\t"}|{"\t"}Status: {props.details.sections[0].secStatus} */}
                {/* MATH-UA {props.details.courseNum}{"\t"}00{props.details.secCode}{"\t"}{props.details.courseName}{"\t"}|{"\t"}Status: {props.details.secStatus} */}
                MATH-UA {props.details.courseNum}{" "}00{props.details.secCode}{" "}|{" "}{props.details.courseName}{" "}|{" "}{props.details.secStatus}
            </Link>
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
            {/* <a href = './ClassInfo'>
                Course Number: {props.details.courseNum}{"\t"}|{"\t"}WaitListPosition: {props.details.waitlistPos}{"\t"}|{"\t"}
            </a> */}
            <Link to={{
                pathname: '/ClassInfo',
                state: { detail: props.details }}}>
                MATH-UA {props.details.courseNum}{" "}00{props.details.secCode}{" "}|{" "}Waitlist Position: {props.details.waitlistPos}{" "}
                {/* Course Number: {props.details.courseNum}{"\t"}|{"\t"}Waitlist Position: {props.details.waitlistPos} */}
            </Link>
            </div>
            //<a href="./Results" class="back-results-button"></a>
        ) 
    }
    else if(props.page=='professors'){
        return(
            <div className="search-item">
            {/* <a href = './ClassInfo'>
                Course Number: {props.details.courseNum}{"\t"}|{"\t"}Semester: {}{"\t"}|{"\t"}Waitlist Position:{props.details.waitlist_pos}
            </a> */}
            <Link to={{
                pathname: '/ClassInfo',
                state: { detail: props.details }}}>
                {props.details.courseNum}{" "}00{props.details.secCode}{" "}|{" "}{props.details.courseName}{" "}|{" "}{props.details.secStatus}
            </Link>
            </div>
            //<a href="./Results" class="back-results-button"></a>
        ) 
    }
  
}
export default Course