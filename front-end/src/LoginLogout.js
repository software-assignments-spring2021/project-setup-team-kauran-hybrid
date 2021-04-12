import React,{useState} from'react';
import './LoginLogout.css'
import { Link } from 'react-router-dom';
import Account from './Account';
import axios from 'axios';

const LoginLogout=(props)=> {

    const [email,setEmail]=useState("Enter your Email");
    const [password,setPassword]=useState("Enter your password");
    const [submit, setSubmit]=useState();

    const handleChange = ({ target }) => { 
      setEmail( target.value );
    };
    const handlePassword=({target})=>{
        setPassword(target.value);
    };
    const handleClickEmail = (e) => {
      setEmail('');
    };
    const handleClickPassword = () => {
      setPassword('');
    };

    const  handleClickLogin =async() =>{
      {
            await axios.post('http://localhost:3000/login_logout/login',{
              
              username:email,
              password:password,
              }
            );
            console.log("checking");
      }
    };
    const  handleClickSignup =async() =>{
      {
            await axios.post('http://localhost:3000/login_logout/signup',{
              
              username:email,
              password:password,
              }
            );
            console.log("checking");
      }
    };
    
      return (
        <React.Fragment>
          {}
            <form action="login_logout" method="POST" className="box">
              <p>
                {}
                  <input className="inputs"
                  type="email"
                  name="email"
                  value={email}

                  onChange={handleChange}
                  onClick={handleClickEmail}
                  />
              </p>
            
              <p> 
              {}
                  <input className="inputs"
                  type="password"
                  name="password"
                  value={password}

                  onChange={handlePassword}
                  onClick={handleClickPassword}
                  />
              </p>
            
              {}
              <div>
                 <center>
                  <a href="./Account" className="submit-button" onClick={handleClickLogin}> Login </a>
                
                  <a href="./Account" className="submit-button" onClick={handleClickSignup}> Signup </a>
                 </center>

              </div>

            </form>   
          {}
        </React.Fragment>

      );    
   }

export default LoginLogout