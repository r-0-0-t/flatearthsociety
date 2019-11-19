import dbConnection from "../config/database";
import { decode } from "../lib/auth";

const rating_table_name = "ratings";
const rating_default_params = "post_id,ratings,user_id,count";

class Post {
  static create(rating, callback) {
    let sql = `INSERT INTO ${rating_table_name} set ?`;
    try {
      dbConnection.query(sql, rating, (error, results) => {
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

  static show(id, callback) {
    let sql = `SELECT SUM(ratings)
    FROM ${rating_table_name}
    WHERE post_id = ? `;
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
}

export default Post;
