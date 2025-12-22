const Post = require("../models/post"); // importing Post model
require("../models/user");

const createPost = async (req, res) => {
    try{
        const { title, content, tags } = req.body;
        // If anything i.e.title, content or author name is missing when we are creating the post then the code inside the if statement will execute.
        if(!title || !content ) {
            return res.status(400).json( // 400 status code represents bad request from client.
                {
                    message: "title, content and author are required."
                }
            )
        }

        const post = await Post.create(
            {
                title,
                content,
                author: req.user.id,
                tags,
            }
        )

        res.status(201).json( // 201 status code means resourse created succussfully.
            {
                message: "Post created succussfully", post
            }
        )
    } catch (err) {
        res.status(500).json(  // 500 status code means server error.
            {
                message: "Error creating post",
                error: err.message,
            }
        )
    }
}

const getAllPost = async (req, res) =>{
    try{
        const posts = await Post.find().populate("author", "name email");  //We will use this when we will add authoentication

        res.status(200).json(
            {
                count: posts.length,
                posts
            }
        )
    } catch(err) {
        res.status(500).json({
            message: "Error fetching posts",
            error: err.message
        })
    }
}

const updatePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const { title, content, tags } = req.body;

        const post = await Post.findById(postId);

        if(!post) {
            return res.status(404).json({
                message: "Post not found!"
            });
        }

        if(post.author.toString() !== req.user.id){
            return res.status(403).json({
                message: "You are not allowed to edit the post"
            })
        }

        if(title) post.title = title;
        if(content) post.content = content;
        if (tags) post.tags = tags;

        await post.save();

        res.status(200).json({
            message: "Post updated succuessfully"
        })

    } catch(err) {
        res.status(500).json({
            message: "Error editing the post",
        })
    }
}

const deletePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await Post.findById(postId);

        if(!post) {
            return res.status(404).json({
                message: "Post not found"
            })
        }

        if(post.author.toString() !== req.user.id) {
            return res.status(403).json({
                message: "You are not allowed to delete the post!",
            });
        }

        await post.deleteOne();

        res.status(200).json({
            message: "Post deleted succussfully",
        })
    } catch (err) {
        res.status(500).json({
            message: "Error in deleting post"
        })
    }
}

module.exports = { createPost, getAllPost, updatePost, deletePost };