import { Router } from "express";
import { verifyJWT } from "../middlewares/authMiddleware";
import { createBlog } from "../controllers/blog.controller";

const router = Router();

router.route("/create-blog").post(verifyJWT, createBlog);

export default router;
