import {React,useState} from "react";
import './Course.css';
import {Link, useHistory} from 'react-router-dom';

function Course(props){
    const [hoverState,setHoverState]=useState(false);
    const handleHover=async()=>{
        setHoverState(!hoverState)
        //console.log(hoverState);
    }
    function handleClickDelete(index){
        console.log("deleting",index)
    };
    let is_mobile = !!navigator.userAgent.match(/iphone|android|blackberry/ig) || false;
    if(props.page=='results'){
        // console.log(props.details);
        return(
            <div className="search-item">
            {/* <Link onClick={(props)=>(history.push({pathname:'/ClassInfo',state:props.details,ok:true}))}>
                Course Number: {props.details.courseNum}{"\t"}|{"\t"}Class Name: {props.details.courseName}{"\t"}|{"\t"}Waitlist Position:{props.details.waitlist_pos}
            </Link> */}
            <Link to={{
                pathname: '/ClassInfo',
                state: { detail: props.details }}}>
                {/* {props.details.courseNum}{"\t"}00{props.details.sections[0].secCode}{"\t"}{props.details.courseName}{"\t"}|{"\t"}Status: {props.details.sections[0].secStatus} */}
                MATH-UA {props.details.courseNum}{"\t"}00{props.details.secCode}{"\t"}{props.details.courseName}{"\t"}|{"\t"}Status: {props.details.secStatus}
            </Link>
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
                    
                    hoverState&&is_mobile&&
                    <button className="deleteButton" onClick={handleClickDelete(props.details.index)}> Delete this item</button>
                }
                {
                    hoverState&&!is_mobile&&
                    <button className="deleteButton" onClick={handleClickDelete(props.details.index)} style={{fontSize:"30px"}} > Delete this item</button>
                }
            
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
                MATH-UA {props.details.courseNum}{"\t"}00{props.details.secCode}{"\t"}{props.details.courseName}{"\t"}|{"\t"}Status: {props.details.secStatus}
            </Link>
            </div>
            //<a href="./Results" class="back-results-button"></a>
        ) 
    }
  
}
export default Course