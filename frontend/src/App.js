import React, { Component } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem("token");

    let loggedIn = true;
    if (token == null) {
      loggedIn = false;
    }

    this.state = {
      loggedIn
    };
  }

  render() {
    return (
      <div>
        <ul>
          {this.state.loggedIn && (
            <li>
              <Link to="/logout">Logout</Link>
            </li>
          )}
          {this.state.loggedIn && (
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          )}

          {this.state.loggedIn && (
            <li>
              <Link to="/update">Update Profile</Link>
            </li>
          )}

          {!this.state.loggedIn && (
            <li>
              <Link to="/">Login</Link>
            </li>
          )}
          {!this.state.loggedIn && (
            <li>
              <Link to="/registration">Registration</Link>
            </li>
          )}
          {
            <li>
              <Link to="/posts">Posts</Link>
            </li>
          }
        </ul>
      </div>
    );
  }
}

export default App;
