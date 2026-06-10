import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { listings, categories, locations } from "../data/seed";
import ListingCard from "../components/ListingCard";
import "./Marketplace.css";

export default function Marketplace() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeLocation, setActiveLocation] = useState<string | null>(null);

  const filtered = listings.filter((l) => {
    if (search && !l.title.toLowerCase().includes(search.toLowerCase())) return false;
    if (activeCategory && l.category !== activeCategory) return false;
    if (activeLocation && !l.location.toLowerCase().includes(activeLocation.toLowerCase())) return false;
    return true;
  });

  const handleDopamineRoll = () => {
    const pool = [...listings]; // always roll from all listings
    const pick = pool[Math.floor(Math.random() * pool.length)];
    navigate(`/listing/${pick.id}`);
  };

  return (
    <div className="marketplace-page">
      <div className="marketplace-inner">
        {/* Dopamine Roll */}
        <button className="dopamine-roll" onClick={handleDopamineRoll}>
          <span className="dopamine-icon">🎲</span>
          <div className="dopamine-text">
            <strong>Can't make up your mind?</strong>
            <span>Roll for a surprise hobby phase!</span>
          </div>
          <span className="dopamine-arrow">→</span>
        </button>

        {/* Search */}
        <div className="search-bar">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search hobby bundles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Categories */}
        <div className="filter-row">
          <div className="category-filters">
            <button
              className={`filter-pill ${activeCategory === null ? "active" : ""}`}
              onClick={() => setActiveCategory(null)}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                className={`filter-pill ${activeCategory === cat ? "active" : ""}`}
                onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="location-filters">
            {locations.map((loc) => (
              <button
                key={loc}
                className={`filter-chip ${activeLocation === loc ? "active" : ""}`}
                onClick={() => setActiveLocation(activeLocation === loc ? null : loc)}
              >
                {loc}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <p className="results-count">
          {filtered.length} bundle{filtered.length !== 1 ? "s" : ""} found
        </p>

        {/* Listing Grid */}
        <div className="listing-grid">
          {filtered.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="empty-state">
            <p>No bundles match your filters. Try a different search!</p>
          </div>
        )}
      </div>
    </div>
  );
}