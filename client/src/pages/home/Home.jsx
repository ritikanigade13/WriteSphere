import React from "react";
import { Typography, Button, Box, Grid, Container } from "@mui/material";
import { Link } from "react-router-dom";
import ExploreIcon from "@mui/icons-material/Explore";
import CreateIcon from "@mui/icons-material/Create";
import logo from "../../assets/logo.png";

const Home = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#f5f5f5", 
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        padding: 4,
        textAlign: "center",
        backgroundImage:
          "url('https://source.unsplash.com/1600x900/?nature,landscape')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "#333", 
      }}
    >
      <Container maxWidth="md">
        <img
          src={logo}
          alt="Logo"
          style={{ width: "150px", marginBottom: "20px" }} 
        />
        <Typography
          variant="h2"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#333" }}
        >
          Welcome to Your Ultimate Blogging Platform!
        </Typography>

        <Typography
          variant="h5"
          gutterBottom
          sx={{ marginBottom: "30px", color: "#555" }}
        >
          Discover, Create, and Connect. Our platform is your go-to destination
          for exploring a wide range of topics and sharing your unique insights
          with the world.
        </Typography>

        <Grid container spacing={3} justifyContent="center">
          <Grid item>
            <Button
              component={Link}
              to="/exploreBlogs"
              variant="contained"
              color="primary"
              size="large"
              startIcon={<ExploreIcon />}
              sx={{
                borderRadius: 20,
                padding: "12px 24px",
                textTransform: "none",
                boxShadow: 3,
                "&:hover": {
                  boxShadow: 6,
                },
              }}
            >
              Explore Blogs
            </Button>
          </Grid>
          <Grid item>
            <Button
              component={Link}
              to="/createBlog"
              variant="outlined"
              color="secondary"
              size="large"
              startIcon={<CreateIcon />}
              sx={{
                borderRadius: 20,
                padding: "12px 24px",
                borderColor: "#333",
                color: "#333",
                textTransform: "none",
                boxShadow: 3,
                "&:hover": {
                  backgroundColor: "#f5f5f5",
                  color: "#333",
                },
              }}
            >
              Create Blog
            </Button>
          </Grid>
        </Grid>

        <Box sx={{ marginTop: 4, color: "#555" }}>
          <Typography
            variant="body1"
            paragraph
            sx={{ fontSize: "1.1rem", maxWidth: "700px", margin: "0 auto" }}
          >
            Join our growing community of readers and writers. Engage in
            meaningful discussions, share your thoughts, and connect with others
            who share your interests. Your voice matters!
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
