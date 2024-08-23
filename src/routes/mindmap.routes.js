import {
    createMindmap,
    getAllMindmaps,
} from "../controllers/mindmap.controller.js";
import { Router } from "express";

const router = Router()

router.route("/create-mindmap").post(createMindmap)
router.route("/get-all-mindmaps").get(getAllMindmaps)


export default router