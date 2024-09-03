import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  CircularProgress,
  Snackbar,
  Link as MuiLink,
  Box,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.png";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3001/api/auth/login",
        formData
      );
      setLoading(false);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("token", response.data.token);
      navigate("/");
    } catch (error) {
      setLoading(false);
      console.error("Login error:", error);
      setError("Login failed. Please check your credentials.");
      setOpenSnackbar(true);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <Container maxWidth="xs">
        <Typography variant="h4" align="center" gutterBottom>
          Login to{" "}
          <img
            src={Logo}
            alt="Logo"
            style={{
              height: "2em",
              verticalAlign: "middle",
              marginLeft: "0.3em",
            }}
          />
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="email"
                label="Email"
                name="email"
                variant="outlined"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="password"
                label="Password"
                name="password"
                variant="outlined"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" align="center">
                  Don't have an account?{" "}
                  <MuiLink component={Link} to="/register" underline="always">
                    Register here
                  </MuiLink>
                </Typography>
              </Box>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : "Login"}
              </Button>
            </Grid>
          </Grid>
          <Snackbar
            open={openSnackbar}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <MuiAlert
              elevation={6}
              variant="filled"
              onClose={handleCloseSnackbar}
              severity="error"
            >
              {error}
            </MuiAlert>
          </Snackbar>
        </form>
      </Container>
    </Box>
  );
};

export default Login;
