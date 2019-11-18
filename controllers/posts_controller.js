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
    Post.update(request.params.id, request.body, (error, results) => {
      if (error) {
        return Errors.respond_errors(response, error);
      } else {
        response.json(results);
      }
    });
  }

  static destroy(request, response) {
    Post.destroy(request.params.id, (error, results) => {
      if (error) {
        return Errors.respond_errors(response, error);
      } else {
        response.json(results);
      }
    });
  }
}

export default PostsController;
