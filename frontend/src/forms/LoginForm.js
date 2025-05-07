import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./form.css";
import Alert from "../common/Alert";
import LoadIcon from "../common/LoadIcon";

function LoginForm({ login }) {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    try {
      let result = await login(formData);
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

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
  }

  // console.debug("LoginForm", "login=", typeof login, "formData=", formData);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="username-container">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            required
          />
        </div>
        <div className="password-container">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
        </div>

        {formErrors.length ? (
          <Alert type="danger" messages={formErrors} />
        ) : null}

        <button
          className="loginbtn"
          disabled={isLoading}
          onClick={handleSubmit}
        >
          {isLoading ? "Attempting to Login..." : "Log In"}
        </button>
      </form>
    </>
  );
}

export default LoginForm;
