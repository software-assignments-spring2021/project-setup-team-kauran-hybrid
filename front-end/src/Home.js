import logo from './logo.svg';
//import './App.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import './Home.css'
import LoginForm from'./LoginForm'
// import Button from './Button'

const Home=(props)=>{
    // constructor(props){
    //   super(props);
    // };
    //render(){
      return(
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Waitlisted?
            </p>
            <LoginForm/>

            {/* <Button/> */}

            {/* <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a> */ }
          </header>
          
        </div>
      )
      
    //}
        
      
};


//  ReactDOM.render(
//    //<Home/>,
   
//    document.getElementById('root')
//  );


export default Home;