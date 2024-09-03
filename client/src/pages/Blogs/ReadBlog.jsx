import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Divider,
  Button,
} from "@mui/material";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const ReadBlog = () => {
  const { blogId } = useParams();
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
    
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/blogs?limit=1&page=1&blogId=${blogId}`
        );
        setBlog(response.data.blogs[0]);
      } catch (err) {
        setError("Failed to fetch blogs. Please try again later.");
      }
    };

    fetchBlogs();
  }, [blogId]);

  const handleBack = () => {
    navigate(-1); 
  };

  return (
    <Container sx={{ paddingY: 4 }}>
      {blog ? (
        <Card sx={{ maxWidth: "md", margin: "auto", padding: 2 }}>
          <CardContent>
            <Typography variant="h4" component="h1" gutterBottom>
              {blog.title}
            </Typography>
            <Divider sx={{ marginY: 2 }} />
            <Typography variant="body1" color="text.secondary" gutterBottom>
              <strong>Author:</strong> {blog.author}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Date:</strong>{" "}
              {new Date(blog.createdAt).toLocaleDateString()}
            </Typography>
            <Divider sx={{ marginY: 2 }} />
            <Typography variant="body1" paragraph>
              {blog.content}
            </Typography>
            <Box
              sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}
            >
              <Button variant="contained" color="primary" onClick={handleBack}>
                Back to Blogs
              </Button>
            </Box>
          </CardContent>
        </Card>
      ) : (
        <Typography variant="h6" align="center">
          Loading...
        </Typography>
      )}
    </Container>
  );
};

export default ReadBlog;
