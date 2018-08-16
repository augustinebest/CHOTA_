import React, { Component } from 'react';
import './App.css';
import Home from "./components/Home";
import {BrowserRouter,Switch,Route} from 'react-router-dom';
import Facebooklogin from './components/Facebooklogin'
import Router from './router';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
      < Switch> 
          <Route path="/" exact  component = {Home}/> 
          <Route path="/Facebook" component = {Facebooklogin}/>
      </ Switch>
      <Router/>
      </BrowserRouter>
    );
  }
}

export default App;