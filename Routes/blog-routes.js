const {
  createComment,
  createPost,
  getPosts,
  getPostById,
  deleteBlog,
  approveComment,
  deleteComment,
  getBlogsByAuthorId,
  searchByTitle,
} = require("../Controllers/blog-controllers");
const upload = require("../config/multerConfig");
const express = require("express");
const authenticateToken = require("../Middleware/tokenValidation");
const router = express.Router();

// Route to get blog by authorId
router.get("/searchByAuthorId", authenticateToken, getBlogsByAuthorId);

router.get('/searchByTitle', searchByTitle);

// Route to get all blogs
router.get("/getAllPosts", getPosts);

// Route to create comment
router.post("/:blogId/comments", createComment);

// Route to get blog by id
router.get("/:id", getPostById);

// Route to create blog
router.post("/create", authenticateToken, upload.single("image"), createPost);

// Route to delete blog
router.delete("/delete/:id", authenticateToken, deleteBlog);

// Route for approving comment
router.get("/:blogId/comment/:commentId", authenticateToken, approveComment);

// Route to delete the comment
router.delete("/delete/:blogId/comment/:commentId", deleteComment);

module.exports = router;
