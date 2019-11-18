import express from "express";
import router from "./config/routes";

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(router);
app.listen(process.env.port || 7000);

export default app;
