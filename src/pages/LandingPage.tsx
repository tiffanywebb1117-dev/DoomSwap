import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

interface StickerCfg {
  id: number;
  src: string;
  initX: number;
  initY: number;
  rot: number;
  dirX: number;
  dirY: number;
  speed: number;
}

const STICKERS: StickerCfg[] = [
  { id: 1, src: "/sticker-organizer.png", initX: -120, initY: -70, rot: -8,  dirX: -1.0, dirY: -0.8, speed: 0.8 },
  { id: 2, src: "/sticker-baking.png",    initX:  95,  initY: -60, rot:  6,  dirX:  1.1, dirY: -1.2, speed: 1.0 },
  { id: 3, src: "/sticker-candle.png",    initX: -55,  initY:  65, rot: -4,  dirX: -0.8, dirY:  1.1, speed: 1.1 },
  { id: 4, src: "/sticker-pottery.png",   initX:  85,  initY:  80, rot: 11,  dirX:  1.3, dirY:  1.3, speed: 1.3 },
  { id: 5, src: "/sticker-yarn.png",      initX: -105, initY:  42, rot: -7,  dirX: -1.5, dirY:  0.9, speed: 1.5 },
  { id: 6, src: "/sticker-pens.png",      initX:  42,  initY: -98, rot:  4,  dirX:  1.0, dirY: -1.8, speed: 1.8 },
];

const CATEGORIES = [
  { name: "The Culinary Lab",  sub: "Cooking & Baking",             slug: "culinary", image: "/Untitled (54).png" },
  { name: "Pigment & Canvas",  sub: "Painting, Arts & Crafts",      slug: "pigment",  image: "/Untitled (57).png" },
  { name: "Mud & Glass",       sub: "Pottery, Ceramics & Glass",    slug: "mud",      image: "/Untitled (55).png" },
  { name: "Yarn & Fiber Arts", sub: "Knitting, Crochet & Tufting",  slug: "yarn",     image: "/Untitled (58).png" },
  { name: "Sparks & Wires",    sub: "Tech & Electronics",           slug: "sparks",   image: "/Untitled (59).png" },
  { name: "Sawdust & Grain",   sub: "Woodworking & Carving",        slug: "sawdust",  image: "/Untitled (60).png" },
];

export default function LandingPage() {
  const outerRef    = useRef<HTMLDivElement>(null);
  const stickerRefs = useRef<(HTMLImageElement | null)[]>([]);
  const textRef     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => {
      if (!outerRef.current) return;
      const rect          = outerRef.current.getBoundingClientRect();
      const totalScroll   = outerRef.current.offsetHeight - window.innerHeight;
      const scrolled      = Math.max(0, -rect.top);
      const progress      = Math.min(1, scrolled / totalScroll);

      STICKERS.forEach((cfg, i) => {
        const el = stickerRefs.current[i];
        if (!el) return;
        const tx      = cfg.initX + cfg.dirX * progress * 640 * cfg.speed;
        const ty      = cfg.initY + cfg.dirY * progress * 500 * cfg.speed;
        const opacity = Math.max(0, 1 - progress * 2.2);
        el.style.transform = `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) rotate(${cfg.rot}deg)`;
        el.style.opacity   = String(opacity);
      });

      if (textRef.current) {
        const tp = Math.max(0, Math.min(1, (progress - 0.32) / 0.45));
        textRef.current.style.opacity        = String(tp);
        textRef.current.style.transform      = `translateY(${(1 - tp) * 30}px)`;
        textRef.current.style.pointerEvents  = tp > 0.1 ? "auto" : "none";
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
          <div className="parallax-bg" />
          <div className="parallax-halftone" />

          {STICKERS.map((cfg, i) => (
            <img
              key={cfg.id}
              src={cfg.src}
              alt=""
              ref={(el) => { stickerRefs.current[i] = el; }}
              className="parallax-sticker"
              style={{
                transform: `translate(calc(-50% + ${cfg.initX}px), calc(-50% + ${cfg.initY}px)) rotate(${cfg.rot}deg)`,
              }}
            />
          ))}

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
