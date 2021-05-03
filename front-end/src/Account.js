import React from'react';
import MenuBar from './MenuBar';
import './Account.css';
import './MenuBar.css';
import './ClassModules.css';
import ClassModules from'./ClassModules';
import { useHistory } from 'react-router-dom';
import newLogo from './Logos/color-correct-icon.png';
import './App.css';

const Account = (props) => {
    const history=useHistory();
    const handleClickGoHome = async() => {
        history.push({
            pathname:"./",
            auth:props.auth,
            username:props.username
            
        });
    }
    if(localStorage.auth){
        return (
                    <div>
                        <div className = "menu">
                           <MenuBar auth={localStorage.auth} username={localStorage.username}>
               
                           </MenuBar>
                            <button  className={'logoButton'} onClick={handleClickGoHome}>
                                <img src={newLogo} className="App-logo" alt="logo" />
                            </button>
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
                   <button  className={'logoButton'} onClick={handleClickGoHome}>
                        <img src={newLogo} className="App-logo" alt="logo" />
                    </button>
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