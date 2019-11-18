import dbConnection from "../config/database";
import md5 from "md5";
import * as Auth from "../lib/auth";

const user_table_name = "users";
const user_default_params = "username,password,email";

class User {
  constructor(username, email, password) {
    this.username = username;
    this.email = email;
    this.password_hash = md5(password);
  }

  username() {
    return this.username;
  }
  email() {
    return this.email;
  }

  create(callback) {
    this.user = {
      username: this.username,
      email: this.email,
      password_hash: this.password_hash
    };
    let sql = `INSERT INTO ${user_table_name} set ?`;
    try {
      dbConnection.query(sql, this.user, (error, results) => {
        if (error) {
          callback(error, null);
        } else {
          callback(null, results);
        }
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  static all(callback) {
    let sql = `SELECT * FROM ${user_table_name}`;
    try {
      dbConnection.query(sql, (error, results) => {
        if (error) {
          callback(error, null);
        } else {
          callback(null, results);
        }
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  static find(id, callback) {
    let sql = `SELECT * FROM ${user_table_name} WHERE id = ?`;
    try {
      dbConnection.query(sql, id, (error, results) => {
        if (error) {
          callback(error, null);
        } else {
          callback(null, results);
        }
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  static find_by(param, value, callback) {
    let sql = `SELECT * FROM ${user_table_name} WHERE ${param} = ?`;
    try {
      dbConnection.query(sql, value, (error, results) => {
        if (error) {
          callback(error, null);
        } else {
          callback(null, results);
        }
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  static update(id, params, callback) {
    let sql = `UPDATE ${user_table_name} set ? WHERE id = ${id}`;
    try {
      dbConnection.query(sql, params, (error, results) => {
        if (error) {
          callback(error, null);
        } else {
          callback(null, results);
        }
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  static destroy(id, callback) {
    let sql = `DELETE FROM ${user_table_name} WHERE id = ${id}`;
    try {
      dbConnection.query(sql, (error, results) => {
        if (error) {
          callback(error, null);
        } else {
          callback(null, results);
        }
      });
    } catch (error) {
      console.log(error.message);
    }
  }
}

export default User;
