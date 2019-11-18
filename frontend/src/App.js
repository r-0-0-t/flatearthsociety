import React, { Component } from "react";
import logo from "./logo.svg";
import Axios from "axios";
import Post from "./components/Post/Post";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

class App extends Component {
  state = {
    posts: []
  };
  componentDidMount() {
    Axios.get("/api/v1/posts").then(response => {
      this.setState({ posts: response.data });
    });
  }
  render() {
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              News
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>

        <div>
          {this.state.posts.map((post, id) => (
            <Post data={post} key={id} />
          ))}
        </div>
      </div>
    );
  }
}

export default App;
