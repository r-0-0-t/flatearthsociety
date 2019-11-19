import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import Axios from "axios";
import Login from "./Components/Auth/Login";
import Logout from "./Components/Auth/Logout";
import Profile from "./Components/Auth/Profile";
import UpdateProfile from "./Components/Auth/UpdateProfile";
import Posts from "./Components/Posts/Posts";

Axios.defaults.baseURL = "http://localhost:7000/api/v1/";

Axios.interceptors.request.use(function(config) {
  const token = localStorage.getItem("token");
  config.headers.authorization = token;

  return config;
});

const app = (
  <Router>
    <App />
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/logout" component={Logout} />
      <Route exact path="/profile" component={Profile} />
      <Route path="/update" component={UpdateProfile} />
      <Route path="/posts" component={Posts} />
    </Switch>
  </Router>
);

ReactDOM.render(app, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
