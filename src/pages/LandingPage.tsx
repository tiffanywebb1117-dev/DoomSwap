import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

interface LayerCfg {
  src: string;
  speed: number;   // fraction of scrolled px to translate (parallax depth)
  opacity: number;
  blendMode: string;
}

// 6 photographic layers — depth-sorted: slowest = deepest background
const LAYERS: LayerCfg[] = [
  { src: "/1.png", speed: 0.08, opacity: 0.55, blendMode: "luminosity"  },
  { src: "/2.png", speed: 0.16, opacity: 0.50, blendMode: "overlay"     },
  { src: "/3.png", speed: 0.26, opacity: 0.45, blendMode: "soft-light"  },
  { src: "/4.png", speed: 0.38, opacity: 0.40, blendMode: "overlay"     },
  { src: "/5.png", speed: 0.50, opacity: 0.38, blendMode: "luminosity"  },
  { src: "/6.png", speed: 0.64, opacity: 0.32, blendMode: "soft-light"  },
];

const CATEGORIES = [
  { name: "The Culinary Lab",  sub: "Cooking & Baking",            slug: "culinary", image: "/Untitled (54).png" },
  { name: "Pigment & Canvas",  sub: "Painting, Arts & Crafts",     slug: "pigment",  image: "/Untitled (57).png" },
  { name: "Mud & Glass",       sub: "Pottery, Ceramics & Glass",   slug: "mud",      image: "/Untitled (55).png" },
  { name: "Yarn & Fiber Arts", sub: "Knitting, Crochet & Tufting", slug: "yarn",     image: "/Untitled (58).png" },
  { name: "Sparks & Wires",    sub: "Tech & Electronics",          slug: "sparks",   image: "/Untitled (59).png" },
  { name: "Sawdust & Grain",   sub: "Woodworking & Carving",       slug: "sawdust",  image: "/Untitled (60).png" },
];

export default function LandingPage() {
  const outerRef    = useRef<HTMLDivElement>(null);
  const layerRefs   = useRef<(HTMLImageElement | null)[]>([]);

  useEffect(() => {
    const update = () => {
      if (!outerRef.current) return;
      const rect        = outerRef.current.getBoundingClientRect();
      const scrolled    = Math.max(0, -rect.top);

      LAYERS.forEach((cfg, i) => {
        const el = layerRefs.current[i];
        if (!el) return;
        // Each layer drifts upward at its own speed — faster layers appear closer
        el.style.transform = `translateX(-50%) translateY(calc(-50% + ${-scrolled * cfg.speed}px))`;
      });
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div className="landing-root">

      {/* ── Parallax Hero ── */}
      <div ref={outerRef} className="parallax-outer">
        <div className="parallax-sticky">

          {/* Photographic depth layers */}
          {LAYERS.map((cfg, i) => (
            <img
              key={i}
              src={cfg.src}
              alt=""
              ref={(el) => { layerRefs.current[i] = el; }}
              className="parallax-layer"
              style={{
                opacity:   cfg.opacity,
                mixBlendMode: cfg.blendMode as React.CSSProperties["mixBlendMode"],
              }}
            />
          ))}

          {/* Teal radial spotlight — sits above the image layers */}
          <div className="parallax-spotlight" />

          {/* Halftone grit overlay */}
          <div className="parallax-halftone" />

          {/* Hero copy — always visible, centered above everything */}
          <div className="parallax-copy">
            <h1>
              Dump the projects you abandoned or swap them for your next
              obsession (you'll probably abandon that too).
            </h1>
            <p>Swap the doom piles. Start fresh.</p>
            <a href="#categories" className="parallax-cta">
              Browse Categories ↓
            </a>
          </div>

        </div>
      </div>

      {/* ── Category Grid ── */}
      <section id="categories" className="categories-section">
        <div className="categories-grid">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              to={`/marketplace?category=${cat.slug}`}
              className="category-card"
            >
              <img src={cat.image} alt={cat.name} className="category-img" />
              <div className="category-overlay">
                <span className="category-sub">{cat.sub}</span>
                <h2 className="category-name">{cat.name}</h2>
              </div>
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
}
