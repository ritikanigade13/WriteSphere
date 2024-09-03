import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
} from "@mui/material";
import axios from "axios";
import Pagination from "../../components/Pagination"; 
import { Link } from "react-router-dom";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(1);
  const pageLimit = 3;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/blogs?limit=${pageLimit}&page=${currentPage}`
        );
        setBlogs(response.data.blogs);
        setNumberOfPages(response.data.numberOfPages);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchBlogs();
  }, [currentPage]);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < numberOfPages) setCurrentPage(currentPage + 1);
  };

  const handlePageNumberClick = (page) => {
    setCurrentPage(page);
  };

  return (
    <Container sx={{ paddingY: 4 }}>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ marginBottom: 4 }}
      >
        All Blogs
      </Typography>
      <Grid container spacing={4}>
        {blogs.map((blog) => (
          <Grid item xs={12} sm={6} md={4} key={blog._id}>
            <Card
              sx={{ height: "100%", display: "flex", flexDirection: "column" }}
            >
              <CardContent sx={{ flex: "1 0 auto" }}>
                <Typography variant="h5" component="h2" gutterBottom>
                  {blog.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {blog.content.length > 100
                    ? `${blog.content.substring(0, 100)}...`
                    : blog.content}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  component={Link}
                  to={`/readBlog/${blog._id}`}
                >
                  Read More
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
        <Pagination
          currentPage={currentPage}
          numberOfPages={numberOfPages}
          handlePrevPage={handlePrevPage}
          handleNextPage={handleNextPage}
          handlePageNumberClick={handlePageNumberClick}
        />
      </Box>
    </Container>
  );
};

export default Blog;
