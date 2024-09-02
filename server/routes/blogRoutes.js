const {
  getBlogs,
  addBlog,
  deleteBlog,
  updateBlog,
} = require("../controllers/blogController");

const router = require("express").Router();

router.get("/blogs", getBlogs);
router.post("/addBlog", addBlog);
router.delete("/deleteBlog/:blogId", deleteBlog);
router.put("/updateBlog/:blogId", updateBlog);

module.exports = router;
