import React, { Component } from "react";
import { decode } from "../../Helpers/JwtDecode";
import Axios from "axios";

class Post extends Component {
  constructor(props) {
    super(props);
    let token = localStorage.getItem("token");
    this.currentUser = {
      username: ""
    };
    if (token) this.currentUser = decode(token);
  }
  onDeleteClick = event => {
    const headers = {
      "Content-Type": "application/json",
      authorization: localStorage.getItem("token")
    };
    Axios.delete(`/posts/${this.props.data.id}`, { headers: headers }).then(
      response => {
        console.log(response.data);
        window.location.reload(false);
      }
    );
  };
  render() {
    let deletePost = <button onClick={this.onDeleteClick}>Delete</button>;
    return (
      <div>
        <h3>{this.props.data.title}</h3>
        <p>{this.props.data.body}</p>
        <p>{this.props.data.belongs_to}</p>
        {this.currentUser.username === this.props.data.belongs_to && deletePost}
      </div>
    );
  }
}

export default Post;
