import React, { Component } from "react";
import Axios from "axios";
import Post from "./Post";

class Posts extends Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem("token");
    let loggedIn = true;
    if (token == null) {
      loggedIn = false;
    }
    this.state = {
      loggedIn,
      title: "",
      body: "",
      posts: []
    };
    this.getPost();
    this.onChange = this.onChange.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
  }

  getPost() {
    Axios.get("/posts").then(response => {
      console.log(response.data);
      this.setState({ posts: response.data });
    });
  }

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  onSubmitForm = event => {
    event.preventDefault();
    const data = {
      title: this.state.title,
      body: this.state.body
    };
    console.log(data);
    const headers = {
      "Content-Type": "application/json",
      authorization: localStorage.getItem("token")
    };

    Axios.post("/posts", data, { headers: headers }).then(response => {
      this.getPost();
      console.log(response);
    });
  };

  render() {
    let postForm = (
      <form onSubmit={this.onSubmitForm}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={this.state.title}
          onChange={this.onChange}
        />
        <br />
        <input
          type="text"
          name="body"
          placeholder="Body"
          value={this.state.body}
          onChange={this.onChange}
        />
        <br />
        <input type="submit" value="Post New Status" />
      </form>
    );
    return (
      <div align="center">
        {this.state.loggedIn && postForm}
        <h3>Posts Page</h3>
        {this.state.posts.map((post, id) => {
          return <Post data={post} key={id} />;
        })}
      </div>
    );
  }
}

export default Posts;
