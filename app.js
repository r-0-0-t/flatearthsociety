import express from "express";
// import cors from "cors";
import path from "path";
import router from "./config/routes";

const app = express();
app.use(express.json());
app.use(router);
// app.use(cors);
app.engine("html", require("ejs").renderFile);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(function(req, res, next) {
  next(createError(404));
});
app.listen(process.env.port || 7000);

export default app;
