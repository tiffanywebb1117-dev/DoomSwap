import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

interface LayerCfg {
  src: string;
  initX: number;  // initial offset from center (px)
  initY: number;
  rot: number;    // initial rotation (deg)
  dirX: number;   // outward direction multiplier
  dirY: number;
  speed: number;  // scroll velocity multiplier
}

// Each layer starts clustered in the center, occluding the text.
// On scroll they fly outward in their own direction at staggered speeds.
const LAYERS: LayerCfg[] = [
  { src: "/1.png", initX: -130, initY: -80,  rot: -8,  dirX: -1.1, dirY: -0.9, speed: 0.8  },
  { src: "/2.png", initX:  105, initY: -65,  rot:  7,  dirX:  1.2, dirY: -1.3, speed: 1.0  },
  { src: "/3.png", initX:  -60, initY:  72,  rot: -5,  dirX: -0.9, dirY:  1.2, speed: 1.1  },
  { src: "/4.png", initX:   92, initY:  88,  rot: 12,  dirX:  1.4, dirY:  1.4, speed: 1.3  },
  { src: "/5.png", initX: -115, initY:  48,  rot: -8,  dirX: -1.6, dirY:  1.0, speed: 1.5  },
  { src: "/6.png", initX:   48, initY: -108, rot:  5,  dirX:  1.1, dirY: -1.9, speed: 1.8  },
];

const CATEGORIES = [
  { name: "The Culinary Lab",  sub: "Cooking & Baking",            slug: "culinary", image: "/Untitled (54).png" },
  { name: "Pigment & Canvas",  sub: "Painting, Arts & Crafts",     slug: "pigment",  image: "/Untitled (57).png" },
  { name: "Mud & Glass",       sub: "Pottery, Ceramics & Glass",   slug: "mud",      image: "/Untitled (56).png" },
  { name: "Yarn & Fiber Arts", sub: "Knitting, Crochet & Tufting", slug: "yarn",     image: "/Untitled (58).png" },
  { name: "Sparks & Wires",    sub: "Tech & Electronics",          slug: "sparks",   image: "/Untitled (59).png" },
  { name: "Sawdust & Grain",   sub: "Woodworking & Carving",       slug: "sawdust",  image: "/Untitled (61).png" },
];

export default function LandingPage() {
  const outerRef  = useRef<HTMLDivElement>(null);
  const layerRefs = useRef<(HTMLImageElement | null)[]>([]);
  const textRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => {
      if (!outerRef.current) return;
      const rect        = outerRef.current.getBoundingClientRect();
      const totalScroll = outerRef.current.offsetHeight - window.innerHeight;
      const scrolled    = Math.max(0, -rect.top);
      const progress    = Math.min(1, scrolled / totalScroll);

      // Layers: fly outward + fade out as user scrolls
      LAYERS.forEach((cfg, i) => {
        const el = layerRefs.current[i];
        if (!el) return;
        const tx      = cfg.initX + cfg.dirX * progress * 720 * cfg.speed;
        const ty      = cfg.initY + cfg.dirY * progress * 580 * cfg.speed;
        const scale   = 1 + progress * 0.08 * cfg.speed;
        const opacity = Math.max(0, 1 - progress * 2.4);
        el.style.transform = `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) rotate(${cfg.rot}deg) scale(${scale})`;
        el.style.opacity   = String(opacity);
      });

      // Text: hidden behind layers initially, reveals as they clear
      if (textRef.current) {
        const tp = Math.max(0, Math.min(1, (progress - 0.28) / 0.38));
        textRef.current.style.opacity   = String(tp);
        textRef.current.style.transform = `translateY(${(1 - tp) * 24}px)`;
      }
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

          {/* Dark base + teal spotlight */}
          <div className="parallax-bg" />
          {/* Halftone grit */}
          <div className="parallax-halftone" />

          {/* Hero text — z-index BELOW layers so they occlude it on load */}
          <div ref={textRef} className="parallax-copy">
            <h1>
              Dump the projects you abandoned or swap them for your next
              obsession (you'll probably abandon that too).
            </h1>
            <p>Swap the doom piles. Start fresh.</p>
            <a href="#categories" className="parallax-cta">
              Browse Categories ↓
            </a>
          </div>

          {/* Image layers — z-index ABOVE text, fly outward on scroll */}
          {LAYERS.map((cfg, i) => (
            <img
              key={i}
              src={cfg.src}
              alt=""
              ref={(el) => { layerRefs.current[i] = el; }}
              className="parallax-layer"
              style={{
                transform: `translate(calc(-50% + ${cfg.initX}px), calc(-50% + ${cfg.initY}px)) rotate(${cfg.rot}deg)`,
              }}
            />
          ))}

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
