import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { Mindmap } from "../models/mindmap.model.js"
import { ApiResponse } from "../utils/ApiResponse.js";

const createMindmap = asyncHandler(async (req, res) => {
    // get mindmap details from frontend
    // validation - not empty
    // check if mindmap already exists: title
    // create mindmap object - create entry in db

    const { id, title, nodes } = req.body
    console.log('Received request:', req.body);

    if (
        !id ||
        !title
    ) {
        throw new ApiError(400, "All fields are required")
        
    }

    // const existedMindmap = await Mindmap.findOne({
    //     title
    // })

    // if (existedMindmap) {
    //     throw new ApiError(409, "Mindmap with title already exists")
    // }

    const mindmap = await Mindmap.create({
        id,
        title,
        nodes
    })

    if (!mindmap) {
        throw new ApiError(500, "Mindmap creation failed")
    }

    return res.status(201).json(
        new ApiResponse(201, "Mindmap created successfully", mindmap)
    )
})

const getAllMindmaps = asyncHandler(async (req, res) => {
    const mindmaps = await Mindmap.find({})

    if (!mindmaps) {
        throw new ApiError(404, "No mindmaps found")
    }

    return res.status(200).json(
        new ApiResponse(200, "Mindmaps found", mindmaps)
    )
})


export {
    createMindmap,
    getAllMindmaps
}