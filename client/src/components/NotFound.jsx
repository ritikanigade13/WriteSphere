import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        backgroundColor: "#f5f5f5",
        padding: 4,
      }}
    >
      <Box
        sx={{
          backgroundColor: "#fff",
          borderRadius: 4,
          padding: 4,
          boxShadow: 2,
          maxWidth: "sm",
          width: "100%",
        }}
      >
        <Typography variant="h4" gutterBottom>
          404 - Page Not Found
        </Typography>
        <Typography variant="body1" paragraph>
          Sorry, the page you are looking for does not exist.
        </Typography>
        <Button component={Link} to="/" variant="contained" color="primary">
          Go to Home
        </Button>
      </Box>
    </Box>
  );
};

export default NotFound;
