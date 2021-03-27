import React,{useState,useEffect} from'react';
import MenuBar from './MenuBar';
import './ClassInfo.css';
import './MenuBar.css';
import {Link} from 'react-router-dom';
import ClassDetail from './ClassDetail';
import axios from "axios";

function ClassInfo(props){

    const [classinfo, setClassInfo] = useState([]);
    const class_info = [classinfo];
    useEffect(() => {
      // a nested function that fetches the data
      async function fetchData() {
        // axios is a 3rd-party module for fetching data from servers
        const result = await axios(
          // retrieving some mock data about animals for sale
          'http://localhost:3000/class_info'
        );
        // set the state variable
        // this will cause a re-render of this component
        setClassInfo(result.data);
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
            </div>
            <div className = "classinfo">
            {class_info.map(item => (
              <ClassDetail key={item.class_number} details={item} />
            ))}
            </div>
        </div>

    )
}

export default ClassInfo
