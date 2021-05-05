import React,{useState,useEffect} from'react';
import MenuBar from './MenuBar';
import './ClassInfo.css';
import './MenuBar.css';
import {useHistory} from 'react-router-dom';
import ClassDetail from './ClassDetail';
import axios from "axios";
import newLogo from './Logos/color-correct-icon.png';
import './App.css';

const dotenv=require('dotenv');
dotenv.config({path:'./.env'})

function ClassInfo(props){
    const history=useHistory();
    const handleClickGoHome = async() => {
      history.push({
          pathname:"./",
          auth:props.auth,
          username:props.username
          
      });
    }
    const [classinfo, setClassInfo] = useState([]);
    // const class_info = [classinfo];
    useEffect(() => {

      const details = history.location.state.detail
      //Olivia's code
      if (/^[a-zA-Z]+-[a-zA-Z]+[0-9]+$/.test(details.courseNum)){
        details.courseNum = details.courseNum.replace(/^[a-zA-Z]+-[a-zA-Z]+/, '');
      };
      async function fetchData() {
        // axios is a 3rd-party module for fetching data from servers
        await axios(
          // `http://waitlisthopper.com:3000/class_info?section=${details.sections[0].secCode}&course=${details.courseNum}`
          `${process.env.REACT_APP_WEBHOST}:3000/class_info?course=${details.courseNum}&section=${details.secCode}`
          ).then(res=>setClassInfo({
            state:true,
            data:res.data
        }));

      }
      fetchData();
    }, []);
    console.log(classinfo.data);
    let is_mobile = !!navigator.userAgent.match(/iphone|android|blackberry/ig) || false;
    
    // not on mobile
    if(!is_mobile){
      // classinfo existed
      if (classinfo.data!=null) {
        return(

          <div>
            <MenuBar/>
            <button  className={'logoButton'} onClick={handleClickGoHome}>
                <img src={newLogo} className="App-logo" alt="logo" />
            </button>
            <div className = "classinfo">
            {
              classinfo.state ?
              <ClassDetail key={classinfo.data.courseNum} details={classinfo.data} page='class_info'/>:
              null
            }
            </div>
          </div>

        )
      }
      // classinfo not exist
      else {
        return (
          <div>
              <MenuBar/>
              <button  className={'logoButton'} onClick={handleClickGoHome}>
                  <img src={newLogo} className="App-logo" alt="logo" />
              </button>
            <div className = "noclass">
              <center>
                <h1>
                  Unfortunately this class does not match anything in our database.
                </h1>
              </center>
            </div>
          </div>
        )
      }
    }
    // on mobile
    else{
      // classinfo exist
      if (classinfo.data!=null) {
        return(
          <div>
              <MenuBar/>
              <button  className={'logoButton'} onClick={handleClickGoHome}>
                  <img src={newLogo} className="App-logo" alt="logo" />
              </button>
            <div className = "classinfo-1">
            {
              classinfo.state ?
              <ClassDetail key={classinfo.data.courseNum} details={classinfo.data} page='class_info'/>:
              null
            }
            </div>
          </div>
        )
      }
      // classinfo not exist
      else {
        return (
          <div>
            <MenuBar/>
              <button  className={'logoButton'} onClick={handleClickGoHome}>
                  <img src={newLogo} className="App-logo" alt="logo" />
              </button>
            <div className = "noclass-1">
              <center>
                <h1>
                  Unfortunately this class does not match anything in our database.
                </h1>
              </center>
            </div>
          </div>
        )
      }
    }
}

export default ClassInfo
