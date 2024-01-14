import { Router } from "express";
import { verifyJWT } from "../middlewares/authMiddleware";
import {
  createBlog,
  getBlogs,
  updateBlogCoverImage,
} from "../controllers/blog.controller";

const router = Router();

router.route("/create-blog").post(verifyJWT, createBlog);
router.route("/get-blogs").get(verifyJWT, getBlogs);
router.route("/update-blog-cover-image").post(verifyJWT, updateBlogCoverImage);

export default router;
