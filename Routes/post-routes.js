const {
  createComment,
  createPost,
} = require("../Controllers/post-controllers");
const express = require("express");
const router = express.Router();

router.post("/comment/add", createComment);
router.post("/create", createPost);

module.exports = router;
