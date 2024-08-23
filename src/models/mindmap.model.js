import mongoose, { Schema } from "mongoose";

const NodeSchema = new Schema({
    id: {
        type: Number,
        // required: true
    },
    label: {
        type: String,
        // required: true
    },
    color: {
        type: String,
        default: '#6BF58A'
    },
    textColor: {
        type: String,
        default: 'black'
    },
    editing: {
        type: Boolean,
        default: false
    },
    borderShape: {
        type: String,
        default: ''
    },
    borderStyle: {
        type: String,
        default: 'solid'
    },
    type: {
        type: String,
        required: true
    },
    history: {
        type: [String],
        default: []
    },
    children: {
        type: [Schema.Types.Mixed], // Allows for flexibility in nested structure
        default: []
    }
});

// const Node = mongoose.model("Node", NodeSchema);

const MindmapSchema = new Schema({
    id: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    nodes: NodeSchema,
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
}, { timestamps: true });

export const Mindmap = mongoose.model("Mindmap", MindmapSchema);

