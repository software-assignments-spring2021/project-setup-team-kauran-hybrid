import React,{useState} from'react';
import './LoginForm.css'
import { useHistory,Link } from 'react-router-dom';
import axios from 'axios';

const dotenv=require('dotenv');
dotenv.config({path:'./.env'})

const LoginForm=(props)=> {

  const [email,setEmail]=useState("Enter email");
  const [position,setPosition]=useState("Enter waitlist position");
  const [number,setNumber]=useState("Enter class number, eg: 343");
  var [secCode,setSection]=useState("Enter class section, eg: 6");
    
  // const [email,setEmail]=useState("Email");
  // const [position,setPosition]=useState("Waitlist position");
  // const [number,setNumber]=useState("Class number");

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

  const validateEmail = (email) => {

    if (/^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
      return true
    }
    alert('Please enter a valid email address.')
    return false
  }

  const validateClassNum = (number) => {

    if (/^[0-9-]+$/.test(number)) {
      return true
    }
    alert('Please enter pure number for class number, eg: 123.')
    return false
  }

  const validateSecCode = (secCode) => {

    if (/^[0-9-]+$/.test(secCode)) {
      return true
    }
    alert('Please enter pure number for section number, eg: 1.')
    return false
  }

  const  handleClickSubmit =async() =>{

    if (validateEmail(email) && validateClassNum(number) && validateSecCode(secCode)) {
      secCode  = secCode.replace(/^0+/, '');  
      await axios.post(`${process.env.REACT_APP_WEBHOST}:3000/home_login`,{
        email:email,
        position:position,
        number:number,
        secCode:secCode
      });

      history.push({
        pathname:'/Results'
      })
    }

  };
    
  let is_mobile = !!navigator.userAgent.match(/iphone|android|blackberry/ig) || false;

  if(!is_mobile){
    return (
      <React.Fragment>

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

            <p className="inputWrapper">
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
              <Link className="goButton" onClick={handleClickSubmit}>
                Let's Hop  
              </Link> 
            </center>

        </form>

      </React.Fragment>

    );
  }
  else{
    return (
      <React.Fragment>

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
                style={{width: "60vw"}}
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
                style={{width: "60vw"}}
                onChange={handlePosition}
                onClick={handleClickPos}
              />
          </p>

          <p className="inputWrapper">
            {/* <label htmlFor="number">number</label> */}
            <input className="inputs"
              type="2"
              name="number"
              style={{width: "60vw"}}
              value={number}

              onChange={handleNumber}
              onClick={handleClickNumber}
            />
          </p>

          <p className="inputWrapper">
            {/* <label htmlFor="number">number</label> */}
            <input className="inputs"
              type="secCode"
              name="secCode"
              style={{width: "60vw"}}
              value={secCode}

              onChange={handleSection}
              onClick={handleClickSection}
            />
          </p>          

          <center>
            <Link className="goButton" onClick={handleClickSubmit}>
              Let's Hop  
            </Link>                
          </center>

        </form>

      </React.Fragment>

    )
  }

}             
   
export default LoginForm