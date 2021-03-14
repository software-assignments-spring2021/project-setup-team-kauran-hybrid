
import React,{useState} from'react';
import './ClassModules.css';
import {Link} from 'react-router-dom';
import ClassInfo from './ClassInfo';

const searchHistory = [
    { courseNum: "123", semester: "Fall 2020", waitlistPos: 10 },
    { courseNum: "456", semester: "Spring 2020", waitlistPos: 28 },
    { courseNum: "789", semester: "Fall 2019", waitlistPos: 17 },
    { courseNum: "000", semester: "Spring 2019", waitlistPos: 99 }
  ];

const Search = ({ courseNum, semester, waitlistPos }) => (
    <div className = "search-item">
        <Link to = "/ClassInfo">
        Course Number: {courseNum}{"\t"}|{"\t"}Semester: {semester}{"\t"}|{"\t"}Waitlist Position: {waitlistPos}
        </Link>
    </div>
  );


function ClassModules(props){

    return (
        <div className = "ClassModules">
          {searchHistory.map((p, i) => (
            <Search {...p} key={i} />
          ))}
        </div>
      );
    // return (
    //     <React.Fragment>
    //         <div>
    //         value = {list}
    //         onChange={handleChange}
    //         </div>
    //     </React.Fragment>
    // )
        
        
        


    // return(
        
    //     <ol>
    //         <li className='List-item'>
    //             <Link to='./ClassInfo'>
    //                 Class 1
    //             </Link>
    //         </li>
    //         <li className='List-item'>
    //             <Link to='./ClassInfo'>
                    
    //                 Class 2
    //             </Link>
    //         </li>
    //         <li className='List-item'>
    //             <Link to='./ClassInfo'>
                    
    //                 Class 3
    //             </Link>
    //         </li>
    //     </ol>
    // )
}

export default ClassModules