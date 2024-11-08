import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { Mindmap } from "../models/mindmap.model.js"
import { ApiResponse } from "../utils/ApiResponse.js";

const createMindmap = asyncHandler(async (req, res) => {
    // get mindmap details from frontend
    // validation - not empty
    // check if mindmap already exists: title
    // create mindmap object - create entry in db

    const { id, title, nodes, userId } = req.body

    if (
        !id ||
        !title ||
        !userId
    ) {
        throw new ApiError(400, "All fields are required")

    }

    const existedMindmap = await Mindmap.findOne({
        id,
        title
    })

    if (existedMindmap) {
        if (existedMindmap.owner === userId) {
            throw new ApiError(409, "Mindmap with title already exists")
        }
    }


    const mindmap = await Mindmap.create({
        id,
        title,
        nodes,
        owner: userId,
    })

    if (!mindmap) {
        throw new ApiError(500, "Mindmap creation failed")
    }

    return res.status(201).json(
        new ApiResponse(201, "Mindmap created successfully", mindmap)
    )
})

const getAllMindmaps = asyncHandler(async (req, res) => {
    const mindmaps = await Mindmap.find(
        {
            owner: req.params.id
        }
    )


    if (!mindmaps) {
        throw new ApiError(404, "No mindmaps found")
    }

    return res.status(200).json(
        new ApiResponse(200, "Mindmaps found", mindmaps)
    )
})

const deleteMindmap = asyncHandler(async (req, res) => {
    const { id } = req.params

    const mindmap = await Mindmap.findOneAndDelete({
        id
    })

    if (!mindmap) {
        throw new ApiError(404, "Mindmap not found")
    }

    return res.status(200).json(
        new ApiResponse(200, "Mindmap deleted successfully", mindmap)
    )
})

const updateMindmap = asyncHandler(async (req, res) => {
    const { id } = req.params
    const { title, nodes } = req.body

    const mindmap = await Mindmap.findOneAndUpdate({
        id
    }, {
        title,
        nodes
    }, {
        new: true
    })

    if (!mindmap) {
        throw new ApiError(404, "Mindmap not found")
    }

    return res.status(200).json(
        new ApiResponse(200, "Mindmap updated successfully", mindmap)
    )
})


export {
    createMindmap,
    getAllMindmaps,
    deleteMindmap,
    updateMindmap
}