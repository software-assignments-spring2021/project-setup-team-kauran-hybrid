import react from 'react'
import './Dropdown.css'
import {Link} from 'react-router-dom'

const Dropdown=(props)=>{
    return(
        <div className="dd-wrapper">
            <div className="dd-header">
                <div className="dd-header-title"></div>
            </div>
            <div className="dd-list">
                <button className="dd-list-item"></button>
                <button className="dd-list-item"></button>
                <button className="dd-list-item"></button>
            </div>
</div>
    )
}