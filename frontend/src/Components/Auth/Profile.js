import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { decode } from "../../Helpers/JwtDecode";

class Profile extends Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem("token");
    this.current_user = decode(token);

    let loggedIn = true;
    if (token == null) {
      loggedIn = false;
    }

    this.state = {
      loggedIn
    };
  }
  render() {
    if (this.state.loggedIn === false) {
      return <Redirect to="/" />;
    }
    return (
      <div align="center">
        <h3>Username: {this.current_user.username}</h3>
        <p>Email: {this.current_user.email}</p>
      </div>
    );
  }
}

export default Profile;
