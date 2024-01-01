import { Router } from "express";
import { rootRoute } from "../controllers/user.controller";

const router = Router();

router.route("/").get(rootRoute);

export default router;
