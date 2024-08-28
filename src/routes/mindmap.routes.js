import {
    createMindmap,
    getAllMindmaps,
    deleteMindmap
} from "../controllers/mindmap.controller.js";
import { Router } from "express";

const router = Router()

router.route("/create-mindmap").post(createMindmap)
router.route("/get-all-mindmaps").get(getAllMindmaps)
router.route("/delete-mindmap/:id").delete(deleteMindmap)


export default router