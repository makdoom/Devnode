import { Router } from "express";
import { registerRoute, rootRoute } from "../controllers/user.controller";

const router = Router();

router.route("/").get(rootRoute);
router.route("/register").post(registerRoute);

export default router;
