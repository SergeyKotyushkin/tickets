import React, {Component} from 'react';
import {BrowserRouter, Link, Route} from 'react-router-dom';

import Home from 'components/Home';
import Login from 'components/Login';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div class="flex-container-column">
          <div class="app-header flex-container-column">
            <div class="app-header-title">
              <h1>Tickets</h1>
            </div>
            <div class="app-header-menu flex-container-row">
              <div class="app-header-menu-link-container">
                <Link to="/home">Home</Link>
              </div>
              <div class="app-header-menu-link-container">
                <Link to="/login">Login</Link>
              </div>
            </div>
          </div>
          <div class="app-content">
            <Route exact="exact" path="/home" component={Home}></Route>
            <Route path="/login" component={Login}></Route>
          </div>
        </div>
      </BrowserRouter>
    );
  };
}
