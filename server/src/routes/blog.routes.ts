import { Router } from "express";
import { verifyJWT } from "../middlewares/authMiddleware";
import { createBlog, getBlogs } from "../controllers/blog.controller";

const router = Router();

router.route("/create-blog").post(verifyJWT, createBlog);
router.route("/get-blogs").get(verifyJWT, getBlogs);

export default router;
