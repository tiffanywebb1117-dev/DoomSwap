import { Link } from "react-router-dom";
import type { Listing } from "../data/seed";
import "./ListingCard.css";

export default function ListingCard({ listing }: { listing: Listing }) {
  return (
    <Link to={`/listing/${listing.id}`} className="listing-card">
      <div className="card-image">
        <img src={listing.image} alt={listing.title} loading="lazy" />
      </div>
      <div className="card-body">
        <h3 className="card-title">{listing.title}</h3>
        <div className="card-price">${listing.price}</div>
        <div className="card-tags">
          <span className="tag tag-location">{listing.location}</span>
          <span className="tag tag-condition">{listing.condition}</span>
        </div>
      </div>
    </Link>
  );
}