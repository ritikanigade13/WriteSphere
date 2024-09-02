const Blog = require("../models/blogModel");
const getBlogs = async (req, res) => {
  const currentPage = parseInt(req.query.page) || 1;
  const pageLimit = parseInt(req.query.limit) || 10;

  try {
    const blogs = await Blog.find({})
      .select("title author category")
      .limit(pageLimit)
      .skip((currentPage - 1) * pageLimit)
      .sort({ createdAt: -1 });

    if (!blogs || blogs.length === 0) {
      return res.status(404).json({ message: "No blogs found" });
    }

    return res.status(200).json({ blogs });
  } catch (error) {
    return res.status(500).json({ message: "Error retrieving blogs", error });
  }
};

const addBlog = async (req, res) => {
  try {
    const { title, content, author, tags, category } = req.body;

    if (!title || !content || !author) {
      return res
        .status(400)
        .json({ message: "Title, content, and author are required" });
    }

    const blog = new Blog({
      title,
      content,
      author,
      tags,
      category,
    });

    await blog.save();

    return res.status(201).json({ message: "Blog added successfully", blog });
  } catch (error) {
    return res.status(500).json({ message: "Error adding blog", error });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const blogId = req.params.blogId;
    await Blog.deleteOne({ _id: blogId });

    return res.status(200).json({ message: "Blog deleted successfully!" });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting blog", error });
  }
};

const updateBlog = async (req, res) => {
  try {
    const blogId = req.params.blogId;
    const updatedData = req.body;

    const result = await Blog.updateOne({ _id: blogId }, { $set: updatedData });

    if (result.modifiedCount === 0) {
      return res
        .status(404)
        .json({ message: "Blog not found or no changes made" });
    }

    return res.status(200).json({ message: "Blog updated successfully!" });
  } catch (error) {
    return res.status(500).json({ message: "Error updating blog", error });
  }
};

module.exports = { updateBlog };

module.exports = { getBlogs, addBlog, deleteBlog, updateBlog };
