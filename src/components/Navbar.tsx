import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "./Navbar.css";

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">◈</span>
          <span className="logo-text">DoomSwap</span>
        </Link>

        <div className="navbar-links">
          <Link
            to="/marketplace"
            className={`nav-link ${location.pathname === "/marketplace" ? "active" : ""}`}
          >
            Browse Marketplace
          </Link>
          <Link
            to="/events"
            className={`nav-link ${location.pathname === "/events" ? "active" : ""}`}
          >
            Upcoming Events
          </Link>
        </div>

        <div className="navbar-actions">
          <Link to="/marketplace" className="btn-primary">
            + List a Bundle
          </Link>
          {user ? (
            <div className="user-menu">
              <Link to="/profile" className="user-avatar">
                {user.name.charAt(0)}
              </Link>
              <button onClick={logout} className="btn-text">
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="btn-secondary">
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}