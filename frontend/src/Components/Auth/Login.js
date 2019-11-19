import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Axios from "axios";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      loggedIn: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
  }

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  onSubmitForm = event => {
    event.preventDefault();
    const data = this.state;
    Axios.post("/sessions", data).then(response => {
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        this.setState({
          loggedIn: true
        });
        window.location.reload(false);
      }
    });
  };
  render() {
    if (this.state.loggedIn || localStorage.getItem("token")) {
      return <Redirect to="/profile" />;
    }
    return (
      <div>
        <form onSubmit={this.onSubmitForm}>
          <input
            type="text"
            placeholder="username"
            name="username"
            value={this.state.username}
            onChange={this.onChange}
          />
          <br />
          <input
            type="password"
            placeholder="password"
            name="password"
            value={this.state.password}
            onChange={this.onChange}
          />
          <br />
          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default Login;
