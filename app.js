import express from "express";
import router from "./config/routes";
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(router);
app.listen(process.env.port || 7000);

export default app;
