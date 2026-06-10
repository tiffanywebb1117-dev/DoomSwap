import { useParams, Link } from "react-router-dom";
import { listings } from "../data/seed";
import "./ListingDetail.css";

export default function ListingDetail() {
  const { id } = useParams<{ id: string }>();
  const listing = listings.find((l) => l.id === id);

  if (!listing) {
    return (
      <div className="detail-page">
        <div className="detail-inner">
          <div className="empty-state">
            <p>Bundle not found.</p>
            <Link to="/marketplace" className="btn-secondary">
              ← Back to Marketplace
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="detail-page">
      <div className="detail-inner">
        <Link to="/marketplace" className="back-link">
          ← Back to Marketplace
        </Link>

        <div className="detail-layout">
          {/* Left: Image */}
          <div className="detail-image-section">
            <div className="detail-image-container">
              <img src={listing.image} alt={listing.title} />
            </div>
          </div>

          {/* Right: Details */}
          <div className="detail-info-section">
            <div className="detail-tags">
              <span className="tag tag-location">{listing.location}</span>
              <span className="tag tag-condition">{listing.condition}</span>
              <span className="tag tag-category">{listing.category}</span>
            </div>

            <h1 className="detail-title">{listing.title}</h1>
            <div className="detail-price">${listing.price}</div>

            <div className="detail-description">
              <p className="detail-desc-label">What's included:</p>
              <ul>
                {listing.description.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

            {/* Seller Card */}
            <div className="seller-card">
              <div className="seller-avatar">
                {listing.sellerName.charAt(0)}
              </div>
              <div className="seller-info">
                <strong>{listing.sellerName}</strong>
                <span>{listing.sellerLocation}</span>
                <span className="seller-joined">Member since {listing.sellerJoined}</span>
              </div>
            </div>

            <button className="btn-primary btn-claim">
              Claim This Bundle
            </button>
            <p className="claim-note">
              You'll be connected with the seller to arrange pickup.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}