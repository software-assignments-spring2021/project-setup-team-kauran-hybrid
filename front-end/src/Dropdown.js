import react from 'react'
import './Dropdown.css'
import {Link} from 'react-router-dom'

const Dropdown=(props)=>{
    return(
        <div className="dd-wrapper">
            <div className="dd-header">
                <div className="dd-header"></div>
            </div>
            <div className="dd-menu">
                <button className="dd-list-item">Home</button>
                <button className="dd-list-item">MyAccount</button>
                <button className="dd-list-item">Login/Logout</button>
            </div>
</div>
    )
}
export default Dropdown