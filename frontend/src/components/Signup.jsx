import React, { useState } from "react";
import { loginApi, signupApi } from "../api/userApi";
import { useAuth } from "../context/AuthContext";

const Signup = ({ closeModal, setIsSignup, isSignup }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { setUser,login } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      const res = await (isSignup ? signupApi(formData) : loginApi(formData));
      console.log(res);
      alert(res.message || "Signup successful");
      setSuccess(res.message || "Signup successful");
      setFormData({ username: "", email: "", password: "" });
      if (res.data.token) {
        localStorage.setItem("Token", res.data.token);
        login()
        setUser(res.data.user);
      }

      closeModal();
    } catch (error) {
      const errorMsg = error?.message || "Something went wrong";
      alert(errorMsg);
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-content">
      <form onSubmit={handleSubmit}>
        {isSignup && (
          <div className="form-control">
            <input
              type="text"
              onChange={handleChange}
              name="username"
              value={formData.username}
              required
              placeholder="Username"
            />
          </div>
        )}
        <div className="form-control">
          <input
            type="text"
            onChange={handleChange}
            name="email"
            value={formData.email}
            required
            placeholder="Email"
          />
        </div>
        <div className="form-control">
          <input
            type="password"
            onChange={handleChange}
            name="password"
            value={formData.password}
            required
            placeholder="Password"
          />
        </div>
        <button type="submit" className="btn">
          {isSignup ? "Register" : "Login"}
        </button>
        <p className="signup-text">
          {isSignup ? "Don't have an account?" : "Already have an account"}{" "}
          <span
            className="signup-switch"
            onClick={() => setIsSignup(!isSignup)}
          >
            {isSignup ? "Login" : "Register"}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Signup;
