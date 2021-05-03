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

    const validateEmail = (email) => {
      // if (/^[a-zA-Z0-9.!#$%&‘*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
      if (/^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
        return true
      }
      alert('Please enter a valid email address.')
      return false
    }

    const validateCourse = async(number,secCode) => {
      // await axios(
      //   // `http://waitlisthopper.com:3000/class_info?section=${details.sections[0].secCode}&course=${details.courseNum}`
      //   `${process.env.REACT_APP_WEBHOST}:3000/class_info?course=${number}&section=${secCode}`
      // ).then(res=>{
      //   if(res.data!=null){
      //     return true
      //   }
      //   else{
      //     alert('This section does not exist, please double check.')
      //     return false
      //   }
      // })
 
    }

    const validation = async() =>{
      // if (validateEmail(email)==true && validateCourse(number,secCode)==true) {
      // if (validateEmail(email)==true) {
      //   // console.log("this works")
      //   await axios.post(`${process.env.REACT_APP_WEBHOST}:3000/home_login`,{
      //     email:email,
      //     position:position,
      //     number:number,
      //     secCode:secCode
      //   })
      //   return true
      // }
      // return false
    }

    const  handleClickSubmit =async() =>{
      // validation();
      if (validateEmail(email)) {
        // console.log("this works")
        await axios.post(`${process.env.REACT_APP_WEBHOST}:3000/home_login`,{
          email:email,
          position:position,
          number:number,
          secCode:secCode
        })
        // return true
        // history.push({
        //   pathname:'/Results'
        // })
      }
      
      // return false
      // if(validation()==true) {
      //   history.push({
      //     pathname:'/Results'
      //   })
      // }
      // else {
      //   history.push({
      //     pathname:'/'
      //   })
      // }
      // await axios(
      //   // `http://waitlisthopper.com:3000/class_info?section=${details.sections[0].secCode}&course=${details.courseNum}`
      //   `${process.env.REACT_APP_WEBHOST}:3000/class_info?course=${number}&section=${secCode}`
      // ).then(res=>validation(res.data)
      // // .then(
      // //   result=>{
      // //     if (result==true)
      // //       history.push({
      // //         pathname:'./Results'
      // //       }
      // //       )
      // //   }
      // // )
      // )

    }

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
                {/* <a href="/Results" className="goButton" onClick={handleClickSubmit}>
                  Let's Hop  
                </a> */}
                <button className="goButton" onClick={handleClickSubmit}>
                  Let's Hop  
                </button>                
              </center>

            </form>

        </React.Fragment>

      );
    
    //}
   }
export default LoginForm