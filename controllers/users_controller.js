import User from "../models/user";
import Errors from "../lib/errors";
import { encode } from "../lib/auth";

class UsersController {
  static index(request, response) {
    User.all((error, results) => {
      if (error) {
        return Errors.respond_errors(response, error);
      } else {
        response.json(results);
      }
    });
  }

  static create(request, response) {
    let user = new User(
      request.body.username,
      request.body.email,
      request.body.password
    );

    user.create((error, results) => {
      if (error) {
        return Errors.respond_errors(response, error);
      } else {
        let token = encode(user);
        response.json({
          message: "Account Created Successfully",
          token,
          user: {
            username: `${user.username}`,
            email: `${user.email}`
          }
        });
      }
    });
  }

  static show(request, response) {
    const { id } = request.params;
    User.find(id, (error, results) => {
      response.send(JSON.stringify(results));
    });
  }

  static update(request, response) {
    User.update(request.params.id, request.body, (error, results) => {
      if (error) {
        return Errors.respond_errors(response, error);
      } else {
        response.json(results);
      }
    });
  }

  static destroy(request, response) {
    User.destroy(request.params.id, (error, results) => {
      if (error) {
        return Errors.respond_errors(response, error);
      } else {
        response.json(results);
      }
    });
  }
}

export default UsersController;
