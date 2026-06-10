import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="profile-avatar-large">
          {user.name.charAt(0)}
        </div>
        <h1 className="profile-name">{user.name}</h1>
        <p className="profile-email">{user.email}</p>
        <div className="profile-detail-row">
          <span className="profile-label">Hometown</span>
          <span className="profile-value">{user.hometown}</span>
        </div>
        <div className="profile-detail-row">
          <span className="profile-label">Member since</span>
          <span className="profile-value">October 2024</span>
        </div>
        <button onClick={logout} className="btn-secondary btn-logout">
          Log Out
        </button>
      </div>
    </div>
  );
}