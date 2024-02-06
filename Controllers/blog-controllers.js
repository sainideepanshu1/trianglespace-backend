const Comment = require("../Models/BlogComment");
const Blog = require("../Models/Blog-Model");

//Create Blog
exports.createPost = async (req, res) => {
  try {
    const { title, content, category } = req.body;
    const author = req.user.username;
    const authorId = req.user._id;
    const image = req.file ? req.file.filename : null;
    const post = await Blog.create({
      title,
      content,
      author,
      authorId,
      category,
      image,
    });
    console.log(req.user);
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

//Get All Posts
exports.getPosts = async (req, res) => {
  try {
    const posts = await Blog.find();
    res.status(200).json({
      status: "Success",
      posts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get Post By ID
exports.getPostById = async (req, res) => {
  try {
    const postId = req.params.id;

    const post = await Blog.findById(postId);

    if (!post) {
      return res.status(404).json({
        status: "Failed",
        message: "Blog post not found",
      });
    }

    res.status(200).json({
      status: "Success",
      message: "Blog post retrieved",
      post,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "Failed",
      message: "Internal Server Error",
    });
  }
};

exports.getBlogsByAuthorId = async (req, res) => {
  try {
    const authorId = req.user._id; // Access the user ID from the request object
    const blogs = await Blog.find({ authorId: authorId });

    res.json(blogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Comment on a blog
exports.createComment = async (req, res) => {
  const { blogId } = req.params;
  const { user, email, website, text } = req.body;
  try {
    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    blog.comments.push({
      user,
      text,
      email,
      website,
    });

    await blog.save();

    return res.status(201).json(blog);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

//Delete a blog
exports.deleteBlog = async (req, res) => {
  const blogId = req.params.id;

  try {
    const deletedBlog = await Blog.findOneAndDelete({ _id: blogId });
    if (!deletedBlog) {
      return res.status(404).json({
        status: "Failed",
        message: "Blog not Found",
      });
    }
    res.status(200).json({
      status: "Success",
      message: "Blog Deleted Successfully",
      deletedBlog,
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: "Internal Server Error",
    });
  }
};

exports.approveComment = async (req, res) => {
  const { blogId, commentId } = req.params;

  try {
    const updatedBlog = await Blog.findOneAndUpdate(
      { _id: blogId, "comments._id": commentId },
      { $set: { "comments.$.approved": true } },
      { new: true }
    );

    if (!updatedBlog) {
      return res.status(404).json({
        status: "Failed",
        message: "Blog or Comment not Found",
      });
    }

    const approvedComment = updatedBlog.comments.find(
      (comment) => comment._id.toString() === commentId
    );

    res.status(200).json({
      status: "Success",
      message: "Comment Approved Successfully",
      approvedComment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "Failed",
      message: "Internal Server Error",
    });
  }
};

exports.deleteComment = async (req, res) => {
  const { blogId, commentId } = req.params;

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      blogId,
      { $pull: { comments: { _id: commentId } } },
      { new: true }
    );

    if (!updatedBlog) {
      return res.status(404).json({
        status: "Failed",
        message: "Blog or Comment not Found",
      });
    }

    res.status(200).json({
      status: "Success",
      message: "Comment Deleted Successfully",
      updatedBlog,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "Failed",
      message: "Internal Server Error",
    });
  }
};

exports.searchByTitle = async (req, res) => {
  try {
    const { title } = req.query;

    const blogs = await Blog.find({
      title: { $regex: new RegExp(title, "i") },
    });

    res.json({ blogs });
  } catch (error) {
    console.error("Error searching for blog by title:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
