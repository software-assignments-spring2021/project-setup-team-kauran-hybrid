import React,{useState} from'react';
import './LoginLogout.css'
import { Link } from 'react-router-dom';
import Account from './Account';
import axios from 'axios';

const LoginLogout=(props)=> {

    const [email,setEmail]=useState("Enter your Email");
    const [password,setPassword]=useState("Enter your password");
    const [submit, setSubmit]=useState();

/* function submitLogin(e) {
    axios 
        .post("/login", loginDeets)
        .then((response) => {
            console.log("login response ", response.data);

            if (!response.data.error) {
                console.log("login success");
            } else {
                setError(true);
            }
        })
        .catch((err) => {
            console.log("Error", err);
        });
}*/

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

    const  handleClickSubmit =async() =>{
      {
        
            await axios.post('http://localhost:3000/login_logout',{
              
              email:email,
              password:password,
              }
            );
          
            console.log("checkingg");
          
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
                  <a href="./Account" className="submit-button" onClick={handleClickSubmit}> Login </a>
                
                  <a href="./Account" className="submit-button" onClick={handleClickSubmit}> Signup </a>
                 </center>

              </div>

            </form>   
          {}
        </React.Fragment>

      );    
   }

export default LoginLogout