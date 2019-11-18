import * as jwt from "jsonwebtoken";
import User from "../models/user";

export function encode(user) {
  let payload = {
    id: user.id,
    username: user.username,
    email: user.email
  };
  return jwt.sign(payload, "omg", { algorithm: "HS256", expiresIn: 10000 });
}

export function decode(token) {
  if (token) {
    let user = jwt.verify(token, "omg");
    return user;
  } else {
    console.log("Token Not Found");
  }
}
