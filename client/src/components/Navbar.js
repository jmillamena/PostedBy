//styling
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./App";
import { Navbar as BootstrapNavbar, Nav } from "react-bootstrap";
import "./styling.css";

const Navbar = () => {
  const { isLoggedIn } = useAuth();

  return (
    <BootstrapNavbar variant="light" style={{ backgroundColor: "#f4a460" }}>
      <BootstrapNavbar.Brand as={Link} to="/" style={{ paddingLeft: "25px" }}>
        🔍
      </BootstrapNavbar.Brand>
      <Nav className="mr-auto">
        {isLoggedIn ? (
          <>
            {/* <Nav.Link as={Link} to="/">
              🔍 Search
            </Nav.Link> */}

            <Nav.Link as={Link} to="/dashboard">
              Dashboard
            </Nav.Link>
            <Nav.Link as={Link} to="/friends">
              Friends
            </Nav.Link>
            <Nav.Link as={Link} to="/create-post">
              Create Post
            </Nav.Link>
            <Nav.Link as={Link} to="/your-posts">
              PostedOn
            </Nav.Link>
            <Nav.Link as={Link} to="/logout">
              Logout
            </Nav.Link>
          </>
        ) : (
          <>
            <Nav.Link as={Link} to="/login">
              Login
            </Nav.Link>
            <Nav.Link as={Link} to="/register">
              Register
            </Nav.Link>
          </>
        )}
      </Nav>
    </BootstrapNavbar>
  );
};

export default Navbar;
