const {
  createComment,
  createPost,
  getPosts,
  getPostById,
  deleteBlog,
  approveComment,
} = require("../Controllers/blog-controllers");
const upload = require("../config/multerConfig");
const express = require("express");
const authenticateToken = require("../Middleware/tokenValidation");
const router = express.Router();

//Route to get all blogs
router.get("/getAllPosts", getPosts);

//Route to get blog by id
router.get("/:id", getPostById);

//Route to create comment
router.post("/:blogId/comments", createComment);

//Route to create blog
router.post("/create", authenticateToken, upload.single("image"), createPost);

//Route to delete blog
router.delete("/delete/:id", authenticateToken, deleteBlog);

//Route for approving comment
router.post('/:blogId/comment/:commentId', approveComment);

module.exports = router;
