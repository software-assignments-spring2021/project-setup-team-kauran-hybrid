
import React,{useState,useEffect} from'react';
import axios from "axios";
import './ClassModules.css';
import {Link} from 'react-router-dom';
import ClassInfo from './ClassInfo';
import Course from "./Course";


function ClassModules(props){
  const [history, setHistory] = useState([]);
  useEffect(() => {
    // a nested function that fetches the data
    async function fetchData() {
      // axios is a 3rd-party module for fetching data from servers
      let result;
      if(props.page!='accounts'){
        result = await axios(
  
          // linking to the back-end instead of to mockaroo now
          'http://localhost:3000/class_modules'
        );
      }
      else{
        result = await axios(
          'http://localhost:3000/class_modules/protected',{
            headers:{
              'auth':props.auth
            }
          }
        );
      }

      //console.log(result.data);
      // set the state variable
      // this will cause a re-render of this component
      setHistory(result.data);
    }
    fetchData();
    console.log(history);
  }, []);
    if(props.page=='results'){
      return (
        
        <>

          <div className="ClassModules">
  
            {history.map(item => (
              <Course page={props.page} key={item.courseNum,item.courseName} details={item} />
              // <Semester key={item.semester} details={item} />
            ))}
          </div>
        </>
      );
    }
    else if(props.page=='accounts'){
      if(!props.auth){
        return (
          <>
            <div className="ClassModules">
              {history.map(item => (
                <Course page={props.page} key={item.courseNum} details={item} />
                // <Semester key={item.semester} details={item} />
              ))}
            </div>
          </>
        );
      }
      else{
        return (
          <>
            <div className="ClassModules">
              {history.map(item => (
                <Course page={props.page} key={item.courseNum} auth={props.auth} details={item} />
                // <Semester key={item.semester} details={item} />
              ))}
            </div>
          </>
        );
      }

    }
    else if(props.page=='professors'){
      return (
        <>
          <div className="ClassModules">
            {history.map(item => (
              <Course page={props.page} key={item.courseNum} details={item} />
              // <Semester key={item.semester} details={item} />
            ))}
          </div>
        </>
      );
    }
    

}

export default ClassModules