import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import UserContext from "../Usercontext";
import "./Nav.css";

function Navigation({ logout }) {
  const { currUser } = useContext(UserContext);

  function loggedInNav() {
    return (
      <ul className="navbar-list">
        <li className="nav-li">
          <NavLink className="nav-link" to="/aboutus">
            About
          </NavLink>
        </li>
        <li className="nav-li">
          <NavLink
            className="nav-link"
            to={`/${currUser.username}/saved-firms`}
          >
            My Firms
          </NavLink>
        </li>
        <li className="nav-li">
          <Link className="nav-link-logout" to="/" onClick={logout}>
            Logout
          </Link>
        </li>
        <li className="nav-li">
          <NavLink className="nav-link" to="/explain-adv">
            ADV Info
          </NavLink>
        </li>
        <li className="nav-li">
          <NavLink className="nav-link" to="/reviews">
            Reviews
          </NavLink>
        </li>
        <li className="nav-li">
          <NavLink className="nav-link" to="/resources">
            Resources
          </NavLink>
        </li>
      </ul>
    );
  }

  function loggedOutNav() {
    return (
      <ul className="navbar-list">
        <li className="nav-li">
          <NavLink className="nav-link" to="/login">
            Login
          </NavLink>
        </li>
        <li className="nav-li">
          <NavLink className="nav-link" to="/signup">
            Sign Up
          </NavLink>
        </li>
        <li className="nav-li">
          <NavLink className="nav-link" to="/aboutus">
            About
          </NavLink>
        </li>
        <li className="nav-li">
          <NavLink className="nav-link" to="/explain-adv">
            ADV Info
          </NavLink>
        </li>
        <li className="nav-li">
          <NavLink className="nav-link" to="/reviews">
            Reviews
          </NavLink>
        </li>
        <li className="nav-li">
          <NavLink className="nav-link" to="/resources">
            Resources
          </NavLink>
        </li>
      </ul>
    );
  }

  return (
    <nav className="Navbar">
      <Link className="logo-link" to="/">
        <img
          src="logo.PNG"
          width={70}
          height={70}
          alt="Image of a Magnifying Glass over a Briefcase"
        ></img>{" "}
        <h1 className="title">Advisory Evaluator</h1>
      </Link>
      {currUser ? loggedInNav() : loggedOutNav()}
    </nav>
  );
}

export default Navigation;
