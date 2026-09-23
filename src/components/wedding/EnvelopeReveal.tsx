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
          className="absolute inset-0 w-full h-full object-cover object-[65%_center] pointer-events-none opacity-90"
        />

        {/* Interactive Seal & Text */}
        <AnimatePresence>
          {(stage === "initial" || stage === "seal-clicked") && (
            <>
              {/* Invisible clickable area over the logo in the background image */}
              <motion.div
                className="absolute left-1/2 top-[10%] -translate-x-1/2 w-64 h-64 z-30 flex items-center justify-center cursor-pointer rounded-full"
                onClick={handleOpen}
                initial={{ scale: 1 }}
                animate={stage === "seal-clicked" ? { scale: 1.2, opacity: 0, filter: "brightness(1.5)" } : { scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Subtle faint pulse effect over the logo */}
                <div className="absolute inset-0 rounded-full shadow-[0_0_50px_rgba(255,255,255,0.15)] animate-pulse pointer-events-none" />
              </motion.div>
            </>
          )}
        </AnimatePresence>
        
      </div>
    </motion.div>
  );
}
