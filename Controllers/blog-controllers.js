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
