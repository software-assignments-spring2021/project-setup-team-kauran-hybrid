import React from 'react';
import './ClassModules.css';
import {Link} from 'react-router-dom';
import ClassInfo from './ClassInfo';
function ClassModules(props){
    for(let i=0;i<10;i++){
        
    }
    return(
        <ol>
            <li className='List-item'>
                <Link to='./ClassInfo'>
                    Class 1
                </Link>
            </li>
            <li className='List-item'>
                <Link to='./ClassInfo'>
                    
                    Class 2
                </Link>
            </li>
            <li className='List-item'>
                <Link to='./ClassInfo'>
                    
                    Class 3
                </Link>
            </li>
        </ol>
    )
}

export default ClassModules