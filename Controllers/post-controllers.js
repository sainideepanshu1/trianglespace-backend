const Comment = require("../Models/BlogComment");
const Blog = require("../Models/Blog-Model");

exports.createComment = async (req, res) => {
  try {
    const { comment, fullName, email, website, postId } = req.body;

    const newComment = new Comment({
      comment,
      fullName,
      email,
      website,
      post: postId,
    });

    const savedComment = await newComment.save();

    res.status(201).json(savedComment);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.createPost = async (req, res) => {
  try {
    const { title, content, author, category } = req.body;
    const post = await Blog.create({ title, content, author, category });

    res.status(201).json({
      status: "Success",
      message: "Blog Posted",
      post,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller for fetching all comments for a specific post
// exports.getCommentsByPostId = async (req, res) => {
//   try {
//     const postId = req.params.postId;

//     const comments = await Comment.find({ post: postId }).sort({
//       createdAt: "asc",
//     });

//     res.status(200).json(comments);
//   } catch (error) {
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };
