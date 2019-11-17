import mysql from "mysql";

const dbConnection = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "root",
  password: "",
  database: "flatearthsociety"
});
dbConnection.connect();

export default dbConnection;
