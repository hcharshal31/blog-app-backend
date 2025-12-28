const { Router } = require("express");

const router = Router();

const { createComments, getComments, getSingleComment, updateComment, deleteComment } = require("../controllers/commentsController");

const { authMiddleware } = require("../middlewares/authMiddleware");

router.post("/comments", authMiddleware, createComments);

router.get("/comments", getComments);

router.get("/comments/:comment_id", getSingleComment);

router.put("/comments/:comment_id", authMiddleware, updateComment);

router.delete("/comments/:comment_id", authMiddleware, deleteComment);

module.exports = router;