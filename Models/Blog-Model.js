const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      default: "Uncategorized",
    },
  },
  {
    timestamps: true,
  }
);

const Blog = mongoose.model("Post", blogSchema);

module.exports = Blog;
