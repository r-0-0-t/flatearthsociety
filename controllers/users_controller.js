import dbConnection from "../config/database";
var md5 = require("md5");
import User from "../models/user";
import Errors from "../lib/errors";

class UsersController {
  static index(req, res) {
    User.all((error, results) => {
      if (error) {
        return Errors.respond_errors(res, error);
      } else {
        res.render("users/index", { data: results });
      }
    });
  }

  static create(request, response) {
    let user = new User(
      request.body.username,
      request.body.email,
      request.body.password
    );

    user.create((error, token) => {
      if (error) {
        return Errors.respond_errors(response, error);
      } else {
        response.writeHead(200, {
          "Set-Cookie": `auth-token=${token}`
        });
        response.end();
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
