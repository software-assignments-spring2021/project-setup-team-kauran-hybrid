import React,{useState,useEffect} from'react';
import MenuBar from './MenuBar';
import './ClassInfo.css';
import './MenuBar.css';
import {useHistory} from 'react-router-dom';
import ClassDetail from './ClassDetail';
import axios from "axios";
import newLogo from './Logos/color-correct-icon.png';
import './App.css';
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
      // a nested function that fetches the data
      async function fetchData() {
        // axios is a 3rd-party module for fetching data from servers
        await axios(
          // retrieving some mock data about animals for sale
          'http://waitlisthopper.com:3000/class_info'
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
    
    return(

        <div className="ClassInfo">
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
              <ClassDetail key={classinfo.data.class_number} details={classinfo.data} page='class_info'/>:
              null
            }
            
            </div>
        </div>

    )
}

export default ClassInfo
