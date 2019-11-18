import dbConnection from "../config/database";
import md5 from "md5";
import * as Auth from "../lib/auth";

const post_table_name = "posts";
const post_default_params = "title,body,ratings,rate_count";

class Post {
  constructor(title, body, belongs_to) {
    this.belongs_to = belongs_to;
    this.title = title;
    this.body = body;
  }

  create(callback) {
    this.post = {
      belongs_to: this.belongs_to,
      title: this.title,
      body: this.body
    };
    let sql = `INSERT INTO ${post_table_name} set ?`;
    try {
      dbConnection.query(sql, this.post, (error, results) => {
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
    let sql = `SELECT * FROM ${post_table_name}`;
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
    let sql = `SELECT * FROM ${post_table_name} WHERE id = ?`;
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
    let sql = `SELECT * FROM ${post_table_name} WHERE ${param} = ?`;
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
    let sql = `UPDATE ${post_table_name} set ? WHERE id = ${id}`;
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
    let sql = `DELETE FROM ${post_table_name} WHERE id = ${id}`;
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

export default Post;
