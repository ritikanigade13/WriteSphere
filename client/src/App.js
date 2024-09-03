import React, { useState } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import theme from "./theme";
import Blog from "./pages/exploreBlogs/Blog";
import Layout from "./components/layout/Layout";
import CreateBlog from "./pages/Blogs/CreateBlog";
import UpdateBlog from "./pages/Blogs/UpdateBlog";
import ReadBlog from "./pages/Blogs/ReadBlog";
import MyBlog from "./pages/Blogs/MyBlog";
import NotFound from "./components/NotFound";

function NavigationHandler({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout Component={Home} user={user} onLogout={handleLogout} />
        }
      />
      <Route path="/login" element={<Login onLogin={setUser} />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/exploreBlogs"
        element={
          <Layout Component={Blog} user={user} onLogout={handleLogout} />
        }
      />
      <Route
        path="/createBlog"
        element={
          <Layout Component={CreateBlog} user={user} onLogout={handleLogout} />
        }
      />
      <Route
        path="/readBlog/:blogId"
        element={
          <Layout Component={ReadBlog} user={user} onLogout={handleLogout} />
        }
      />
      <Route
        path="/myBlog/:authorId"
        element={
          <Layout Component={MyBlog} user={user} onLogout={handleLogout} />
        }
      />
      <Route
        path="/updateBlog/:blogId"
        element={
          <Layout Component={UpdateBlog} user={user} onLogout={handleLogout} />
        }
      />
      <Route
        path="*"
        element={<NotFound />} 
      />
 
    </Routes>
  );
}

function App() {
  const [user, setUser] = useState(null);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <NavigationHandler user={user} setUser={setUser} />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
