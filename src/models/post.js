const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
    {
        title:{
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,  // This means that the author stores the ObjectId that refers to the user model
            ref: "User", // This tell that the ObjectId stored in this field refers to a document in the User model.
            required: true,
        },
        tags: [
            {
                type: String,
            }
        ]
    },
    {
        timestamps: true,
    }
)

const Post = mongoose.model("Post", postSchema);

module.exports = Post;