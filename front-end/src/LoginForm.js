import React,{useState} from'react';
import './LoginForm.css'
import { useHistory } from 'react-router-dom';
import Results from './Results';
import axios from 'axios';

const dotenv=require('dotenv');
dotenv.config({path:'./.env'})

//import "../back-end/app.js";
const LoginForm=(props)=> {

    
    const [email,setEmail]=useState("Enter your email");
    const [position,setPosition]=useState("Enter your waitlist position");
    const [number,setNumber]=useState("Enter your lecture number, eg: 343");
    const [secCode,setSection]=useState("Enter your lecture section, eg: 1");
    const [submit, setSubmit]=useState();
    const [machineRe,setMachineRe]=useState([]);
    const history=useHistory();
    const handleChange = ({ target }) => {
      setEmail( target.value );
    };
    const handlePosition=({target})=>{
        setPosition(target.value);
    };
    const handleNumber=({target})=>{
        setNumber(target.value)
    };
    const handleSection=({target})=>{
        setSection(target.value)
  };
    const handleClickEmail = (e) => {
      setEmail('');
    };
    const handleClickNumber = () => {
      setNumber('');
    };
    const handleClickSection = () => {
      setSection('');
    };
    const handleClickPos = () => {
      setPosition('');
    };
    const  handleClickSubmit =async() =>{
        
            await axios.post(`${process.env.REACT_APP_WEBHOST}:3000/home_login`,{
              
              email:email,
              position:position,
              number:number,
              secCode:secCode
              }
            );

    };

    //render() {
      return (
        <React.Fragment>
          {/* <body> */}
          <p style={{ color:'white'}}>
            Welcome! Enter your info to get a prediction!
          </p>
            <form action="home_login" method ="POST" className="box">
              <p className="inputWrapper">
                {/* <label htmlFor="email">Email</label> */}
                  <input className="inputs"
                  type="email"
                  name="email"
                  value={email}

                  onChange={handleChange}
                  onClick={handleClickEmail}
                  />
              </p>
            
              <p className="inputWrapper">
              {/* <label htmlFor="position">position</label> */}
                  <input className="inputs"
                  type="position"
                  name="position"
                  value={position}

                  onChange={handlePosition}
                  onClick={handleClickPos}
                  />
              </p>

              <p className="inputWrapper">
                {/* <label htmlFor="number">number</label> */}
                <input className="inputs"
                type="2"
                name="number"
                value={number}

                onChange={handleNumber}
                onClick={handleClickNumber}
                />
              </p>    
              <p>
                {/* <label htmlFor="number">number</label> */}
                <input className="inputs"
                type="secCode"
                name="secCode"
                value={secCode}

                onChange={handleSection}
                onClick={handleClickSection}
                />
              </p>          

              <center>
             
                <a href="/Results" className="goButton" onClick={handleClickSubmit}>
                  Let's Hop  
                      
                </a>
                
              </center>

            </form>

        </React.Fragment>

      );
    
    //}
   }
export default LoginForm