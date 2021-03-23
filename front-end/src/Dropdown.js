import react from 'react'
import './Dropdown.css'
import {Link} from 'react-router-dom'

const Dropdown=(props)=>{
    return(
        <div className="dd-wrapper">
            <div className="dd-header">
                <div className="dd-header"></div>
            </div>
            <ul className="dd-menu">
                <li> <button className="dd-list-item">Home</button> </li>
                <li> <button className="dd-list-item">MyAccount</button> </li>
                <li> <button className="dd-list-item">Login/Logout</button> </li>
            </ul>
</div>
    )
}
export default Dropdown