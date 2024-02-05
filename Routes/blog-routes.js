const {
  createComment,
  createPost,
  getPosts,
  getPostById,
} = require("../Controllers/blog-controllers");
const upload  = require("../config/multerConfig");
const express = require("express");
const authenticateToken = require("../Middleware/tokenValidation");
const router = express.Router();

router.post("/:blogId/comments", createComment);

router.post("/create", authenticateToken, upload.single("image"), createPost);
router.get("/getAllPosts", getPosts);

router.get("/:id", getPostById);
module.exports = router;
