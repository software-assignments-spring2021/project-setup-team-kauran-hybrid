import logo from './logo.svg';
import './App.css';
import React from 'react'
import Home from './Home'
import Results from './Results'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
// import Dropdown from './Dropdown'


function App() {
  return (
    //this is kept for reference
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.{'\n'} Test
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
    <div className="container">
      <Router>
        <Switch>
          <Route path="/">
            <Home />
          </Route>

          <Route path="/results">
            <Results />
          </Route>
{/* 
          <Route path="/dropdown">
            <Dropdown />
          </Route> */}


        </Switch>
      </Router>

    </div>

  );
}

export default App;
