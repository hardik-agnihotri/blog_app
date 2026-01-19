import express from "express";
import { goGhostmode, login, myinfo, signup } from "../controller/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup",signup);
router.post("/login",login);
router.get("/me",protect,myinfo);
router.put("/go-ghost",protect,goGhostmode);

export default router;