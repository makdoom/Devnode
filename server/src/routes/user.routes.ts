import { Router } from "express";
import {
  loginUser,
  registerUser,
  rootRoute,
} from "../controllers/user.controller";

const router = Router();

router.route("/").get(rootRoute);
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

export default router;
