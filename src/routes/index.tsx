import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { MapPin, Navigation, Calendar, Clock, ZoomIn, Download, X, Share2 } from "lucide-react";

import heroBg from "@/assets/pre_wedding_bg.webp";
import heroBgDesktop from "@/assets/pre_wedding_bg.webp";
import rose from "@/assets/rose.webp";
import cardImg from "@/assets/card.webp";
import ganeshaImg from "@/assets/ChatGPT Image Sep 21, 2026, 12_43_39 PM.webp";
import revealBg from "@/assets/media-generation-wedding-bg-pastel-watercolor-0-9d4d1e1e-3b4a-47b2-b37e-f67fa2d69e34 copy.webp";
import preWeddingBg from "@/assets/pre_wedding_bg.webp";
import weddingBg from "@/assets/wedding_bg.webp";
import { FloatingPetals } from "@/components/wedding/FloatingPetals";
import { FloatingButterflies } from "@/components/wedding/FloatingButterflies";
import { Ornament } from "@/components/wedding/Ornament";
import { Reveal } from "@/components/wedding/Reveal";
import { Countdown } from "@/components/wedding/Countdown";
import { EventPosters } from "@/components/wedding/EventPosters";
import { Gallery } from "@/components/wedding/Gallery";
import { RsvpForm } from "@/components/wedding/RsvpForm";
import { MusicToggle } from "@/components/wedding/MusicToggle";
import { EnvelopeReveal } from "@/components/wedding/EnvelopeReveal";
import { EnvelopeDateReveal } from "@/components/wedding/EnvelopeDateReveal";
import { OurMomentsCarousel } from "@/components/wedding/OurMomentsCarousel";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

const MAP_URL =
  "https://www.google.com/maps/dir/?api=1&destination=Royal+Orchid+Central+Bengaluru";
const MAP_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.953185887163!2d77.6128373745047!3d12.974846087340813!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae16846913b3b1%3A0xb60950daef881157!2sRoyal%20Orchid%20Central%20Bengaluru!5e0!3m2!1sen!2sin!4v1790098235146!5m2!1sen!2sin";

const WEDDING_MAP_URL =
  "https://www.google.com/maps/dir/?api=1&destination=The+Ritz-Carlton+Bangalore";
const WEDDING_MAP_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.953185887163!2d77.6128373745047!3d12.974846087340813!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1678b41def33%3A0xfe8ae8000ba8c87f!2sThe%20Ritz-Carlton%2C%20Bangalore!5e0!3m2!1sen!2sin!4v1790098547552!5m2!1sen!2sin";
const WEDDING_APPLE_MAPS_URL =
  "https://maps.apple.com/?address=No.+99+Residency+Road,+Bengaluru,+Karnataka+560025,+India&ll=12.9716,77.6033&q=The+Ritz-Carlton+Bangalore";

const PRE_WEDDING_APPLE_MAPS_URL =
  "https://maps.apple.com/?address=47/1+Dickenson+Road,+Manipal+Centre,+Bengaluru,+Karnataka+560042,+India&ll=12.974846,77.612837&q=Royal+Orchid+Central";

const PRE_WEDDING_GOOGLE_CALENDAR_URL =
  "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Pre-Wedding+Celebrations+-+Shreyasi+%26+Purushottam&dates=20261123T133000Z/20261123T183000Z&details=Join+us+for+Haldi,+Mehendi,+and+Sangeet.&location=Royal+Orchid+Central,+Bengaluru";
const PRE_WEDDING_APPLE_CALENDAR_URL = "/pre_wedding.ics";

const GOOGLE_CALENDAR_URL =
  "https://calendar.google.com/calendar/render?action=TEMPLATE&text=The+Wedding+-+Shreyasi+%26+Purushottam&dates=20261125T133000Z/20261125T173000Z&details=Join+us+for+our+wedding+celebration.&location=The+Ritz-Carlton,+Bengaluru";
const APPLE_CALENDAR_URL = "/wedding.ics";

const useIsAppleDevice = () => {
  const [isApple, setIsApple] = useState(false);
  useEffect(() => {
    setIsApple(
      /iPad|iPhone|iPod/.test(navigator.userAgent) || 
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1) || 
      /MacIntel/.test(navigator.platform)
    );
  }, []);
  return isApple;
};



export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Shreyasi & Purushottam — Wedding · 25 November 2026" },
      { name: "description", content: "The family invites you to the wedding of Shreyasi & Purushottam." },
    ],
  }),
});

function Index() {
  const { scrollY } = useScroll();
  const [showMarquee, setShowMarquee] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);  useEffect(() => {
    return scrollY.on("change", (latest) => {
      // Show marquee if scrolled down past 400px
      if (latest > 400) {
        setShowMarquee(true);
      } else {
        setShowMarquee(false);
      }
      
      // Show scroll-to-top button if scrolled past 600px
      if (latest > 600) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    });
  }, [scrollY]);

  const [menuOpen, setMenuOpen] = useState(false);

  const handleOpen = () => {
    // Smooth scroll to the invitation section if they click the scroll indicator
    const invitationSection = document.getElementById("invitation");
    if (invitationSection) {
      invitationSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (id: string) => {
    setMenuOpen(false);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, 300);
  };

  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden w-full">
      <EnvelopeReveal />
      <MusicToggle />



      {/* Premium Sticky Top-bar Header */}
      <AnimatePresence>
        {showMarquee && (
          <motion.div
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -60, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed top-0 left-0 right-0 z-[150] flex h-14 items-center justify-between border-b border-gold/30 bg-maroon/95 px-6 backdrop-blur-md safe-top shadow-soft"
          >
            {/* Calligraphy Initials logo */}
            <div 
              onClick={() => scrollToSection("invitation")}
              className="font-script text-2xl text-gold-gradient tracking-wider pt-1 select-none cursor-pointer"
            >
              S &amp; P
            </div>
            
            {/* Decorative luxury menu lines */}
            <div 
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex flex-col gap-1 cursor-pointer p-2 relative z-[160]"
            >
              {menuOpen ? (
                <div className="relative h-5 w-5 flex items-center justify-center">
                  <span className="absolute h-[1.5px] w-5 bg-gold rotate-45" />
                  <span className="absolute h-[1.5px] w-5 bg-gold -rotate-45" />
                </div>
              ) : (
                <>
                  <span className="h-[1.5px] w-5 bg-gold" />
                  <span className="h-[1.5px] w-5 bg-gold" />
                  <span className="h-[1.5px] w-3 bg-gold align-self-end ml-auto" />
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full-Screen Overlay Slide Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[140] flex flex-col items-center justify-center bg-maroon/95 backdrop-blur-lg"
          >
            {/* Decorative floral motifs background */}
            <div className="absolute inset-4 pointer-events-none rounded-[1.5rem] border border-gold/10" />
            <div className="absolute top-8 left-8 h-4 w-4 border-t border-l border-gold/20" />
            <div className="absolute top-8 right-8 h-4 w-4 border-t border-r border-gold/20" />
            <div className="absolute bottom-8 left-8 h-4 w-4 border-b border-l border-gold/20" />
            <div className="absolute bottom-8 right-8 h-4 w-4 border-b border-r border-gold/20" />

            <div className="flex flex-col items-center gap-8 text-center z-10">
              <span className="text-[10px] tracking-luxury text-gold uppercase">Invitation Menu</span>
              <Ornament />
              
              <button 
                onClick={() => scrollToSection("invitation")}
                className="font-serif-display text-2xl tracking-widest text-ivory hover:text-gold transition duration-300 uppercase"
              >
                Invitation Card
              </button>
              <button 
                onClick={() => scrollToSection("countdown")}
                className="font-serif-display text-2xl tracking-widest text-ivory hover:text-gold transition duration-300 uppercase"
              >
                Countdown
              </button>
              <button 
                onClick={() => scrollToSection("event")}
                className="font-serif-display text-2xl tracking-widest text-ivory hover:text-gold transition duration-300 uppercase"
              >
                Event Details
              </button>
              <button 
                onClick={() => scrollToSection("venue")}
                className="font-serif-display text-2xl tracking-widest text-ivory hover:text-gold transition duration-300 uppercase"
              >
                Location &amp; Venue
              </button>
              <button 
                onClick={() => scrollToSection("family")}
                className="font-serif-display text-2xl tracking-widest text-ivory hover:text-gold transition duration-300 uppercase"
              >
                The Family
              </button>
              <button 
                onClick={() => scrollToSection("rsvp")}
                className="font-serif-display text-2xl tracking-widest text-ivory hover:text-gold transition duration-300 uppercase"
              >
                RSVP
              </button>

              <Ornament className="mt-2" />
              <span className="font-script text-xl text-gold-gradient tracking-wide mt-2">Shreyasi &amp; Purushottam</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Hero onOpen={handleOpen} />

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.3 }}
      >
        <RevealSection />
        <OurMomentsCarousel />
        <RsvpSection />
      </motion.main>


    </div>
  );
}


/* ---------------- Hero ---------------- */
function Hero({ onOpen }: { onOpen: () => void }) {
  const { scrollY } = useScroll();
  
  // Parallax effects
  const backgroundY = useTransform(scrollY, [0, 1000], ["0%", "40%"]);
  const backgroundScale = useTransform(scrollY, [0, 1000], [1, 1.15]);
  
  // Foreground fade and shift
  const foregroundOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const foregroundY = useTransform(scrollY, [0, 400], ["0px", "-50px"]);
  return (
    <section className="relative h-[100svh] w-full overflow-hidden flex items-start justify-center">
      {/* Background with Cinematic Parallax */}
      <motion.div 
        className="absolute inset-0"
        style={{ y: backgroundY, scale: backgroundScale }}
      >
        <picture>
          <source media="(min-width: 640px)" srcSet={heroBgDesktop} />
          <img src={heroBg} alt="" className="h-full w-full object-cover animate-ken-burns" />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-b from-ivory/10 via-ivory/40 to-ivory/70 pointer-events-none" />
      </motion.div>
      


      <FloatingPetals count={15} />
      <FloatingButterflies count={12} />
      <motion.div 
        className="absolute inset-6 sm:inset-10 z-10 border-2 border-gold/30 arch-frame pointer-events-none"
        style={{ opacity: foregroundOpacity }}
      ></motion.div>
      
      <motion.div 
        className="relative z-10 w-full max-w-md mx-auto h-full flex flex-col items-center justify-start pt-[2vh] sm:pt-[4vh] px-4"
        style={{ opacity: foregroundOpacity, y: foregroundY }}
      >
        {/* Ganesha illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.2, duration: 1, ease: "easeOut" }}
          className="flex flex-col items-center mb-3 mt-2"
        >
          <img src={ganeshaImg} alt="Lord Ganesha" className="w-24 h-24 sm:w-28 sm:h-28 object-contain mb-1 drop-shadow-[0_2px_4px_rgba(255,255,255,0.5)]" />
          <div className="flex items-center gap-2">
            <span className="text-[12px] text-[#D4AF37] opacity-60">||</span>
            <span className="text-[18px] sm:text-[22px] text-[#7A5A29] font-serif font-light tracking-wide drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">Shree Ganeshaya Namah</span>
            <span className="text-[10px] text-[#D4AF37] opacity-60">||</span>
          </div>
        </motion.div>

        {/* Small flourish divider */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.4, duration: 1 }}
          className="mb-2 text-[#A67C43]"
        >
          <svg width="40" height="10" viewBox="0 0 40 10" fill="currentColor"><path d="M20 5 L15 0 L15 4 L0 4 L0 6 L15 6 L15 10 Z M25 0 L20 5 L25 10 L25 6 L40 6 L40 4 L25 4 Z" opacity="0.6"/></svg>
        </motion.div>

        {/* Invitation paragraph */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.6, duration: 1, ease: "easeOut" }}
          className="text-center mb-3 max-w-[340px] px-6 sm:px-8"
        >
          <p className="text-[11px] sm:text-[12px] leading-[2] text-[#2C1810] font-serif tracking-[0.2em] uppercase">
            <span className="font-bold text-[#7A5A29] tracking-[0.25em]">WITH HEARTS FULL OF JOY</span><br/>
            <span className="block my-1"><span className="text-[#1A0F0A] font-bold">DR. AJAYA NATH</span><br/><span className="text-[9px] text-[#D4AF37] font-semibold my-0 block">AND</span><span className="text-[#1A0F0A] font-bold">LATE DR. ASHOK KUMAR</span></span>
            <span className="text-[#2C1810] lowercase italic font-serif text-[13px] tracking-widest">joyfully invite you to celebrate</span><br/>
            <span className="block mt-1 font-bold text-[#7A5A29] tracking-[0.25em]">THE WEDDING<br/>FESTIVITIES OF THEIR DAUGHTER</span>
          </p>
        </motion.div>


        {/* SHREYASI */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.0, duration: 1, ease: "easeOut" }}
          className="flex flex-col items-center text-center w-full mb-0"
        >
          <h1 className="font-script text-[64px] sm:text-[76px] text-[#5A3A3A] font-bold leading-[0.8] drop-shadow-[0_2px_4px_rgba(255,255,255,0.7)]">Shreyasi</h1>
        </motion.div>

        {/* & with subtle gold stars */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.1, duration: 1 }}
          className="my-0 flex items-center gap-3"
        >
          <span className="text-[#D4AF37] text-lg opacity-80">✧</span>
          <span className="font-script text-[36px] sm:text-[44px] text-[#D4AF37] drop-shadow-[0_1px_2px_rgba(255,255,255,0.9)]">&amp;</span>
          <span className="text-[#D4AF37] text-lg opacity-80">✧</span>
        </motion.div>

        {/* PURUSHOTTAM */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.2, duration: 1, ease: "easeOut" }}
          className="flex flex-col items-center text-center w-full mb-3"
        >
          <h1 className="font-script text-[54px] sm:text-[64px] text-[#5A3A3A] font-bold leading-[0.8] drop-shadow-[0_2px_4px_rgba(255,255,255,0.7)]">Purushottam</h1>
        </motion.div>

        {/* Groom Parents */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.3, duration: 1 }}
          className="flex flex-col items-center text-center w-full mb-2"
        >
          <p className="text-[9px] text-[#D4AF37] font-serif font-bold mb-1 tracking-[0.3em] uppercase">SON OF</p>
          <p className="text-[11px] sm:text-[12px] leading-[2] text-[#2C1810] font-serif tracking-[0.2em] uppercase">
            <span className="text-[#1A0F0A] font-bold">MRS. SARITA SINHA</span><br/>
            <span className="text-[9px] text-[#D4AF37] font-semibold my-0 block">AND</span>
            <span className="text-[#1A0F0A] font-bold">MR. SHASHANK SINHA</span>
          </p>
        </motion.div>
        
        {/* Small diamond divider */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.4, duration: 1 }}
          className="mb-4 flex items-center justify-center gap-1 text-[#A67C43] opacity-70"
        >
          <div className="w-6 h-[1px] bg-current"></div>
          <svg width="8" height="8" viewBox="0 0 10 10" fill="currentColor"><path d="M5 0 L10 5 L5 10 L0 5 Z"/></svg>
          <div className="w-6 h-[1px] bg-current"></div>
        </motion.div>

      </motion.div>
    </section>
  );
}

/* ---------------- Section wrappers ---------------- */
function Section({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`relative px-6 py-12 sm:py-16 ${className}`}>
      <div className="mx-auto max-w-4xl">{children}</div>
    </section>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-center text-[10px] tracking-luxury text-gold uppercase">{children}</p>
  );
}

/* ---------------- Reveal Section ---------------- */
function RevealSection() {
  const isApple = useIsAppleDevice();
  const [isDateRevealed, setIsDateRevealed] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showMapChoice, setShowMapChoice] = useState(false);
  const [showPreWeddingMapChoice, setShowPreWeddingMapChoice] = useState(false);
  const { width, height } = useWindowSize();
  const { scrollY } = useScroll();
  const foregroundOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <Section id="reveal" className="pt-10 pb-8 flex flex-col items-center relative z-50 overflow-hidden">
      <div className="relative z-10 w-full flex flex-col items-center">
        <FloatingButterflies count={12} />
      <motion.div 
        className="absolute inset-4 sm:inset-6 z-10 border-2 border-gold/30 arch-frame pointer-events-none"
        style={{ opacity: foregroundOpacity }}
      ></motion.div>

      {/* Brief celebration confetti — subtle, fades after 3 seconds */}
      {showConfetti && (
        <div className="fixed inset-0 z-[100] pointer-events-none">
          <Confetti 
            width={width} 
            height={height} 
            numberOfPieces={120} 
            recycle={false} 
            gravity={0.12} 
            initialVelocityY={25}
            initialVelocityX={10}
            tweenDuration={80}
            colors={['#D4AF37', '#C9A227', '#FDFBF7', '#8B1A1A', '#650D1B']} 
            confettiSource={{
              x: width ? width / 2 - 40 : 0,
              y: height ? height / 2 + 80 : 0,
              w: 80,
              h: 10
            }}
          />
        </div>
      )}

      <Reveal className="w-full flex flex-col items-center z-20">
        <EnvelopeDateReveal 
          onOpenStart={() => {
            setIsDateRevealed(true);
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 3000);
          }}
          onReveal={() => {
            // Additional actions on full reveal if needed
          }}
          onClose={() => {
            setIsDateRevealed(false);
          }}
        />

        {/* Countdown Section - Only show when date is revealed */}
        <AnimatePresence>
          {isDateRevealed && (
            <motion.div
              initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
              className="relative w-full max-w-[320px] mt-6 flex flex-col items-center bg-[#FAF6ED]/85 backdrop-blur-md px-6 pt-14 pb-8 rounded-t-[160px] rounded-b-xl border border-[#B8862D]/30 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)]"
            >
              {/* Inner thin border */}
              <div className="absolute inset-2 border border-[#B8862D]/20 rounded-t-[150px] rounded-b-lg pointer-events-none"></div>
              
              {/* Floral Peak */}
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#B8862D" strokeWidth="1" opacity="0.6" className="absolute top-4 left-1/2 -translate-x-1/2">
                <path d="M12 22C12 22 20 15.3 20 10.5C20 6.4 16.6 3 12.5 3C10.4 3 8.5 4 7.2 5.5C5.9 4 4 3 1.9 3C-2.2 3 -5.6 6.4 -5.6 10.5C-5.6 15.3 2.4 22 2.4 22H12Z" transform="translate(4.8,0) scale(0.6)"/>
              </svg>

              <h4 className="text-[12px] font-serif tracking-[0.3em] text-[#8B1A1A] uppercase mb-6 mt-2 text-center drop-shadow-sm font-bold">The Countdown Begins</h4>
              <Countdown />
              <div className="mt-6 flex items-center justify-center gap-2">
                <svg className="w-3 h-3 text-[#A67C43]" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9v-2h2v2zm0-4H9V7h2v5zm4 4h-2v-2h2v2zm0-4h-2V7h2v5z" opacity="0.8"/></svg>
                <span className="font-script text-2xl sm:text-3xl text-[#5C4524]">Until our forever begins</span>
                <svg className="w-3 h-3 text-[#A67C43]" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9v-2h2v2zm0-4H9V7h2v5zm4 4h-2v-2h2v2zm0-4h-2V7h2v5z" opacity="0.8"/></svg>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Gold ornamental divider */}
        <div className="w-full flex flex-col items-center mt-14 mb-2">
          <div className="flex items-center gap-4 w-full max-w-[280px]">
            <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-[#B8862D]/50"></div>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[#B8862D]/60 shrink-0">
              <path d="M12 2L14 8L20 8L15 12L17 18L12 14L7 18L9 12L4 8L10 8Z" fill="currentColor" opacity="0.7"/>
            </svg>
            <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-[#B8862D]/50"></div>
          </div>
        </div>

        {/* 3D Event Posters Deck */}
        <div className="w-full mt-2 z-20 mb-4">
          <EventPosters />
        </div>

        {/* ═══════ PRE-WEDDING CELEBRATIONS — Location Section ═══════ */}
        <div
          className="w-full mt-2 mb-8 relative overflow-hidden py-16 flex flex-col items-center z-20 mx-4 sm:mx-8 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-gold/30"
        >
          {/* Generated Background Image */}
          <div 
            className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${preWeddingBg})`, opacity: 0.95 }}
          />
          {/* Subtle gradient overlay to ensure text readability */}
          <div className="absolute inset-0 z-0 bg-ivory/60" />
          
          <motion.div 
            className="relative z-10 flex flex-col items-center w-full"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.15 } },
            }}
          >
            {/* Top ornamental divider */}
            <motion.div
              className="flex items-center gap-3 w-full max-w-[260px] mb-8"
              variants={{ hidden: { opacity: 0, scaleX: 0 }, visible: { opacity: 1, scaleX: 1 } }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-maroon/60 to-maroon/40"></div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-maroon/70 shrink-0">
                <path d="M12 2L14 8L20 8L15 12L17 18L12 14L7 18L9 12L4 8L10 8Z" fill="currentColor" />
              </svg>
              <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent via-maroon/60 to-maroon/40"></div>
            </motion.div>

            {/* Section heading */}
            <motion.p
              className="text-[10px] tracking-[0.3em] text-maroon/80 uppercase font-bold mb-2 text-center"
              variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.7 }}
            >
              Join Us For
            </motion.p>

            <motion.h3
              className="font-serif-display text-xl sm:text-2xl tracking-[0.15em] uppercase text-center font-bold max-w-[90%] text-maroon"
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.8 }}
            >
              Pre-Wedding<br className="sm:hidden" /> Celebrations
            </motion.h3>

            {/* Date & Time */}
            <motion.div
              className="mt-6 flex flex-col items-center"
              variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.7 }}
            >
              <p className="font-serif-display text-3xl sm:text-4xl text-maroon tracking-widest font-bold">23 · 11 · 2026</p>
              <p className="text-[11px] sm:text-[12px] tracking-[0.2em] font-bold text-maroon uppercase mt-3">
                <Clock size={11} className="inline -mt-0.5 mr-1.5 text-maroon/80" />
                6 PM Onwards
              </p>
            </motion.div>

            {/* Small ornament */}
            <motion.div
              className="my-7 flex items-center gap-3 w-full max-w-[180px]"
              variants={{ hidden: { opacity: 0, scaleX: 0 }, visible: { opacity: 1, scaleX: 1 } }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex-1 h-[1px] bg-maroon/30"></div>
              <div className="w-1.5 h-1.5 rotate-45 bg-maroon/50"></div>
              <div className="flex-1 h-[1px] bg-maroon/30"></div>
            </motion.div>

            {/* Venue Name & Address */}
            <motion.div
              className="flex flex-col items-center text-center px-4"
              variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.7 }}
            >
              <p className="text-maroon font-serif-display font-bold text-xl sm:text-2xl tracking-wider">Royal Orchid Central</p>
              <p className="text-maroon/80 font-bold text-[10px] sm:text-[11px] tracking-[0.15em] uppercase mt-3 max-w-[85%] leading-[2]">
                47/1 Dickenson Road, Manipal Centre,<br />Bengaluru 560042
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="mt-8 flex flex-row flex-wrap items-center justify-center gap-3 px-4"
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.7 }}
            >
              <button
                onClick={() => setShowPreWeddingMapChoice(true)}
                className="inline-flex items-center gap-2 rounded-full border border-gold bg-maroon/90 px-6 py-2.5 text-[10px] font-bold tracking-[0.2em] text-ivory uppercase hover:bg-maroon transition-all duration-300 shadow-md cursor-pointer"
              >
                <Navigation size={12} className="text-gold" />
                Directions
              </button>
              <a
                href={isApple ? PRE_WEDDING_APPLE_CALENDAR_URL : PRE_WEDDING_GOOGLE_CALENDAR_URL}
                target={isApple ? "_self" : "_blank"}
                rel="noopener noreferrer"
                download={isApple ? "pre_wedding.ics" : undefined}
                className="inline-flex items-center gap-2 rounded-full border border-gold bg-maroon/90 px-6 py-2.5 text-[10px] font-bold tracking-[0.2em] text-ivory uppercase hover:bg-maroon transition-all duration-300 shadow-md cursor-pointer"
              >
                <Calendar size={12} className="text-gold" />
                Add to Calendar
              </a>
            </motion.div>
            
            {/* Bottom ornamental divider */}
            <motion.div
              className="flex items-center gap-3 w-full max-w-[260px] mt-10"
              variants={{ hidden: { opacity: 0, scaleX: 0 }, visible: { opacity: 1, scaleX: 1 } }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-maroon/60 to-maroon/40"></div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-maroon/70 shrink-0">
                <path d="M12 2L14 8L20 8L15 12L17 18L12 14L7 18L9 12L4 8L10 8Z" fill="currentColor" />
              </svg>
              <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent via-maroon/60 to-maroon/40"></div>
            </motion.div>
          </motion.div>
        </div>



        {/* ═══════ THE WEDDING — Location Section ═══════ */}
        <div
          className="w-full mt-12 mb-6 relative overflow-hidden py-16 flex flex-col items-center z-20 mx-4 sm:mx-8 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-gold/30"
        >
          {/* Generated Background Image */}
          <div 
            className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${weddingBg})`, opacity: 0.95 }}
          />
          {/* Subtle gradient overlay to ensure text readability */}
          <div className="absolute inset-0 z-0 bg-ivory/60" />
          
          <motion.div 
            className="relative z-10 flex flex-col items-center w-full"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.15 } },
            }}
          >
            {/* Top ornamental divider */}
            <motion.div
              className="flex items-center gap-3 w-full max-w-[260px] mb-8"
              variants={{ hidden: { opacity: 0, scaleX: 0 }, visible: { opacity: 1, scaleX: 1 } }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-maroon/60 to-maroon/40"></div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-maroon/70 shrink-0">
                <path d="M12 2L14 8L20 8L15 12L17 18L12 14L7 18L9 12L4 8L10 8Z" fill="currentColor" />
              </svg>
              <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent via-maroon/60 to-maroon/40"></div>
            </motion.div>

            {/* Section heading */}
            <motion.p
              className="text-[10px] tracking-[0.3em] text-maroon/80 uppercase font-bold mb-2"
              variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.7 }}
            >
              Join Us For
            </motion.p>

            <motion.h3
              className="font-serif-display text-2xl sm:text-3xl tracking-[0.15em] uppercase text-center font-bold text-maroon"
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.8 }}
            >
              The Wedding
            </motion.h3>

            {/* Date & Time */}
            <motion.div
              className="mt-6 flex flex-col items-center"
              variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.7 }}
            >
              <p className="font-serif-display text-3xl sm:text-4xl text-maroon tracking-widest font-bold">25 · 11 · 2026</p>
              <p className="text-[11px] sm:text-[12px] tracking-[0.2em] font-bold text-maroon uppercase mt-3">
                <Clock size={11} className="inline -mt-0.5 mr-1.5 text-maroon/80" />
                7 PM Onwards
              </p>
            </motion.div>

            {/* Small ornament */}
            <motion.div
              className="my-7 flex items-center gap-3 w-full max-w-[180px]"
              variants={{ hidden: { opacity: 0, scaleX: 0 }, visible: { opacity: 1, scaleX: 1 } }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex-1 h-[1px] bg-maroon/30"></div>
              <div className="w-1.5 h-1.5 rotate-45 bg-maroon/50"></div>
              <div className="flex-1 h-[1px] bg-maroon/30"></div>
            </motion.div>

            {/* Venue Name & Address */}
            <motion.div
              className="flex flex-col items-center text-center px-4"
              variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.7 }}
            >
              <p className="text-maroon font-serif-display font-bold text-xl sm:text-2xl tracking-wider">The Ritz-Carlton</p>
              <p className="text-maroon/80 font-bold text-[10px] sm:text-[11px] tracking-[0.15em] uppercase mt-3 max-w-[85%] leading-[2]">
                No. 99 Residency Road,<br />Bengaluru 560025
              </p>
            </motion.div>


            {/* CTA Buttons */}
            <motion.div
              className="mt-8 flex flex-row flex-wrap items-center justify-center gap-3 px-4"
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.7 }}
            >
              <button
                onClick={() => setShowMapChoice(true)}
                className="inline-flex items-center gap-2 rounded-full border border-gold bg-maroon/90 px-6 py-2.5 text-[10px] font-bold tracking-[0.2em] text-ivory uppercase hover:bg-maroon transition-all duration-300 shadow-md cursor-pointer"
              >
                <Navigation size={12} className="text-gold" />
                Directions
              </button>
              <a
                href={isApple ? APPLE_CALENDAR_URL : GOOGLE_CALENDAR_URL}
                target={isApple ? "_self" : "_blank"}
                rel="noopener noreferrer"
                download={isApple ? "wedding.ics" : undefined}
                className="inline-flex items-center gap-2 rounded-full border border-gold bg-maroon/90 px-6 py-2.5 text-[10px] font-bold tracking-[0.2em] text-ivory uppercase hover:bg-maroon transition-all duration-300 shadow-md cursor-pointer"
              >
                <Calendar size={12} className="text-gold" />
                Add to Calendar
              </a>
            </motion.div>
            
            {/* Bottom ornamental divider */}
            <motion.div
              className="flex items-center gap-3 w-full max-w-[260px] mt-10"
              variants={{ hidden: { opacity: 0, scaleX: 0 }, visible: { opacity: 1, scaleX: 1 } }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-maroon/60 to-maroon/40"></div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-maroon/70 shrink-0">
                <path d="M12 2L14 8L20 8L15 12L17 18L12 14L7 18L9 12L4 8L10 8Z" fill="currentColor" />
              </svg>
              <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent via-maroon/60 to-maroon/40"></div>
            </motion.div>
          </motion.div>
        </div>

          {/* Map Choice Bottom Sheet */}
          <AnimatePresence>
            {showMapChoice && (
              <motion.div
                className="fixed inset-0 z-[200] flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                {/* Backdrop */}
                <div
                  className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                  onClick={() => setShowMapChoice(false)}
                />
                {/* Sheet */}
                <motion.div
                  className="relative w-full max-w-sm mx-4 mb-6 rounded-2xl overflow-hidden border border-gold/30 shadow-[0_-10px_40px_rgba(0,0,0,0.4)]"
                  style={{ backgroundColor: '#3A0A12' }}
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 100, opacity: 0 }}
                  transition={{ type: 'spring', damping: 28, stiffness: 300 }}
                >
                  <div className="flex justify-center pt-3 pb-1">
                    <div className="w-8 h-1 rounded-full bg-gold/30"></div>
                  </div>

                  <p className="text-center text-[10px] tracking-[0.25em] text-gold/80 uppercase font-semibold pt-3 pb-4">
                    Location Map
                  </p>

                  <div className="px-5 pb-5">
                    <div className="w-full h-64 rounded-xl overflow-hidden border border-gold/30 mb-4 bg-black/20">
                      <iframe 
                        src={WEDDING_MAP_EMBED} 
                        className="w-full h-full border-0" 
                        allowFullScreen 
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                    </div>
                    <a
                      href={WEDDING_MAP_URL}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => setShowMapChoice(false)}
                      className="flex items-center justify-center gap-2.5 w-full py-3 rounded-xl border border-gold/30 bg-gold text-maroon text-[11px] font-bold tracking-[0.15em] uppercase hover:bg-gold-soft hover:-translate-y-0.5 transition-all duration-300"
                    >
                      Navigate
                    </a>
                  </div>

                  <button
                    onClick={() => setShowMapChoice(false)}
                    className="w-full py-3 text-[10px] tracking-[0.2em] text-ivory/40 uppercase font-semibold hover:text-ivory/70 transition-colors border-t border-gold/15"
                  >
                    Close
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Pre-Wedding Map Choice Bottom Sheet */}
          <AnimatePresence>
            {showPreWeddingMapChoice && (
              <motion.div
                className="fixed inset-0 z-[200] flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <div
                  className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                  onClick={() => setShowPreWeddingMapChoice(false)}
                />
                <motion.div
                  className="relative w-full max-w-sm mx-4 mb-6 rounded-2xl overflow-hidden border border-gold/30 shadow-[0_-10px_40px_rgba(0,0,0,0.4)]"
                  style={{ backgroundColor: '#3A0A12' }}
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 100, opacity: 0 }}
                  transition={{ type: 'spring', damping: 28, stiffness: 300 }}
                >
                  <div className="flex justify-center pt-3 pb-1">
                    <div className="w-8 h-1 rounded-full bg-gold/30"></div>
                  </div>

                  <p className="text-center text-[10px] tracking-[0.25em] text-gold/80 uppercase font-semibold pt-3 pb-4">
                    Location Map
                  </p>

                  <div className="px-5 pb-5">
                    <div className="w-full h-64 rounded-xl overflow-hidden border border-gold/30 mb-4 bg-black/20">
                      <iframe 
                        src={MAP_EMBED} 
                        className="w-full h-full border-0" 
                        allowFullScreen 
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                    </div>
                    <a
                      href={MAP_URL}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => setShowPreWeddingMapChoice(false)}
                      className="flex items-center justify-center gap-2.5 w-full py-3 rounded-xl border border-gold/30 bg-gold text-maroon text-[11px] font-bold tracking-[0.15em] uppercase hover:bg-gold-soft hover:-translate-y-0.5 transition-all duration-300"
                    >
                      Navigate
                    </a>
                  </div>

                  <button
                    onClick={() => setShowPreWeddingMapChoice(false)}
                    className="w-full py-3 text-[10px] tracking-[0.2em] text-ivory/40 uppercase font-semibold hover:text-ivory/70 transition-colors border-t border-gold/15"
                  >
                    Close
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>



          {/* Bottom ornamental divider */}
          <motion.div
            className="flex items-center gap-3 w-full max-w-[260px] mt-10"
            variants={{ hidden: { opacity: 0, scaleX: 0 }, visible: { opacity: 1, scaleX: 1 } }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-gold/60 to-gold/40"></div>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-gold/70 shrink-0">
              <path d="M12 2L14 8L20 8L15 12L17 18L12 14L7 18L9 12L4 8L10 8Z" fill="currentColor" />
            </svg>
            <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent via-gold/60 to-gold/40"></div>
          </motion.div>
      </Reveal>
      </div>
    </Section>
  );
}



/* ---------------- Countdown ---------------- */
function CountdownSection() {
  return (
    <Section id="countdown" className="flex flex-col items-center justify-center py-10 sm:py-12 relative overflow-hidden">
      <Reveal className="text-center w-full z-10">
        <Ornament className="mb-4 rotate-180" />
        <SectionLabel>Counting Down</SectionLabel>
        
        <div className="mt-8">
          <Countdown />
        </div>

        <Ornament className="mt-12" />

        <div className="mt-12 text-center">
          <SectionLabel>We Welcome You</SectionLabel>
          <div className="text-gold/20 mt-4">
            <svg className="w-10 h-10 mx-auto" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
          </div>
          <p className="font-serif italic text-ivory/90 text-[14px] sm:text-[15px] leading-relaxed max-w-md mx-auto mt-4 px-6 text-center">
            You have played a beautiful part in our love story. Now we invite you to be there as we write the most important chapter yet.
          </p>

          <div className="mt-8">
            <h4 className="font-serif-display text-lg sm:text-xl text-ivory font-semibold">
              Mr. N. P. Shuhaib &amp; Mrs. K. V. Asmabi
            </h4>
            <p className="text-[9px] tracking-widest text-gold-soft uppercase mt-4 max-w-xs mx-auto leading-loose">
              Request the pleasure of your presence and prayers at the
            </p>
            <h3 className="font-script text-4xl text-gold mt-4 mb-2">Wedding</h3>
            <p className="text-[9px] tracking-widest text-gold-soft uppercase mb-6">
              Of their beloved daughter
            </p>

            <h4 className="font-serif-display text-2xl sm:text-3xl text-ivory uppercase tracking-wide">
              Shreyasi
            </h4>
            
            <div className="my-4 text-gold/40 flex items-center justify-center gap-4">
              <div className="h-[1px] w-12 bg-gold/40"></div>
              <span className="font-serif italic text-sm text-gold">with</span>
              <div className="h-[1px] w-12 bg-gold/40"></div>
            </div>

            <h4 className="font-serif-display text-2xl sm:text-3xl text-ivory uppercase tracking-wide">
              Purushottam
            </h4>
            <p className="font-serif italic text-[11px] sm:text-xs text-muted-foreground mt-3">
              S/o V. Imbichi Mammu and Fousiya PM
            </p>
          </div>
        </div>
      </Reveal>
      
      {/* Background floral hints */}
      <FloatingPetals count={10} />
    </Section>
  );
}

/* ---------------- Add to Calendar Button ---------------- */
function AddToCalendarButton() {
  function handleAddToCalendar() {
    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Shreyasi & Purushottam Wedding//EN",
      "BEGIN:VEVENT",
      "UID:shreyasi-purushottam-wedding-2026@shuhaz",
      "DTSTART:20260809T073000Z",
      "DTEND:20260809T093000Z",
      "SUMMARY:Shreyasi & Purushottam Wedding",
      "DESCRIPTION:The family invites you to the wedding of Shreyasi & Purushottam",
      "LOCATION:Shasa\\, Behind Crystal Plaza\\, Arakkinar",
      "STATUS:CONFIRMED",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "shreyasi-purushottam-wedding.ics";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  return (
    <button
      onClick={handleAddToCalendar}
      className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-[#FDFBF7]/80 px-8 py-3 text-[9px] font-bold tracking-[0.2em] text-ink uppercase shadow-sm hover:bg-gold hover:text-white transition-all duration-300 backdrop-blur-md"
    >
      <Calendar size={12} className="-mt-0.5" /> Add to Calendar
    </button>
  );
}

/* ---------------- Event ---------------- */

function EventSection() {
  return (
    <section className="relative flex items-center justify-center py-12 sm:py-16 overflow-hidden" id="event">

      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="relative z-10 px-6 text-center w-full max-w-md mx-auto flex flex-col items-center">
        <div className="mb-8 sm:mb-12">
          <span className="rounded-sm border border-gold/40 px-5 py-2 text-[9px] font-semibold tracking-[0.3em] text-gold-soft uppercase bg-maroon-deep/60 backdrop-blur-sm">
            Wedding
          </span>
        </div>
        
        <h4 className="font-serif-display text-sm sm:text-base text-ink uppercase tracking-widest text-gold-gradient font-semibold">
          SUNDAY
        </h4>
        <h3 className="font-serif-display text-xl sm:text-2xl text-gold mt-2 tracking-wider">
          25 NOVEMBER 2026 1:00 PM - 3:00 PM
        </h3>

        <div className="my-6 text-gold/30 flex items-center justify-center gap-4">
          <div className="h-[1px] w-12 bg-gold/40"></div>
          <Ornament />
          <div className="h-[1px] w-12 bg-gold/40"></div>
        </div>

        <p className="text-[10px] tracking-[0.3em] font-medium text-muted-foreground uppercase mb-2">
          VENUE
        </p>
        <h4 className="font-serif-display text-lg sm:text-xl text-ink font-bold uppercase tracking-widest">
          Shasa
        </h4>
        <p className="text-[8px] sm:text-[9px] tracking-widest text-muted-foreground uppercase mt-3 leading-relaxed max-w-[280px] mx-auto font-medium">
          Behind Crystal Plaza, Arakkinar.
        </p>
        
        <div className="mt-8 mb-16">
          <AddToCalendarButton />
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center">
        <span className="text-[8px] font-bold tracking-[0.4em] text-gold/80 uppercase mb-2">Scroll</span>
        <div className="flex flex-col gap-0.5 text-gold/60">
          <svg className="w-4 h-4 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
          <svg className="w-4 h-4 animate-bounce" style={{ marginTop: "-12px", animationDelay: "0.2s" }} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Venue ---------------- */
function VenueSection() {
  return (
    <Section id="venue" className="">
      <Reveal className="text-center w-full">
        <SectionLabel>FIND US</SectionLabel>
        <h3 className="mt-4 font-serif-display text-2xl font-light text-ink uppercase tracking-wide">
          Shasa
        </h3>
        <p className="text-[8px] tracking-[0.2em] text-muted-foreground uppercase mt-3">
          Behind Crystal Plaza, Arakkinar
        </p>
      </Reveal>

      <Reveal delay={0.15} className="mt-8">
        <div className="relative mx-auto max-w-sm rounded-[1.5rem] bg-maroon-deep overflow-hidden shadow-luxury h-64 border border-gold/30">
          {/* Mock stylized map graphics */}
          <div className="absolute top-4 left-4 right-4 h-12 flex gap-4">
            <div className="w-1/3 bg-maroon/50 rounded-lg"></div>
            <div className="w-2/3 flex flex-col gap-2">
              <div className="w-full h-4 bg-maroon/30 rounded-full"></div>
              <div className="w-2/3 h-4 bg-maroon/30 rounded-full"></div>
            </div>
          </div>
          <div className="absolute top-20 left-0 right-0 h-4 bg-maroon/30"></div>
          <div className="absolute top-28 left-1/3 w-4 h-full bg-maroon/30"></div>
          
          <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
             <div className="w-10 h-10 rounded-full border-2 border-gold/40 absolute scale-150"></div>
             <div className="w-8 h-8 rounded-full bg-gold/90 text-white flex items-center justify-center shadow-lg">
                <MapPin size={16} />
             </div>
          </div>

          <div className="absolute bottom-4 left-4 right-4 bg-printed-card p-4 rounded-xl shadow-luxury flex items-center justify-between border border-gold/40">
             <div>
               <h4 className="font-bold text-[11px] text-maroon-deep">Shasa</h4>
               <p className="text-[8px] text-maroon-deep/70 mt-1 line-clamp-1">Behind Crystal Plaza, Arakkinar</p>
             </div>
             <a
              href={MAP_URL}
              target="_blank"
              rel="noreferrer"
              className="bg-[#B98F45] text-white px-4 py-2 rounded-lg text-[9px] font-bold tracking-wider hover:bg-[#A37B3B] transition"
             >
               Directions &rarr;
             </a>
          </div>
        </div>
      </Reveal>


    </Section>
  );
}

/* ---------------- Gallery ---------------- */
function GallerySection() {
  return (
    <Section id="gallery">
      <Reveal className="text-center">
        <SectionLabel>Moments</SectionLabel>
        <h3 className="mt-4 font-serif-display text-3xl font-light text-ivory sm:text-5xl">
          Their story in frames
        </h3>
      </Reveal>
      <Reveal delay={0.1} className="mt-12">
        <Gallery />
      </Reveal>
    </Section>
  );
}



/* ---------------- RSVP ---------------- */
function RsvpSection() {
  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(
      "We are delighted to invite you to the wedding of Shreyasi & Purushottam.\n\nPlease view our wedding invitation and RSVP here:\n" +
      window.location.href
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
  };

  return (
    <Section id="rsvp" className="flex flex-col items-center justify-center relative z-20 pt-4 pb-12">
      <RsvpForm />
      
      <div className="mt-12 flex flex-col items-center gap-4">
        <p className="text-[10px] sm:text-[11px] text-ivory/60 font-serif tracking-[0.1em] italic text-center max-w-xs">
          Your presence is our biggest present. No boxed gifts, please.
        </p>
        <button
          onClick={handleWhatsAppShare}
          className="inline-flex items-center gap-2 rounded-full border border-[#25D366]/40 bg-[#25D366]/10 px-6 py-2.5 text-[10px] font-bold tracking-[0.15em] text-ivory uppercase hover:bg-[#25D366] hover:text-white transition-all duration-300 shadow-md backdrop-blur-sm cursor-pointer mt-2"
        >
          <Share2 size={12} className="opacity-80" />
          Share via WhatsApp
        </button>
      </div>
    </Section>
  );
}


