import { useState } from "react";
import { motion, PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { Reveal } from "./Reveal";

import img1 from "@/assets/WhatsApp Image 2026-09-20 at 8.56.14 PM.webp";
import img2 from "@/assets/WhatsApp Image 2026-09-20 at 8.56.14 PM (1).webp";
import img3 from "@/assets/WhatsApp Image 2026-09-20 at 8.56.13 PM.webp";
import img4 from "@/assets/WhatsApp Image 2026-09-20 at 8.56.13 PM (1).webp";
import img5 from "@/assets/WhatsApp Image 2026-09-20 at 8.56.12 PM.webp";
import img6 from "@/assets/WhatsApp Image 2026-09-20 at 8.56.11 PM (1).webp";

const images = [img1, img2, img3, img4, img5, img6];

export function OurMomentsCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = 50;
    if (info.offset.x > swipeThreshold) {
      handlePrev();
    } else if (info.offset.x < -swipeThreshold) {
      handleNext();
    }
  };

  const handleNext = () => setActiveIndex((prev) => (prev + 1) % images.length);
  const handlePrev = () => setActiveIndex((prev) => (prev - 1 + images.length) % images.length);

  const getPosition = (index: number) => {
    const diff = (index - activeIndex + images.length) % images.length;
    let relative = diff;
    if (diff > images.length / 2) relative = diff - images.length;

    if (relative === 0) return "active";
    if (relative === 1) return "right1";
    if (relative === -1) return "left1";
    if (relative === 2) return "right2";
    if (relative === -2) return "left2";
    return "hidden";
  };

  const variants = {
    active: { x: 0, scale: 1, zIndex: 10, rotateY: 0, opacity: 1, filter: "brightness(1)" },
    left1: { x: "-55%", scale: 0.82, zIndex: 5, rotateY: 15, opacity: 0.6, filter: "brightness(0.6)" },
    right1: { x: "55%", scale: 0.82, zIndex: 5, rotateY: -15, opacity: 0.6, filter: "brightness(0.6)" },
    left2: { x: "-95%", scale: 0.6, zIndex: 2, rotateY: 25, opacity: 0, filter: "brightness(0.3)" },
    right2: { x: "95%", scale: 0.6, zIndex: 2, rotateY: -25, opacity: 0, filter: "brightness(0.3)" },
    hidden: { x: 0, scale: 0.5, zIndex: 1, opacity: 0 }
  };

  return (
    <section className="w-full relative pt-0 pb-12 flex flex-col items-center bg-transparent overflow-hidden">
      <Reveal className="w-full flex flex-col items-center">

        {/* Titles */}
        <motion.p
          className="text-[10px] sm:text-[11px] tracking-[0.3em] text-gold/70 uppercase font-semibold mb-3 text-center"
          variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.7 }}
        >
          Memories that feel like forever
        </motion.p>

        <motion.h3
          className="font-serif-display text-2xl sm:text-3xl tracking-[0.15em] uppercase text-center font-semibold mb-6"
          style={{
            background: "linear-gradient(135deg, #D4AF37 0%, #F5EBD5 50%, #C9A227 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.8 }}
        >
          Our Moments
        </motion.h3>


        {/* Carousel Container */}
        <div className="relative w-full max-w-4xl h-[460px] sm:h-[580px] flex justify-center items-center perspective-[1200px]">
          {/* Navigation Arrows Desktop */}
          <button
            onClick={handlePrev}
            className="absolute left-4 sm:left-12 z-20 hidden md:flex w-10 h-10 items-center justify-center rounded-full border border-gold/30 bg-maroon/50 text-gold backdrop-blur-sm hover:bg-gold/20 transition-all shadow-md"
          >
            <ChevronLeft size={20} />
          </button>

          {images.map((src, index) => {
            const position = getPosition(index);
            return (
              <motion.div
                key={index}
                className="absolute w-[300px] h-[400px] sm:w-[380px] sm:h-[520px] rounded-[1.5rem] overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.5)] cursor-pointer"
                style={{
                  border: "2px solid rgba(212, 175, 55, 0.4)",
                }}
                variants={variants}
                initial="hidden"
                animate={position}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
                onClick={() => {
                  if (position === "left1" || position === "left2") handlePrev();
                  if (position === "right1" || position === "right2") handleNext();
                }}
              >
                <img
                  src={src}
                  alt={`Wedding Moment ${index + 1}`}
                  className="w-full h-full object-cover"
                  draggable={false}
                />
              </motion.div>
            );
          })}

          {/* Invisible drag overlay for smooth swiping */}
          <motion.div
            className="absolute inset-0 z-30 touch-none"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
          />
          
          {/* Navigation Arrows Desktop */}
          <button
            onClick={handleNext}
            className="absolute right-4 sm:right-12 z-20 hidden md:flex w-10 h-10 items-center justify-center rounded-full border border-gold/30 bg-maroon/50 text-gold backdrop-blur-sm hover:bg-gold/20 transition-all shadow-md"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Pagination & Instructions */}
        <motion.div
          className="flex flex-col items-center mt-6"
          variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="flex gap-2 mb-6 z-40 relative">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  activeIndex === idx ? "bg-gold scale-125" : "bg-gold/30 hover:bg-gold/50"
                }`}
              />
            ))}
          </div>
          <p className="text-[9px] sm:text-[10px] tracking-[0.3em] text-ivory/50 uppercase">
            Swipe for more moments
          </p>
        </motion.div>

        {/* Section End Transition */}
        <motion.div
          className="flex flex-col items-center mt-10"
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <p className="font-serif italic text-sm text-gold/70 mb-2">And so,</p>
          <p className="text-[11px] sm:text-[12px] tracking-[0.35em] text-ivory uppercase font-semibold">
            Our Forever Begins
          </p>
          <Heart size={10} className="text-gold/80 mt-6 animate-pulse" fill="currentColor" />
        </motion.div>
      </Reveal>
    </section>
  );
}
