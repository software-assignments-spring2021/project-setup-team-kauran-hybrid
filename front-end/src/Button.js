import React from "react";
import {Link } from "react-router-dom";

 function goButton() {
     return (
    //    <div>
         <Link to="./Results"><button type='button'>
           Go!
         </button>
         </Link>
    //    </div>
     );
 }
 export default goButton;