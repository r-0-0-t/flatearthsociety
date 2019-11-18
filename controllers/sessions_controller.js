import User from "../models/user";
import Errors from "../lib/errors";
import md5 from "md5";

class SessionsController {
  static create(request, response) {
    let username = request.body.username;
    let password = request.body.password;
    if (username && password) {
      password = md5(password);
      User.find_by("username", username, (error, results) => {
        if (error) {
          return Errors.respond_errors(response, error);
        } else {
          let user = results[0];
          if (user) {
            let password_hash = user.password_hash;
            if (password === password_hash) {
              response.json({
                message: "Logged In successfully",
                token: token
              });
            } else {
              response.json({
                message: "Not a valid username/password!"
              });
            }
          } else {
            response.json({
              message: "User Not Found"
            });
          }
        }
      });
    }
  }
}

export default SessionsController;
