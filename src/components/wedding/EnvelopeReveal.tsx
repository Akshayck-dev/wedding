import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function EnvelopeReveal({ onComplete }: { onComplete?: () => void }) {
  const [stage, setStage] = useState<"initial" | "seal-clicked" | "opening" | "revealing" | "done">("initial");

  useEffect(() => {
    // Prevent scrolling during animation
    if (stage !== "done") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      if (onComplete) onComplete();
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [stage, onComplete]);

  const handleOpen = () => {
    if (stage !== "initial") return;
    
    // Start audio immediately on click
    document.dispatchEvent(new Event("wedding:enter"));
    
    setStage("seal-clicked");

    // Simple fade out sequence
    setTimeout(() => {
      setStage("revealing");
      setTimeout(() => {
        setStage("done");
      }, 1500); // Main fade out duration
    }, 400); // Seal fade out duration
  };

  if (stage === "done") return null;

  return (
    <motion.div 
      className="fixed inset-0 z-[300] flex items-center justify-center pointer-events-auto bg-black"
      initial={{ opacity: 1 }}
      animate={{ opacity: stage === "revealing" ? 0 : 1 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
    >
      <div className="relative w-full h-full max-w-full max-h-full flex items-center justify-center">
        
        {/* Envelope Image */}
        <img 
          src="/Photo.jpg.jpeg" 
          alt="" 
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none opacity-90"
        />

        {/* Interactive Seal & Text */}
        <AnimatePresence>
          {(stage === "initial" || stage === "seal-clicked") && (
            <>
              {/* Text at the bottom */}
              <motion.div 
                className="absolute bottom-[10vh] left-1/2 -translate-x-1/2 z-30 flex flex-col items-center justify-center text-center w-full px-4 pointer-events-none drop-shadow-lg"
                initial={{ opacity: 1 }}
                animate={stage === "seal-clicked" ? { opacity: 0 } : { opacity: [0.85, 1, 0.85] }}
                transition={stage === "seal-clicked" ? { duration: 0.5 } : { repeat: Infinity, duration: 3, ease: "easeInOut" }}
              >
                <span className="font-script text-4xl sm:text-5xl text-ivory mb-2 drop-shadow-md">You're Invited</span>
                <span className="text-[11px] sm:text-[12px] tracking-[0.2em] font-bold text-gold uppercase drop-shadow-sm max-w-xs">
                  Tap the envelope to open your invitation
                </span>
              </motion.div>

              {/* Glowing Interactive Area placed over the physical image seal */}
              <motion.div
                className="absolute left-1/2 bottom-[30vh] -translate-x-1/2 z-30 flex items-center justify-center cursor-pointer"
                onClick={handleOpen}
                initial={{ scale: 1, opacity: 1 }}
                animate={stage === "seal-clicked" ? { scale: 1.3, opacity: 0, filter: "brightness(2)" } : { scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="w-24 h-24 rounded-full flex items-center justify-center relative">
                  <div className="absolute inset-0 rounded-full bg-gold/30 animate-ping opacity-60 blur-md" />
                  <div className="absolute inset-0 rounded-full bg-transparent shadow-[0_0_30px_rgba(212,175,55,0.6)] backdrop-blur-sm transition-all hover:bg-gold/10 border border-gold/20" />
                  {/* Heart Icon to reinforce interaction */}
                  <svg className="w-10 h-10 text-gold drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
        
      </div>
    </motion.div>
  );
}
