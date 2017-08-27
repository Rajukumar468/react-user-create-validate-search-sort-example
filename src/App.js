import React, { Component } from 'react';
import { BrowserRouter as Router, Route,Switch } from 'react-router-dom';

import logo from './logo.svg';
import './App.css';
import Navigation from './components/Navigation';
import Home from './components/Home';
import Services from './components/Services';

class App extends Component {
  render(){
        return(
            <Router>
                <div className='container'>
                    <Navigation />
                      <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route path="/services" component={Services}/>
                      </Switch>
                </div>
            </Router>
        )
    }
}

export default App;
