import * as jwt from "jsonwebtoken";
import User from "../models/user";

export function encode(user) {
  let payload = {
    username: user.username,
    email: user.email
  };
  return jwt.sign(payload, "omg", { algorithm: "HS256", expiresIn: 1000 });
}

export function decode(token) {
  let user = jwt.verify(token, "omg");
  return user;
}
