import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, Button, IconButton } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";


const Navbar = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  useEffect(() => {
    const fetchAuthorName = () => {
      const userObj = localStorage.getItem("user");
      if (!userObj) {
        navigate("/login"); 
      } else {
        try {
          const parsedUser = JSON.parse(userObj); 
          if (parsedUser) {
            setUserData(parsedUser)
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
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          component={Link}
          to="/"
          sx={{ mr: 2 }}
        ></IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1,  textDecoration:'none', color:'white'}} component={Link} to="/">
          WriteSphere
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        <Button color="inherit" component={Link} to={`/myBlog/${userData.id}`}>
          My Blogs
        </Button>
        <Button color="inherit" component={Link} to="/createBlog">
          Add a Blog
        </Button>
        {userData ? (
          <>
            <Button color="inherit" onClick={onLogout}>
              Logout
            </Button>
          </>
        ) : (
          <Button color="inherit" component={Link} to="/login">
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
