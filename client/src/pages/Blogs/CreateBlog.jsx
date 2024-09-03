import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Snackbar,
  Alert,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const categories = [
  "Technology",
  "Lifestyle",
  "Education",
  "Health",
  "Other"
];

const CreateBlog = () => {
  const navigate = useNavigate();
  const [blogData, setBlogData] = useState({
    title: "",
    content: "",
    author: "",
    authorId: "",
    tags: "",
    category: "Other",
    bio: "",
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");


  useEffect(() => {
    const fetchAuthorName = () => {
      const user = localStorage.getItem("user");
      if (!user) {
        navigate("/login");
      } else {
        try {
          const parsedUser = JSON.parse(user); 
          const authorName = parsedUser.name; 
          const authorId = parsedUser.id; 
          if (authorName) {
            setBlogData((prevData) => ({
              ...prevData,
              author: authorName,
              authorId: authorId,
            }));
          } else {
            navigate("/login"); 
          }
        } catch (error) {
          console.error("Failed to parse user from local storage", error);
          navigate("/login"); 
        }
      }
    };

    fetchAuthorName();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlogData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCategoryChange = (e) => {
    setBlogData((prevData) => ({
      ...prevData,
      category: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!blogData.title || !blogData.content || !blogData.author) {
      setError("Title, content, and author are required");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/addBlog`,
        blogData
      );

      if (response.status === 201) {
        setSuccess(true);
        setBlogData({
          title: "",
          content: "",
          author: blogData.author,
          tags: "",
          category: "Other",
          bio: "",
        });
        navigate(`/myBlog/${blogData.authorId}`);
      }
    } catch (error) {
      setError("Error adding blog");
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "#f5f5f5",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 4,
      }}
    >
      <Box
        sx={{
          backgroundColor: "#fff",
          borderRadius: 4,
          padding: 4,
          boxShadow: 2,
          maxWidth: "md",
          width: "100%",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Create New Blog
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Title"
            name="title"
            variant="outlined"
            fullWidth
            margin="normal"
            value={blogData.title}
            onChange={handleChange}
            required
          />
          <TextField
            label="Bio"
            name="bio"
            variant="outlined"
            fullWidth
            margin="normal"
            placeholder="A short bio for your blog."
            value={blogData.bio}
            onChange={handleChange}
            required
          />
          <TextField
            label="Content"
            name="content"
            variant="outlined"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            value={blogData.content}
            onChange={handleChange}
            required
          />
          <TextField
            label="Tags (comma separated)"
            name="tags"
            variant="outlined"
            fullWidth
            margin="normal"
            value={blogData.tags}
            onChange={handleChange}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Category</InputLabel>
            <Select
              name="category"
              value={blogData.category}
              onChange={handleCategoryChange}
              label="Category"
              variant="outlined"
            >
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Submit
          </Button>
        </form>
        {success && (
          <Snackbar
            open={success}
            autoHideDuration={6000}
            onClose={() => setSuccess(false)}
          >
            <Alert onClose={() => setSuccess(false)} severity="success">
              Blog created successfully!
            </Alert>
          </Snackbar>
        )}
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
      </Box>
    </Box>
  );
};

export default CreateBlog;
