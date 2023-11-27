import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Navbar as BootstrapNavbar, Nav, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = ({ isLoggedIn }) => {
  const history = useHistory();

  const handleLogout = () => {
    try {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("user_name");
      localStorage.removeItem("user_id");

      // Redirect to the login page
      history.push("/login");
    } catch (error) {
      console.error("Error occurred when logging out", error);
    }
  };

  return (
    <BootstrapNavbar bg="light" expand="lg">
      <BootstrapNavbar.Brand as={Link} to="/">
        Home
      </BootstrapNavbar.Brand>
      <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
      <BootstrapNavbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {!isLoggedIn ? (
            <>
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
              <Nav.Link as={Link} to="/register">
                Register
              </Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link as={Link} to="/dashboard">
                Dashboard
              </Nav.Link>
              <Nav.Link as={Link} to="/friends">
                Friends
              </Nav.Link>
              <Button variant="outline-danger" onClick={handleLogout}>
                Logout
              </Button>
            </>
          )}
        </Nav>
      </BootstrapNavbar.Collapse>
    </BootstrapNavbar>
  );
};

export default Navbar;
