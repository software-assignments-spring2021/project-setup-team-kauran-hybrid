
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
        const result = await axios(

          // retrieving some mock data about animals for sale
          "https://my.api.mockaroo.com/search_history.json?key=7fa4d720"
        );
        //console.log(result.data);
        // set the state variable
        // this will cause a re-render of this component
        setHistory(result.data);
      }

      // fetch the data!
      fetchData();

    // the blank array below causes this callback to be executed only once on component load
  }, []);
    return (
        
        <>
        {/* <h1>Animals For Sale</h1> */}
          <div className="ClassModules">
            {history.map(item => (
              <Course key={item.class_num} details={item} />
            ))}
          </div>
        </>
      );

}
// const Search = ({ courseNum, semester, waitlistPos }) => (
//     <div className = "search-item">
//         <Link to = "/ClassInfo">
//         Course Number: {courseNum}{"\t"}|{"\t"}Semester: {semester}{"\t"}|{"\t"}Waitlist Position: {waitlistPos}
//         </Link>
//     </div>
//   );
        // <div className = "ClassModules">
        //   {searchHistory.map((p, i) => (
        //     <Search {...p} key={i} />
        //   ))}
        // </div>
export default ClassModules