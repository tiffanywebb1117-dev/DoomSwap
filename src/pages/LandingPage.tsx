import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

interface StickerConfig {
  id: number;
  src: string;
  initX: number;
  initY: number;
  rot: number;
  dirX: number;
  dirY: number;
  speed: number;
}

const STICKERS: StickerConfig[] = [
  { id: 1, src: "/1.jpg", initX: -115, initY: -65,  rot: -8,  dirX: -0.9, dirY: -1.0, speed: 0.8 },
  { id: 2, src: "/2.jpg", initX:  85,  initY: -55,  rot:  6,  dirX:  1.1, dirY: -1.3, speed: 1.0 },
  { id: 3, src: "/3.jpg", initX: -45,  initY:  70,  rot: -4,  dirX: -0.7, dirY:  1.2, speed: 1.1 },
  { id: 4, src: "/4.jpg", initX:  75,  initY:  85,  rot: 11,  dirX:  1.4, dirY:  1.3, speed: 1.3 },
  { id: 5, src: "/5.jpg", initX: -95,  initY:  45,  rot: -7,  dirX: -1.6, dirY:  0.9, speed: 1.5 },
  { id: 6, src: "/6.jpg", initX:  35,  initY: -100, rot:  4,  dirX:  1.0, dirY: -1.8, speed: 1.8 },
];

const SCROLL_SECTIONS = 2; // how many viewport-heights of scroll before text fully reveals

export default function LandingPage() {
  const outerRef = useRef<HTMLDivElement>(null);
  const stickerRefs = useRef<(HTMLImageElement | null)[]>([]);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => {
      if (!outerRef.current) return;
      const rect = outerRef.current.getBoundingClientRect();
      const totalScrollable = outerRef.current.offsetHeight - window.innerHeight;
      const scrolled = Math.max(0, -rect.top);
      const progress = Math.min(1, scrolled / totalScrollable);

      STICKERS.forEach((cfg, i) => {
        const el = stickerRefs.current[i];
        if (!el) return;
        const tx = cfg.initX + cfg.dirX * progress * 600 * cfg.speed;
        const ty = cfg.initY + cfg.dirY * progress * 500 * cfg.speed;
        const opacity = Math.max(0, 1 - progress * 2.2);
        el.style.transform = `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) rotate(${cfg.rot}deg)`;
        el.style.opacity = String(opacity);
      });

      if (textRef.current) {
        const textProgress = Math.max(0, Math.min(1, (progress - 0.32) / 0.45));
        textRef.current.style.opacity = String(textProgress);
        textRef.current.style.transform = `translateY(${(1 - textProgress) * 28}px)`;
        if (textProgress > 0.1) {
          textRef.current.classList.add("revealed");
        } else {
          textRef.current.classList.remove("revealed");
        }
      }
    };

    // Set initial positions without waiting for a scroll event
    update();

    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div
      ref={outerRef}
      className="landing-outer"
      style={{ height: `${(SCROLL_SECTIONS + 1) * 100}vh` }}
    >
      <div className="landing-sticky">
        <div className="landing-bg" />
        <div className="landing-halftone" />

        {STICKERS.map((cfg, i) => (
          <img
            key={cfg.id}
            src={cfg.src}
            alt=""
            ref={(el) => {
              stickerRefs.current[i] = el;
            }}
            className="landing-sticker"
            style={{
              transform: `translate(calc(-50% + ${cfg.initX}px), calc(-50% + ${cfg.initY}px)) rotate(${cfg.rot}deg)`,
            }}
          />
        ))}

        <div ref={textRef} className="landing-copy">
          <h1>
            Dump the projects you abandoned or swap them for your next obsession
            (you'll probably abandon that too).
          </h1>
          <p>Swap the doom piles. Start fresh.</p>
          <Link to="/marketplace" className="landing-cta">
            Browse the Swap
          </Link>
        </div>
      </div>
    </div>
  );
}
