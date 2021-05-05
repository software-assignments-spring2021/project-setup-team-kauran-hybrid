import React,{useState,useEffect} from'react';
import axios from "axios";
import './ClassModules.css';
import Course from "./Course";

const dotenv=require('dotenv');
dotenv.config({path:'./.env'})

function ClassModules(props){
  // const auth = props.auth;
  const [userHistory, setUserHistory] = useState([]);
  useEffect(() => {
    // a nested function that fetches the data
    async function fetchData() {
      // axios is a 3rd-party module for fetching data from servers
      let result;
      let link = 'class_modules';
      if (props.page=='professors') {
        link = 'prof_info';
      }
      if(props.page!='accounts'){
        await axios(
  
          // linking to the back-end instead of to mockaroo now
          `${process.env.REACT_APP_WEBHOST}:3000/${link}`
        )
        .then(result=>setUserHistory(result.data));
      }
      else{
        console.log('Account ClassModules',props.username);
        await axios(
          `${process.env.REACT_APP_WEBHOST}:3000/class_modules/protected`,{
            headers:{
              'auth':props.auth,
              'username':props.username
            }
          }
        )
        .then(result=>setUserHistory(result.data));
      }

      // console.log(result.data);
      // set the state variable
      // this will cause a re-render of this component
      // setUserHistory(result.data);
    }
    fetchData();
    //console.log(userHistory);
  }, []);
  let is_mobile = !!navigator.userAgent.match(/iphone|android|blackberry/ig) || false;
    let size = '20px';
    if (is_mobile) {
        size = '10px';
    }
    if(props.page=='results'){
      //console.log(userHistory.courseNum);
      return (
        <center>
          <p>
          Here are some alternative classes.
          </p>
          <div className="ClassModules" style={{fontSize: size}}>
            
            {userHistory ? userHistory.map(item => (
              <Course page={props.page} key={item.courseNum} details={item} />
              // <Semester key={item.semester} details={item} />
            )):<p>...we're finding best substitutes for you...</p>}
          </div>
        </center>
      );
    }
    else if(props.page=='accounts'){
      if(!props.auth){
        return (
          <center>
            <div className="ClassModules" style={{fontSize: size}}>
              {userHistory.map(item => (
                <Course page={props.page} key={item.courseNum} details={item} />
                // <Semester key={item.semester} details={item} />
              ))}
            </div>
          </center>
        );
      }
      else{
        return (
          <center>
            <div className="ClassModules" auth={props.auth} style={{fontSize: size}}>
              {userHistory[0]?.userHistory.map(item => (
                  
                  <Course page={props.page} key={item} details={item} />
                  
                // <Semester key={item.semester} details={item} />
              ))}
            </div>
          </center>
        );
      }

    }
    else if(props.page=='professors'){
      return (
        <center>
          <div className="ClassModules" style={{fontSize: size}}>
            {userHistory.sections ? userHistory.sections.map(item => (
              <Course page={props.page} key={item.courseNum} details={item} />
              // <Semester key={item.semester} details={item} />
            )):null}
          </div>
        </center>
      );
    }
    

}

export default ClassModules