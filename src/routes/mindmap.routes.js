import {
    createMindmap,
    getAllMindmaps,
    deleteMindmap,
    updateMindmap
} from "../controllers/mindmap.controller.js";
import { Router } from "express";

const router = Router()

router.route("/create-mindmap").post(createMindmap)
router.route("/get-all-mindmaps/:id").get(getAllMindmaps)
router.route("/delete-mindmap/:id").delete(deleteMindmap)
router.route("/update-mindmap/:id").put(updateMindmap)


export default router