import dbConnection from "../config/database";
var md5 = require("md5");
import * as Auth from "../lib/auth";

class UsersController {
  static index(req, res) {
    let sql = "select * from users";
    dbConnection.query(sql, (error, results) => {
      if (error) {
        return res.status(404).json({
          error: error.message
        });
      } else {
        res.render("index", { data: results });
      }
    });
  }

  static create(req, res) {
    const { email, password } = req.body;
    if (email && password) {
      let password_hash = md5(password);
      let token = Auth.encode(email, password_hash);
      dbConnection.query(
        "INSERT INTO users SET ?",
        {
          username: req.body.username,
          email,
          password_hash: md5(password)
        },
        (err, results) => {
          if (err) {
            throw err;
          } else {
            res.status(201).json({
              message: "account created!",
              token: token
            });
          }
        }
      );
    }
  }

  static show(req, res) {
    const { id } = req.params;
    const post = posts.find(post => post.id == id);
    if (post) {
      return res.status(200).json({
        message: `showing post of id ${id}`,
        post: post
      });
    } else {
      res.status(404).json({
        error: `no post found with id ${id}.`
      });
    }
  }

  static update(req, res) {
    const { id } = req.params;
    const post = posts.find(post => post.id == id);
    if (post) {
      post.title = req.body.title;
      post.body = req.body.body;
      return res.status(201).json({
        message: "post updated.",
        post: post
      });
    } else {
      res.status(400).json({
        error: "unprocessable entity.such post may not exist"
      });
    }
  }

  static delete(req, res) {
    const { id } = req.params;
    const nposts = posts.find(post => post.id == id);
    if (post) {
      const posts = posts.filter(npost => npost !== post);
      return res.status(200).json({
        message: "post deleted successfully.",
        posts: nposts
      });
    } else {
      res.status(400).json({
        error: "unprocessable entity.such post may not exist"
      });
    }
  }
}

export default UsersController;
