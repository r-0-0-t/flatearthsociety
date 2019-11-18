import User from "../models/user";
import Errors from "../lib/errors";
import md5 from "md5";
import { encode, decode } from "../lib/auth";

class SessionsController {
  static create(request, response) {
    console.log(JSON.stringify(request.params));
    let username = request.body.username;
    let password = md5(request.body.password);
    if (username && password)
      User.find_by("username", username, (error, results) => {
        if (error) {
          return Errors.respond_errors(response, error);
        } else {
          let user = results[0];
          if (user) {
            let password_hash = user.password_hash;
            if (password === password_hash) {
              let token = encode(user);
              response.cookie("token", token, {
                httpOnly: true
              });

              let message = {
                message: "Logged In successfully",
                token: token
              };
              response.end(JSON.stringify(message));
            } else {
              response.redirect("localhost:7000/");
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

export default SessionsController;
