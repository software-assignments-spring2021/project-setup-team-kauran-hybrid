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
      console.log(history.location.state)
      const details = history.location.state.detail
      // console.log(location.history)
      // a nested function that fetches the data
      async function fetchData() {
        // axios is a 3rd-party module for fetching data from servers
        await axios(
          // `http://waitlisthopper.com:3000/class_info?section=${details.sections[0].secCode}&course=${details.courseNum}`
          `${process.env.REACT_APP_WEBHOST}:3000/class_info?course=${details.courseNum}&section=${details.secCode}`
          ).then(res=>setClassInfo({
            state:true,
            data:res.data
        }));
        // set the state variable
        // this will cause a re-render of this component
        // setClassInfo(result.data);
      }
      // fetch the data!
      fetchData();

    // the blank array below causes this callback to be executed only once on component load
  }, []);
    console.log(classinfo.data);
    if (classinfo.data!=null) {
      return(

        <div>
            <div className = "menu">
                <MenuBar>

                </MenuBar>
                <button  className={'logoButton'} onClick={handleClickGoHome}>
                    <img src={newLogo} className="App-logo" alt="logo" />
                </button>
            </div>
            <div className = "classinfo">
            {/* {class_info.map(item => (
              <ClassDetail key={item.class_number} details={item} page='class_info'/>
            ))} */}
            
            {
              classinfo.state ?
              <ClassDetail key={classinfo.data.courseNum} details={classinfo.data} page='class_info'/>:
              null
            }
            
            </div>
        </div>

      )
    }
    else {
      return (
        <div>
          <div className = "menu">
                <MenuBar>

                </MenuBar>
                <button  className={'logoButton'} onClick={handleClickGoHome}>
                    <img src={newLogo} className="App-logo" alt="logo" />
                </button>
            </div>
          <div className = "noclass">
            <h1>
          This class does not match anything in our database.
          </h1>
          </div>
        </div>
      )

    }
    
}

export default ClassInfo
