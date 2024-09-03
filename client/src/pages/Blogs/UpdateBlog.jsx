import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Box,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import axios from "axios";

const UpdateBlog = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [blogData, setBlogData] = useState({
    title: "",
    content: "",
    bio:"",
    tags: [],
    category: "Other",
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  
  useEffect(() => {
    if (location.state) {
      setBlogData(location.state);
    } else {
      navigate("/"); 
    }
  }, [location.state, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/api/updateBlog/${blogData._id}`,
        blogData
      );

      if (response.status === 200) {
        setSuccess(true);
        setSuccess("Blog updated successfully.");
       
        navigate(`/myBlog/${blogData.authorId}`);
      }
    } catch (error) {
      setError("Error updating blog");
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
          Update Blog
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            margin="normal"
            value={blogData.title}
            onChange={(e) =>
              setBlogData({ ...blogData, title: e.target.value })
            }
            required
          />
          <TextField
            label="Bio"
            variant="outlined"
            fullWidth
            margin="normal"
            value={blogData.bio}
            onChange={(e) =>
              setBlogData({ ...blogData, bio: e.target.value })
            }
            required
          />
          <TextField
            label="Content"
            variant="outlined"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            value={blogData.content}
            onChange={(e) =>
              setBlogData({ ...blogData, content: e.target.value })
            }
            required
          />
          <TextField
            label="Tags (comma separated)"
            variant="outlined"
            fullWidth
            margin="normal"
            value={blogData.tags}
            onChange={(e) =>
              setBlogData({ ...blogData, tags: e.target.value.split(",") })
            }
          />
          <TextField
            label="Category"
            variant="outlined"
            fullWidth
            margin="normal"
            value={blogData.category}
            onChange={(e) =>
              setBlogData({ ...blogData, category: e.target.value })
            }
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Update
          </Button>
        </form>
        {success && (
          <Snackbar
            open={success}
            autoHideDuration={6000}
            onClose={() => setSuccess(false)}
          >
            <Alert onClose={() => setSuccess(false)} severity="success">
              Blog updated successfully!
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

export default UpdateBlog;
