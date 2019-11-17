import * as jwt from "jsonwebtoken";

export function encode(username, password) {
  let payload = {
    username: username,
    password: password
  };
  return jwt.sign(payload, "omg", { algorithm: "HS256", expiresIn: 1000 });
}

export function decode(token) {
  jwt.verify(token, "omg", (error, decoded) => {
    if (error) {
      console.log(error);
      return false;
    } else {
      return decoded;
    }
  });
}
