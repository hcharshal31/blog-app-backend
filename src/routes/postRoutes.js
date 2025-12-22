const express = require("express");
const router = express.Router();
// we can also import router directly from express like below
// const{ Router } = require("express");
// const router = Router();
// this way we dont need to import express

const { createPost, getAllPost, updatePost, deletePost } = require("../controllers/postController.js");

const { authMiddleware } = require("../middlewares/authMiddleware.js")
router.post('/', authMiddleware, createPost);

router.get('/', getAllPost);

router.put("/:id", authMiddleware, updatePost);

router.delete("/:id", authMiddleware, deletePost);

module.exports = router;