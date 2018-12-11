import React, {Component} from 'react';
import {BrowserRouter, Switch, Link, Route} from 'react-router-dom';

import Home from 'components/Home';
import Login from 'components/Login';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="flex-container-column">
          <div className="app-header flex-container-column">
            <div className="app-header-title">
              <h1>Tickets</h1>
            </div>
            <div className="app-header-menu flex-container-row">
              <div className="app-header-menu-link-container">
                <Link to="/">Home</Link>
              </div>
              <div className="app-header-menu-link-container">
                <Link to="/login">Login</Link>
              </div>
            </div>
          </div>
          <div className="app-content">
            <Switch>
              <Route exact={true} path="/" component={Home}></Route>
              <Route path="/login" component={Login}></Route>
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  };
}
