import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "./Login.css";

export default function Login() {
  const { login, signup } = useAuth();
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (isSignup) {
      if (!name.trim()) {
        setError("Please enter your name");
        return;
      }
      if (signup(email, password, name.trim())) {
        navigate("/marketplace");
      } else {
        setError("An account with this email already exists. Try logging in.");
      }
    } else {
      if (login(email, password)) {
        navigate("/marketplace");
      } else {
        setError("Invalid email or password. Try again or create an account.");
      }
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <span className="login-icon">◈</span>
          <h1>{isSignup ? "Create Account" : "Welcome Back"}</h1>
          <p className="login-subtitle">
            {isSignup
              ? "Join the DoomSwap community"
              : "Sign in to browse and claim bundles"}
          </p>
        </div>

        {error && <div className="login-error">{error}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          {isSignup && (
            <div className="form-field">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}
          <div className="form-field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn-primary btn-full">
            {isSignup ? "Create Account" : "Sign In"}
          </button>
        </form>

        <p className="login-toggle">
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            onClick={() => {
              setIsSignup(!isSignup);
              setError("");
            }}
            className="btn-link"
          >
            {isSignup ? "Sign In" : "Create One"}
          </button>
        </p>
      </div>
    </div>
  );
}