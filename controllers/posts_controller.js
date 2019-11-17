import posts from "../models/post";
import dbConnection from "../config/database";
import moment from "moment";

class PostsController {
  static index(req, res) {
    let sql = "select * from users";
    dbConnection.query(sql, (error, results, fields) => {
      if (error) {
        return res.status(404).json({
          error: error.message
        });
      } else {
        return res.status(200).json({
          message: "success",
          data: results
        });
      }
    });
  }

  static create(req, res) {
    const id = parseInt(posts.length) + 1;
    const { title, body } = req.body;
    const post = {
      id: id,
      title,
      body,
      created_at: moment.utc().format()
    };
    posts.push(post);
    return res.status(201).json({
      message: "post successful."
    });
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

export default PostsController;
