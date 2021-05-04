import logo from './logo.svg';
import './App.css';
import React from 'react'
import Home from './Home'
import Results from './Results'
import ClassInfo from './ClassInfo';
import ProfInfo from './ProfInfo';
import Account from './Account';
import Login from './Login';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Dropdown from './Dropdown'

function App() {
  return (

    <div className="container">
      <Router>
        <Switch>

          <Route exact path="/dropdown" component={Dropdown}/>
          <Route  exact path="/" component={Home} />
          <Route  exact path="/results" component={Results} />
          <Route  exact path="/ClassInfo" component={ClassInfo} />
          <Route  exact path="/Account" component={Account} />
          <Route exact path="/Login" component={Login} />
          <Route  exact path="/ProfInfo" component={ProfInfo} />

          {/* <Route path="/">
            <Home />
          </Route> 

          <Route path="/results">
            <Results />
          </Route> */}

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
