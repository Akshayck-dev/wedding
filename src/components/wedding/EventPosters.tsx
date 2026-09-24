import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

import haldiImg from "@/assets/haldi-poster.webp";
import mehendiImg from "@/assets/mehendi-poster.webp";
import sangeetImg from "@/assets/ChatGPT Image Sep 24, 2026, 12_48_24 PM.png";

const POSTERS = [
  { id: "haldi", src: haldiImg, alt: "Haldi Event Poster" },
  { id: "mehendi", src: mehendiImg, alt: "Mehendi Event Poster" },
  { id: "sangeet", src: sangeetImg, alt: "Sangeet Event Poster" },
];

export function EventPosters() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedPoster, setSelectedPoster] = useState<string | null>(null);

  // Disable body scroll when modal is open
  useEffect(() => {
    if (selectedPoster) {
      document.body.style.overflow = 'hidden';
      // @ts-ignore
      window.lenis?.stop();
    } else {
      document.body.style.overflow = 'unset';
      // @ts-ignore
      window.lenis?.start();
    }
    return () => {
      document.body.style.overflow = 'unset';
      // @ts-ignore
      window.lenis?.start();
    };
  }, [selectedPoster]);

  const next = () => setCurrentIndex((prev) => (prev + 1) % POSTERS.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + POSTERS.length) % POSTERS.length);

  const getCardStyle = (index: number) => {
    if (index === currentIndex) {
      return { x: 0, y: 0, scale: 1, rotate: 0, zIndex: 10, opacity: 1, brightness: 1 };
    } else if (index === (currentIndex + 1) % POSTERS.length) {
      return { x: 90, y: 12, scale: 0.9, rotate: 6, zIndex: 5, opacity: 1, brightness: 0.8 };
    } else {
      return { x: -90, y: 12, scale: 0.9, rotate: -6, zIndex: 5, opacity: 1, brightness: 0.8 };
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center pt-6 pb-8 relative z-20">
      {/* Title */}
      <h3
        className="font-serif-display text-[15px] sm:text-[17px] mb-8 tracking-[0.25em] uppercase text-center font-semibold"
        style={{
          background: "linear-gradient(135deg, #D4AF37 0%, #F5EBD5 50%, #C9A227 100%)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
          textShadow: "0 0 30px rgba(212,175,55,0.3)",
        }}
      >
        Wedding Celebrations
      </h3>

      {/* Card Deck */}
      <div className="relative w-full max-w-[360px] h-[340px] flex justify-center items-center">
        <AnimatePresence initial={false}>
          {POSTERS.map((poster, index) => {
            const style = getCardStyle(index);
            return (
              <motion.div
                key={poster.id}
                className="absolute w-[210px] h-[315px] rounded-lg overflow-hidden cursor-pointer bg-[#FAF6ED]"
                style={{
                  boxShadow: index === currentIndex
                    ? "0 20px 50px -12px rgba(0,0,0,0.5), 0 0 25px rgba(212,175,55,0.15), inset 0 0 0 2px rgba(184,134,45,0.5)"
                    : "0 12px 30px -8px rgba(0,0,0,0.4), inset 0 0 0 1.5px rgba(184,134,45,0.35)",
                }}
                initial={false}
                animate={{
                  x: style.x,
                  y: style.y,
                  scale: style.scale,
                  zIndex: style.zIndex,
                  rotate: style.rotate,
                  opacity: style.opacity,
                  filter: `brightness(${style.brightness})`
                }}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
                onClick={() => {
                  if (index === currentIndex) {
                    setSelectedPoster(poster.src);
                  } else {
                    setCurrentIndex(index);
                  }
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(e, { offset }) => {
                  const swipe = offset.x;
                  if (swipe < -30) next();
                  else if (swipe > 30) prev();
                }}
              >
                <img src={poster.src} alt={poster.alt} className="w-full h-full object-cover pointer-events-none select-none" />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      <div className="mt-5 flex flex-col items-center">
        <div className="flex items-center justify-center gap-5">
          <button onClick={prev} className="p-1 rounded-full text-gold hover:text-gold-soft transition-colors z-20">
            <ChevronLeft size={16} strokeWidth={2.5} />
          </button>

          <div className="flex items-center gap-2 z-20">
            {POSTERS.map((_, i) => (
              <div
                key={i}
                className={`transition-all duration-300 rounded-full ${i === currentIndex ? 'bg-gold w-4 h-1.5' : 'bg-gold/40 w-1.5 h-1.5'}`}
              />
            ))}
          </div>

          <button onClick={next} className="p-1 rounded-full text-gold hover:text-gold-soft transition-colors z-20">
            <ChevronRight size={16} strokeWidth={2.5} />
          </button>
        </div>

        <p className="mt-3 text-[9px] font-serif font-semibold text-gold-soft tracking-[0.3em] uppercase opacity-70">
          Swipe to explore
        </p>
      </div>

      {/* Full screen modal via Portal */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {selectedPoster && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
              onClick={() => setSelectedPoster(null)}
            >
              <button className="fixed top-6 right-6 z-[10000] p-3 bg-white/10 rounded-full text-white hover:text-white hover:bg-white/20 transition-all cursor-pointer backdrop-blur-md shadow-2xl border border-white/20">
                <X size={24} />
              </button>
              <motion.img
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                src={selectedPoster}
                alt="Full screen poster"
                className="w-full max-w-[90vw] sm:max-w-[400px] max-h-[90vh] object-contain rounded-lg shadow-[0_0_50px_rgba(184,134,45,0.2)]"
                onClick={(e) => e.stopPropagation()}
              />
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
}
