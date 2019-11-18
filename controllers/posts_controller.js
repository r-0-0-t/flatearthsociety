import Post from "../models/post";
import Errors from "../lib/errors";
import { decode } from "../lib/auth";

class PostsController {
  static index(request, response) {
    Post.all((error, results) => {
      if (error) {
        return Errors.respond_errors(response, error);
      } else {
        response.json(results);
      }
    });
  }

  static create(request, response) {
    //TODO Handle SQL Injection
    let user = decode(request.headers.authorization);
    if (user) {
      let post = new Post(request.body.title, request.body.body, user.username);
      post.create((error, token) => {
        if (error) {
          return Errors.respond_errors(response, error);
        } else {
          response.json({
            message: "Post Created Successfully",
            post: {
              title: `${post.title}`,
              body: `${post.body}`,
              author: `${user.username}`
            }
          });
        }
      });
    } else {
      response.json({
        message: "Invalid User!"
      });
    }
  }

  static show(request, response) {
    const { id } = request.params;
    Post.find(id, (error, results) => {
      response.send(JSON.stringify(results));
    });
  }

  static update(request, response) {
    //TODO Handle SQL Injection
    let user = decode(request.headers.authorization);
    let post_id = request.params.id;
    if (user) {
      Post.find(post_id, (error, results) => {
        if (error) {
          return Errors.respond_errors(error.message);
        } else {
          let post = results[0];
          if (post) {
            if (post.belongs_to === user.username) {
              Post.update(post_id, request.body, (error, results) => {
                if (error) {
                  return Errors.respond_errors(response, error);
                } else {
                  post = request.body;
                  response.json(post);
                }
              });
            } else {
              response.json({
                message: "Invalid User! Permission Denied!"
              });
            }
          } else {
            response.json({
              message: "Invalid ID. Post not found"
            });
          }
        }
      });
    } else {
      response.json({
        message: "Invalid User!"
      });
    }
  }

  static destroy(request, response) {
    let user = decode(request.headers.authorization);
    if (user) {
      let post_id = request.params.id;
      Post.find(post_id, (error, results) => {
        if (error) {
          return Errors.respond_errors(error.message);
        } else {
          let post = results[0];
          if (post) {
            if (post.belongs_to === user.username) {
              Post.destroy(request.params.id, (error, results) => {
                if (error) {
                  return Errors.respond_errors(response, error);
                } else {
                  response.json({
                    message: "Post Successfully Deleted!"
                  });
                }
              });
            } else {
              response.json({
                message: "Permission Denied!"
              });
            }
          }
        }
      });
    } else {
      response.json({
        message: "Invalid User!"
      });
    }
  }
}

export default PostsController;
