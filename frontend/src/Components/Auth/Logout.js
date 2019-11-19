import React, { Component } from "react";
import { Link } from "react-router-dom";

class Logout extends Component {
  state = {};
  componentDidMount() {
    if (localStorage.getItem("token")) {
      localStorage.removeItem("token");
      window.location.reload(false);
    }
  }
  refresh() {}
  render() {
    return (
      <div align="center">
        <h3>You've been logged out</h3>
        <Link to="/">Login Again</Link>
      </div>
    );
  }
}

export default Logout;
