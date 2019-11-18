import mysql from "mysql";

const dbConnection = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "root",
  password: "",
  database: "flatearthsociety"
});
dbConnection.connect(function(err) {
  if (err) {
    return console.error("error: " + err.message);
  }

  let usersTableSQL = `create table if not exists users(
                          id integer primary key auto_increment,
                          username varchar(255) not null unique,
                          email varchar(255) not null unique,
                          password_hash varchar(255) not null )`;
  let postsTableSQL = `create table if not exists posts(
                            id integer primary key auto_increment,
                            belongs_to varchar(255) not null,
                            title text not null,
                            body varchar(255) not null )`;
  dbConnection.query(usersTableSQL, function(err, results, fields) {
    if (err) {
      console.log(err.message);
    }
  });
  dbConnection.query(postsTableSQL, function(err, results, fields) {
    if (err) {
      console.log(err.message);
    }
  });
});

export default dbConnection;
