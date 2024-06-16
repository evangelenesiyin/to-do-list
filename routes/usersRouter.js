import express from "express";
import { create, login } from "../controllers/usersCtrl.js";

const router = express.Router();

router.post("/", create);
router.post("/login", login);

export default router;
