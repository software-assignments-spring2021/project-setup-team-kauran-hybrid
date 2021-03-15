import React from'react';
import ReactDOM from 'react-dom';
import MenuBar from './MenuBar';
import './Account.css';
import './App.css';
import './MenuBar.css';
import './ClassModules.css';
import ClassModules from'./ClassModules';
import {Link,Switch} from 'react-router-dom';

const Account = (props) => {
    return (

        <div className = "App-page">
            <MenuBar>

            </MenuBar>
            <p>
              Waitlisted?
            </p>
            <ClassModules>

            </ClassModules>
        </div>

    )
}
export default Account