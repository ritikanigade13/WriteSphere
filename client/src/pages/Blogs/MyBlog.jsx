import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Stack,
  Snackbar,
  Alert,
} from "@mui/material";

const MyBlog = () => {
  const { authorId } = useParams();
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageLimit = 10;

  
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/blogs?limit=${pageLimit}&page=${currentPage}&authorId=${authorId}`
        );
        setBlogs(response.data.blogs);
      } catch (err) {
        setError("Failed to fetch blogs. Please try again later.");
      }
    };

    fetchBlogs();
  }, [authorId]);

  const handleEdit = (blogId,blogData) => {
    navigate(`/updateBlog/${blogId}`,{state:blogData});
  };

  const handleDelete = async (blogId) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}/api/deleteBlog/${blogId}`
      );
      setSuccess("Blog deleted successfully.");
      setBlogs(blogs.filter((blog) => blog._id !== blogId));
    } catch (err) {
      setError("Failed to delete blog. Please try again.");
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        My Blogs
      </Typography>
      {error && (
        <Snackbar
          open={!!error}
          autoHideDuration={6000}
          onClose={() => setError("")}
        >
          <Alert onClose={() => setError("")} severity="error">
            {error}
          </Alert>
        </Snackbar>
      )}
      {success && (
        <Snackbar
          open={!!success}
          autoHideDuration={6000}
          onClose={() => setSuccess("")}
        >
          <Alert onClose={() => setSuccess("")} severity="success">
            {success}
          </Alert>
        </Snackbar>
      )}
      {blogs.length > 0 ? (
        blogs.map((blog) => (
          <Card key={blog._id} sx={{ marginBottom: 2 }}>
            <CardContent>
              <Typography variant="h6">{blog.title}</Typography>
              <Typography variant="body2">{blog.bio}</Typography>
              <Stack direction="row" spacing={2} sx={{ marginTop: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleEdit(blog._id, blog)}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleDelete(blog._id)}
                >
                  Delete
                </Button>
              </Stack>
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography variant="body1">No blogs available.</Typography>
      )}
    </Box>
  );
};

export default MyBlog;
