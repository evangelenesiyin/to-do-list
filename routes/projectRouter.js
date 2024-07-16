import express from "express";
import { createProject, getAllProjects } from "../controllers/projectsCtrl.js";

const router = express.Router();

router.post("/new", createProject);
router.get("/", getAllProjects);

export default router;
