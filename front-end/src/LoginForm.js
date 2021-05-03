import React,{useState} from'react';
import './LoginForm.css'
import axios from 'axios';

//import "../back-end/app.js";
const LoginForm=(props)=> {

    
    const [email,setEmail]=useState("Email");
    const [position,setPosition]=useState("Waitlist position");
    const [number,setNumber]=useState("Class number");
    const [submit, setSubmit]=useState();
    const handleChange = ({ target }) => {
      setEmail( target.value );
    };
    const handlePosition=({target})=>{
        setPosition(target.value);
    };
    const handleNumber=({target})=>{
        setNumber(target.value)
    };
    const handleClickEmail = (e) => {
      setEmail('');
    };
    const handleClickNumber = () => {
      setNumber('');
    };
    const handleClickPos = () => {
      setPosition('');
    };
    const  handleClickSubmit =async() =>{
      {
        
            await axios.post('http://waitlisthopper.com:3000/home_login',{
              
              email:email,
              position:position,
              number:number
              }
            );
          
            console.log("triggered");
          
      }

    };
    
    let is_mobile = !!navigator.userAgent.match(/iphone|android|blackberry/ig) || false;
    //render() {
      if(!is_mobile){
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
              
                {/* <button to="./Results" renderAs={Link}>
                  Go!
                </button> */}
  
                <center>
               
                  <a href="/Results" className="goButton" onClick={handleClickSubmit}>
                    Let's Hop  
                        
                  </a>
                  
               
                </center>
               
  
              </form>
     
              {/* <h1>Your username is: {email}</h1> */}
            {/* </body> */}
          </React.Fragment>
  
        );
      }
      else{
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
              
                {/* <button to="./Results" renderAs={Link}>
                  Go!
                </button> */}
  
                <center>
               
                  <a href="/Results" className="goButton" onClick={handleClickSubmit}>
                    Let's Hop  
                        
                  </a>
                  
               
                </center>
               
  
              </form>
     
              {/* <h1>Your username is: {email}</h1> */}
            {/* </body> */}
          </React.Fragment>
  
        );
      }
      
    
    //}
   }
export default LoginForm