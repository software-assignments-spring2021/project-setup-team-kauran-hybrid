import React,{useState} from'react';
import './LoginLogout.css'
import { Link,Redirect,Route,useHistory } from 'react-router-dom';
import axios from 'axios';
import newLogo from './Logos/color-correct-icon.png';
import './App.css';
// axios.interceptors.request.use(x=>{
//   console.log(x);
//   return x;
// },function(err){
//   if(err) throw err;
// });
// axios.interceptors.response.use(x=>{
//   console.log('Response:', JSON.stringify(x, null, 2))
//   return x;
// },function(err){
//     if(err) throw err;
// });
const LoginLogout=(props)=> {

  console.log("LoginLogout page", props)
    const history=useHistory();
    const [email,setEmail]=useState("Enter your Email");
    const [password,setPassword]=useState("Enter your password");
    const [submit, setSubmit]=useState();
    const loggedIn=true;
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

    const  handleClickLogin =async(e) =>{
        //e.preventDefault()
        await axios.post('http://waitlisthopper.com:3000/login_logout/login',{
          username:email,
          password:password,
      }).then(function(response,err){
        if(err) throw err;
        //console.log(response);
        localStorage.setItem('username',email);
        localStorage.setItem('auth',response.data.auth);
        //console.log(localStorage);
        history.push({
          pathname:response.data.redirect,
          auth:response.data.auth,
          username:email
        });
      });
    };

    const handleClickLoginParams = async() => {
      await axios.post('http://waitlisthopper.com:3000/login_logout/login',{
              
        username:email,
        password:password,
        position:props.position,
        number:props.number
      }).then(function(response,err){
        if(err) throw err;
        //console.log(response);
        localStorage.setItem('username',email);
        localStorage.setItem('auth',response.data.auth);
        history.push({
          pathname:response.data.redirect,
          auth:response.data.auth,
          username:email
        });
      });

    }

    const  handleClickSignUp =async(e) =>{
        //e.preventDefault()
        await axios.post('http://waitlisthopper.com:3000/login_logout/signup',{
          username:email,
          password:password,
        }).then(function(response,err){
          if(err) throw err;
          //console.log(response);
          localStorage.setItem('username',email);
          localStorage.setItem('auth',response.data.auth);
          history.push({
            pathname:response.data.redirect,
            auth:response.data.auth,
            username:email
          });
        });
        
        //console.log(something);
 
    };

    const handleClickSignUpParams = async() => {
      await axios.post('http://waitlisthopper.com:3000/login_logout/signup',{
              
        username:email,
        password:password,
        position:props.position,
        number:props.number
      }).then(function(response,err){
        if(err) throw err;
        //console.log(response);
        localStorage.setItem('username',email);
        localStorage.setItem('auth',response.data.auth);
        history.push({
          pathname:response.data.redirect,
          auth:response.data.auth,
          username:email
        });
      });
    }
      // if the user did not go through the home page and clicked login first
      if (!props.position) {
        return (
          <React.Fragment>
           
                <p>
                  
                    <input className="login_inputs"
                    type="email"
                    name="email"
                    value={email}
  
                    onChange={handleChange}
                    onClick={handleClickEmail}
                    />
                </p>
              
                <p> 
                
                    <input className="login_inputs"
                    type="password"
                    name="password"
                    value={password}
  
                    onChange={handlePassword}
                    onClick={handleClickPassword}
                    />
                </p>
              
                
                <div>
                   <center>
                    <button className="submit-button" onClick={handleClickLogin}> Login </button>
                  
                    <button className="submit-button" onClick={handleClickSignUp}> Signup </button>
                   </center>
  
                </div>
  
              
          </React.Fragment>

              
          
        );  
      }
      // otherwise they went through the home page and have clicked yes on results
      else {
        return (
          <React.Fragment>

          
              
                <p>
                  
                    <input className="login_inputs"
                    type="email"
                    name="email"
                    value={email}
  
                    onChange={handleChange}
                    onClick={handleClickEmail}
                    />
                </p>
              
                <p> 
                
                    <input className="login_inputs"
                    type="password"
                    name="password"
                    value={password}
  
                    onChange={handlePassword}
                    onClick={handleClickPassword}
                    />
                </p>
              
                
                <div>
                   <center>
                    <button className="submit-button" onClick={handleClickLoginParams}> Login </button>
                  
                    <button className="submit-button" onClick={handleClickSignUpParams}> Signup </button>
                   </center>
  
                </div>
  
               
            
            </React.Fragment>
        );  
      }
  
   }

export default LoginLogout