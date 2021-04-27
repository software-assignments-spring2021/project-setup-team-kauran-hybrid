import React from'react';
import ReactDOM from 'react-dom';
import MenuBar from './MenuBar';
import './Account.css';
import './MenuBar.css';
import './ClassModules.css';
import ClassModules from'./ClassModules';
import { Link,useHistory } from 'react-router-dom';

const Account = (props) => {
    const history=useHistory();
    
    if(localStorage.auth){
        return (
                    <div>
                        <div className = "menu">
                           <MenuBar auth={localStorage.auth} username={localStorage.username}>
               
                           </MenuBar>
                           </div>
                   <div className = "account-page">
                           
                           {/* <p>
                             Waitlisted?
                           </p> */}
                           <p>
                               <ClassModules page='accounts' auth={localStorage.auth} username={localStorage.username}>
               
                               </ClassModules>
                           </p>
                           
                       </div>
                    </div>
                       
                )
    }
    else{
        return(
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
                        You're not logged in!
                   </p>
                   
               </div>
            </div>
        )
    }
    
    
}
export default Account