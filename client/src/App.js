import React, { Component } from 'react';
import './App.css';
import Home from "./components/Home";
import {BrowserRouter,Switch,Route} from 'react-router-dom';
import Facebooklogin from './components/Facebooklogin'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
      < Switch> 
          <Route path="/" exact  component = {Home}/> 
          <Route path="/Facebook" component = {Facebooklogin}/>
      </ Switch>

      </BrowserRouter>
    );
  }
}

export default App;