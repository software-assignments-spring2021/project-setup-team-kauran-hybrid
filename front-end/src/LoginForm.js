import React,{useState} from'react';
import './LoginForm.css'
import { Link } from 'react-router-dom';
import Results from './Results';

const LoginForm=(props)=> {

    // constructor(props){
    //   super(props);
    //   this.state = { email: '', position:'', number:'' };
    //   this.handleChange = this.handleChange.bind(this);
    //   //this.handleSubmit = this.handleSubmit.bind(this);
    // }
    const [email,setEmail]=useState("Enter your email");
    const [position,setPosition]=useState("Enter your position");
    const [number,setNumber]=useState("Enter your class number");
    const handleChange = ({ target }) => {
      setEmail( target.value );

    };
    const handlePosition=({target})=>{
        setPosition(target.value);
    };
    const handleNumber=({target})=>{
        setNumber(target.value)
    };
    const handleClickEmail = () => {
      setEmail('');
    };
    const handleClickNumber = () => {
      setNumber('');
    };
    const handleClickPos = () => {
      setPosition('');
    };
    

    //render() {
      return (
        <React.Fragment>
          {/* <body> */}
            <form className="box">
              <p>
                {/* <label htmlFor="email">Email</label> */}
                  <input className="inputs"
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  onClick={handleClickEmail}
                  />
              </p>
            
              <p>
              {/* <label htmlFor="position">position</label> */}
                  <input className="inputs"
                  type="position"
                  name="position"
                  value={position}
                  onChange={handlePosition}
                  onClick={handleClickPos}
                  />
              </p>

              <p>
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

              <Link to="/Results">
                <button className="goButton"> Go! </button>
              </Link>

            </form>
   
            <h1>Your username is: {email}</h1>
          {/* </body> */}
        </React.Fragment>

      );
    
    //}
   }
export default LoginForm