import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import UserContext from "../Usercontext";
import "./Nav.css";

function Navigation({ logout }) {
  const { currUser } = useContext(UserContext);

  function loggedInNav() {
    return (
      <ul className="navbar-list">
        <li>
          <NavLink className="nav-link" to="/aboutus">
            About
          </NavLink>
        </li>
        <li>
          <Link className="nav-link-logout" to="/" onClick={logout}>
            Logout {currUser.username}
          </Link>
        </li>
      </ul>
    );
  }

  function loggedOutNav() {
    return (
      <ul className="navbar-list">
        <li>
          <NavLink className="nav-link" to="/login">
            Login
          </NavLink>
        </li>
        <li>
          <NavLink className="nav-link" to="/signup">
            Sign Up
          </NavLink>
        </li>
        <li>
          <NavLink className="nav-link" to="/aboutus">
            About
          </NavLink>
        </li>
      </ul>
    );
  }

  return (
    <nav className="Navbar">
      <Link className="logo-link" to="/">
        <h2>Firm Search</h2>
      </Link>
      {currUser ? loggedInNav() : loggedOutNav()}
    </nav>
  );
}

export default Navigation;
