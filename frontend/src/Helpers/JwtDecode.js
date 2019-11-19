import * as jwt from "jsonwebtoken";

export function decode(token) {
  if (token) {
    let user = jwt.verify(token, "omg");
    return user;
  } else {
    console.log("Token Not Found");
  }
}
