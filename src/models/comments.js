const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        trim: true,
    },
    author: {
        type:mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Post",
    }
});

const Comments = mongoose.model("Comments", commentSchema);

module.exports = Comments;