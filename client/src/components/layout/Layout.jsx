import React from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";

function Layout({ Component, user, onLogout }) {
  return (
    <>
      <Navbar user={user} onLogout={onLogout} />
      <Component />
      <Footer />
    </>
  );
}

export default Layout;
