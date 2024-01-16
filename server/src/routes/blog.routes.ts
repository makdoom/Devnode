import { Router } from "express";
import { verifyJWT } from "../middlewares/authMiddleware";
import {
  createBlog,
  getBlogs,
  updateBlogCoverImage,
  updateBlogDetails,
} from "../controllers/blog.controller";
import { uploadFile } from "../middlewares/multer.middleware";

const router = Router();

router.route("/create-blog").post(verifyJWT, createBlog);
router.route("/get-blogs").get(verifyJWT, getBlogs);
router
  .route("/update-image")
  .post(verifyJWT, uploadFile.single("coverImage"), updateBlogCoverImage);
router.route("/update-blog").post(verifyJWT, updateBlogDetails);

export default router;
