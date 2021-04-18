import React from'react';
import ReactDOM from 'react-dom';
import MenuBar from './MenuBar';
import './Account.css';
import './MenuBar.css';
import './ClassModules.css';
import ClassModules from'./ClassModules';
import {Link,Switch} from 'react-router-dom';

const Account = (props) => {
    return (
     <div>
         <div className = "menu">
            <MenuBar>

            </MenuBar>
            </div>
<div className = "account-page">
            
            {/* <p>
              Waitlisted?
            </p> */}
            <p>
                <ClassModules page='accounts'>

                </ClassModules>
            </p>
            
        </div>
     </div>
        

    )
}
export default Account