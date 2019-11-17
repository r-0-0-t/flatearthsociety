import express from "express";
import PostsController from "../controllers/posts_controller";
import UsersController from "../controllers/users_controller";

const router = express.Router();

router.post("/api/v1/users", UsersController.create);
router.get("/api/v1/users", UsersController.index);
router.get("/api/v1/users/:id", UsersController.show);
router.post("/api/v1/users/:id", UsersController.update);
router.delete("/api/v1/users/:id", UsersController.destroy);

router.get("/api/v1/posts", PostsController.index);
router.post("/api/v1/posts", PostsController.create);
router.get("/api/v1/posts/:id", PostsController.show);
router.put("/api/v1/posts/:id", PostsController.update);
router.delete("/api/v1/posts/:id", PostsController.delete);

export default router;
