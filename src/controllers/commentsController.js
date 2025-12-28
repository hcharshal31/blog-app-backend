const Comments = require("../models/comments");
const Post = require("../models/post");

const createComments = async (req, res) => {
    try {
        const { content } = req.body;
        if(!content){
            return res.status(400).json({
                message: "Content is missing"
            })
        }

        const PostId = req.body.post_id;
        const post = await Post.findById(PostId);
        if(!post){
            return res.status(404).json({
                message: "Post not found",
            })
        }

        const comment = await Comments.create({
            content: content,
            author: req.user.id,
            post: PostId,
        });

        res.status(201).json({
            message: "Comment added succussfully",
            comment
        })
    } catch (err) {
        res.status(500).json({
            message: "Error adding comment"
        })
    }
}

const getComments = async (req, res) => {
    try{
        const { post_id } = req.query;

        const comments = await Comments.find({ post: post_id }).populate("author", "firstName lastName emailId").sort({createdAt: -1})

        return res.status(200).json({
            count: comments.length,
            comments
        })

    } catch(err) {
        res.status(500).json({
            message: "Error in finding comments"
        })
    }
}

const getSingleComment = async (req, res) => {
    try{
        const id = req.params.comment_id;
        const  comment = await Comments.findById(id);
        if(!comment){
            return res.status(404).json({
                message: "Comment not found"
            })
        }

        res.status(200).json({
            message: "comment fetched successfully",
            comment,
        })
    } catch(err){
        res.status().json({
            message: "Error in finding comment",
        })
    }
}

const updateComment = async (req, res) => {
    try{
        const { comment_id } = req.params;

        const { content } = req.body;

        if(!content) {
            return res.status(400).json({
                message: "Content is required"
            })
        }

        const comment = await Comments.findById(comment_id);

        if(!comment) {
            return res.status(404).json({
                message: "Comment not found"
            })
        }

        if(comment.author.toString() !== req.user.id){
            return res.status(403).json({
                message: "You are not allowed to edit this comment"
            })
        }

        comment.content = content;
        await comment.save();

        return res.status(200).json({
            message: "comment updated succussfully",
            comment,
        })
    } catch(err) {
        return res.status(500).json({
            message: "Error updating comment"
        })
    }
}

const deleteComment = async (req, res) => {
    try{
        const { comment_id } = req.params;

        const comment = await Comments.findById(comment_id);

        if(!comment){
            return res.status(404).json({
                message: "Comment not found"
            })
        }

        const post = await Post.findById(comment.post.toString());

        const isCommentAuthor = comment.author.toString() === req.user.id;
        const isPostAuthor = post.author.toString() === req.user.id;

        if(!isCommentAuthor && !isPostAuthor) {
            return res.status(403).json({
                message: "Your are not allowed to delete this comment"
            })
        }

        await comment.deleteOne();

        return res.status(200).json({
            message: "comment deleted succussfully"
        })
    } catch(err){
        return res.status(500).json({
            message: "Error deleting comment",
            err,
        })
    }
}

module.exports = { createComments, getComments, getSingleComment, updateComment, deleteComment };