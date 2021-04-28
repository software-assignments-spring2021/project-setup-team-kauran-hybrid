import React from "react";
import {Link, useHistory} from 'react-router-dom';

function Course(props){
    let history = useHistory();
    if(props.page=='results'){
        //console.log(props.details.courseNum);
        return(
            <div className="search-item">
            {/* <Link onClick={(props)=>(history.push({pathname:'/ClassInfo',state:props.details,ok:true}))}>
                Course Number: {props.details.courseNum}{"\t"}|{"\t"}Class Name: {props.details.courseName}{"\t"}|{"\t"}Waitlist Position:{props.details.waitlist_pos}
            </Link> */}
            <Link to={{
                pathname: '/ClassInfo',
                state: { detail: props.details }}}>
                Course Number: {props.details.courseNum}{"\t"}|{"\t"}Class Name: {props.details.courseName}{"\t"}|{"\t"}Waitlist Position:{props.details.waitlist_pos}
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
                Course Number: {props.details.courseNum}{"\t"}|{"\t"}Class Name: {props.details.courseName}{"\t"}|{"\t"}Waitlist Position:{props.details.waitlist_pos}
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
                Course Number: {props.details.courseNum}{"\t"}|{"\t"}Class Name: {props.details.courseName}{"\t"}|{"\t"}Waitlist Position:{props.details.waitlist_pos}
            </Link>
            </div>
            //<a href="./Results" class="back-results-button"></a>
        ) 
    }
  
}
export default Course