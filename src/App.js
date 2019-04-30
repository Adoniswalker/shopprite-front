import React, { Component, Fragment } from 'react';
import './App.css';
import store from "./store";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {Provider} from "react-redux";
import {NavBar} from "./components/NavBar/nav.component";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import LoginComponent from "./components/Login/login.modal.component";
import 'jquery';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <Router>
          <Fragment>
          <NavBar/>
          <Switch>
                  <div className="container">
                      {/* <Route exact path="/login" component={LoginComponent} /> */}
                      {/* <Route exact path="/posts/:id" component={Post} /> */}
                  </div>
          </Switch>
          </Fragment>
      </Router>
    </Provider>
    );
  }
}

export default App;
