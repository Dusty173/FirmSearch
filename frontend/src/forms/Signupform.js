import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./form.css";
import Alert from "../common/Alert";

function SignupForm({ signup }) {
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    firstname: "",
    lastname: "",
    is_admin: false,
  });

  async function handleSubmit(evt) {
    evt.preventDefault();

    try {
      setIsLoading(true);
      let result = await signup(formData);
      if (result.success) {
        navigate("/");
      }
      if (!result.success) {
        setFormErrors(result.err);
      }
    } catch (err) {
      setFormErrors(err);
    } finally {
      setIsLoading(false);
    }
  }

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((data) => ({ ...data, [name]: value }));
  }

  return (
    <>
      <div className="signup-page">
        <h2 className="sign-up-title">Sign Up!</h2>
        <div className="signupform">
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <label htmlFor="firstname">firstname</label>
            <input
              id="firstname"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
            />
            <label htmlFor="lastname">lastname</label>
            <input
              id="lastname"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
            />
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {formErrors.length ? (
              <Alert type="danger" messages={formErrors} />
            ) : null}

            <button
              className="signupbtn"
              disabled={isLoading}
              onClick={handleSubmit}
            >
              {isLoading ? "Signing up..." : "Sign Up!"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignupForm;
