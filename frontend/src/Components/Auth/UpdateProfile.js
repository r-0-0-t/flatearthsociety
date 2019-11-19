import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Axios from "axios";
import { decode } from "../../Helpers/JwtDecode";

class UpdateProfile extends Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem("token");
    this.current_user = decode(token);

    let loggedIn = true;
    if (token == null) {
      loggedIn = false;
    }

    this.state = {
      loggedIn,
      username: "",
      email: "",
      password: ""
    };
    this.headers = {
      "Content-Type": "application/json",
      authorization: localStorage.getItem("token")
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmitUserNameChange = this.onSubmitUserNameChange.bind(this);
    this.onSubmitEmailChange = this.onSubmitEmailChange.bind(this);
    this.onSubmitPasswordChange = this.onSubmitPasswordChange.bind(this);
  }
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  onSubmitUserNameChange = e => {
    e.preventDefault();
    let data = {
      username: this.state.username
    };
    Axios.post(`/users/${this.current_user.id}`, data, {
      headers: this.headers
    }).then(response => {
      console.log(response);
    });
  };
  onSubmitEmailChange = e => {
    e.preventDefault();
    let data = {
      email: this.state.email
    };
    Axios.post(`/users/${this.current_user.id}`, data, {
      headers: this.headers
    }).then(response => {
      console.log(response);
    });
  };
  onSubmitPasswordChange = e => {
    e.preventDefault();
    let data = {
      password: this.state.password
    };
    Axios.post(`/users/${this.current_user.id}`, data, {
      headers: this.headers
    }).then(response => {
      console.log(response);
    });
  };
  render() {
    if (this.state.loggedIn === false) {
      return <Redirect to="/" />;
    }
    return (
      <div align="center">
        <form onSubmit={this.onSubmitUserNameChange}>
          <label name="username">Username: </label>
          <input
            type="text"
            placeholder={this.current_user.username}
            name="username"
            value={this.state.username}
            onChange={this.onChange}
          />
          <input type="submit" />
        </form>
        <br />
        <form onSubmit={this.onSubmitEmailChange}>
          <label name="email">E-mail: </label>
          <input
            type="email"
            placeholder={this.current_user.email}
            name="email"
            value={this.state.email}
            onChange={this.onChange}
          />
          <input type="submit" />
        </form>
        <br />
        <form onSubmit={this.onSubmitPasswordChange}>
          <label name="password">Password: </label>
          <input
            type="password"
            placeholder="password"
            name="password"
            value={this.state.password}
            onChange={this.onChange}
          />
          <input type="submit" />
        </form>
        <br />
      </div>
    );
  }
}

export default UpdateProfile;
