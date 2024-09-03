import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
  Snackbar,
  Link as MuiLink,
  Box,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.png"; 

const Register = ({ history }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3001/api/auth/register",
        formData
      );
      setSuccessMessage("Registration successful!");
      setOpenSnackbar(true);
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        gender: "",
      });

      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);
      setError("Registration failed. Please try again.");
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth="xs" style={{ marginTop: "4rem" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Register to{" "}
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
              label="Name"
              name="name"
              variant="outlined"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Grid>
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
            <TextField
              fullWidth
              type="password"
              label="Confirm Password"
              name="confirmPassword"
              variant="outlined"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </Grid>
          
          <Grid item xs={12}>
            <Button type="submit" fullWidth variant="contained" color="primary">
              Register
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" align="center">
              Already have an account?{" "}
              <MuiLink component={Link} to="/login" underline="always">
                Login here
              </MuiLink>
            </Typography>
          </Grid>
        </Grid>
        {error && (
          <Typography
            variant="body2"
            color="error"
            align="center"
            style={{ marginTop: 8 }}
          >
            {error}
          </Typography>
        )}
      </form>
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
          severity="success"
        >
          {successMessage}
        </MuiAlert>
      </Snackbar>
    </Container>
  );
};

export default Register;
