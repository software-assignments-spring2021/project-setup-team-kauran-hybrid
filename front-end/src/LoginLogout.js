import React,{useState} from'react';
import './LoginLogout.css'
import Account from './Account';

const LoginLogout=(props)=> {

    const [email,setEmail]=useState("Enter your Email");
    const [password,setPassword]=useState("Enter your password");

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
    
      return (
        <React.Fragment>
          {}
            <form className="box">
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
                  <a href="./Account" className="submit-button"> Login </a>
                
                  <a href="./Account" className="submit-button"> Signup </a>
                 </center>

              </div>

            </form>   
          {}
        </React.Fragment>

      );    
   }

export default LoginLogout