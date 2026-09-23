import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function EnvelopeDateReveal({ onReveal, onClose, onOpenStart }: { onReveal?: () => void, onClose?: () => void, onOpenStart?: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);
    setHasOpened(true);
    if (onOpenStart) onOpenStart();
    // Sequence: 
    // 1. Wax seal fades/breaks (0-0.5s)
    // 2. Top flap opens (0.5s - 2.0s)
    // 3. Card slides up (2.0s - 3.5s)
    // 4. Text animation finishes at ~5.5s
    setTimeout(() => {
      if (onReveal) onReveal();
    }, 5500);
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(false);
    if (onClose) onClose();
  };

  return (
    <div className="relative w-full h-[420px] max-w-sm mx-auto flex items-end justify-center perspective-[1000px] mb-4">
      {/* The Envelope Container */}
      <div 
        className="relative w-[320px] max-w-full h-[220px] cursor-pointer group shrink-0"
        onClick={handleOpen}
      >
        {/* Envelope Back (Pocket) */}
        <div className="absolute inset-0 bg-[#f4ebd8] rounded-md shadow-2xl border border-[#B8862D]/30 overflow-hidden">
          {/* Subtle paper texture */}
          <div className="absolute inset-0 opacity-[0.15] mix-blend-multiply" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
        </div>

        {/* The Card */}
        <motion.div
          initial={{ y: 0, boxShadow: "0px 0px 0px rgba(0,0,0,0)" }}
          animate={{ 
            y: isOpen ? -180 : 0, 
            boxShadow: isOpen ? "0px 20px 25px -5px rgba(0,0,0,0.1), 0px 8px 10px -6px rgba(0,0,0,0.1), 0 0 15px 2px rgba(184, 134, 45, 0.25)" : "0px 0px 0px rgba(0,0,0,0)" 
          }}
          transition={{ duration: 1.5, delay: isOpen ? 1.5 : 0, ease: [0.25, 1, 0.5, 1] }}
          className="absolute bottom-2 left-2 right-2 h-[200px] bg-[#fffdf9] rounded border border-[#B8862D]/40 flex flex-col items-center justify-center p-4 z-10 overflow-hidden"
        >
           {/* Card Border */}
           <div className="absolute inset-2 border border-[#B8862D]/20 rounded-sm pointer-events-none"></div>
           
           {/* Floral Ornament Top */}
           <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#B8862D" strokeWidth="1" opacity="0.6" className="mb-2"><path d="M12 22C12 22 20 15.3 20 10.5C20 6.4 16.6 3 12.5 3C10.4 3 8.5 4 7.2 5.5C5.9 4 4 3 1.9 3C-2.2 3 -5.6 6.4 -5.6 10.5C-5.6 15.3 2.4 22 2.4 22H12Z" transform="translate(4.8,0) scale(0.6)"/></svg>
           
           {/* Text */}
           <motion.h3 
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : 10 }}
             transition={{ duration: 0.8, delay: isOpen ? 3 : 0 }}
             className="text-[12px] uppercase tracking-[0.2em] text-[#76552C] font-serif mb-2"
           >
             Save The Date
           </motion.h3>
           
           <motion.div
             initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0 }}
             animate={{ clipPath: isOpen ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)", opacity: isOpen ? 1 : 0 }}
             transition={{ duration: 1.5, delay: isOpen ? 3.8 : 0, ease: "easeOut" }}
             className="font-script text-[44px] text-[#B8862D] leading-none drop-shadow-sm flex items-center justify-center"
           >
             November 25,
           </motion.div>

           <motion.div
             initial={{ opacity: 0, scale: 0.95, y: 5 }}
             animate={{ opacity: isOpen ? 1 : 0, scale: isOpen ? 1 : 0.95, y: isOpen ? 0 : 5 }}
             transition={{ duration: 1, delay: isOpen ? 4.8 : 0, ease: "easeOut" }}
             className="font-script text-[44px] text-[#B8862D] leading-none mb-2 drop-shadow-sm flex items-center justify-center"
           >
             2026
           </motion.div>
           
           {/* Floral Ornament Bottom */}
           <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#B8862D" strokeWidth="1" opacity="0.6" className="mt-2 scale-y-[-1]"><path d="M12 22C12 22 20 15.3 20 10.5C20 6.4 16.6 3 12.5 3C10.4 3 8.5 4 7.2 5.5C5.9 4 4 3 1.9 3C-2.2 3 -5.6 6.4 -5.6 10.5C-5.6 15.3 2.4 22 2.4 22H12Z" transform="translate(4.8,0) scale(0.6)"/></svg>
           
        </motion.div>

        {/* Envelope Side and Bottom Flaps (Front Cover) */}
        <div className="absolute inset-0 z-20 pointer-events-none rounded-b-md overflow-hidden">
          <svg viewBox="0 0 320 220" className="w-full h-full drop-shadow-xl" preserveAspectRatio="none">
            {/* Left flap */}
            <path d="M0,0 L160,110 L0,220 Z" fill="#f8f1e3" stroke="#B8862D" strokeWidth="1" strokeOpacity="0.4" />
            {/* Right flap */}
            <path d="M320,0 L160,110 L320,220 Z" fill="#f8f1e3" stroke="#B8862D" strokeWidth="1" strokeOpacity="0.4" />
            {/* Bottom flap */}
            <path d="M0,220 L160,110 L320,220 Z" fill="#f4ebd8" stroke="#B8862D" strokeWidth="1" strokeOpacity="0.5" />
          </svg>
        </div>

        {/* Envelope Top Flap */}
        <motion.div
          className="absolute top-0 left-0 w-full h-[140px] origin-top pointer-events-none"
          style={{ transformStyle: "preserve-3d" }}
          initial={{ rotateX: 0, zIndex: 30 }}
          animate={{ rotateX: isOpen ? 180 : 0, zIndex: isOpen ? 5 : 30 }}
          transition={{ duration: 1.5, delay: isOpen ? 0 : 1.5, ease: "easeInOut" }}
        >
          <svg viewBox="0 0 320 140" className="w-full h-full drop-shadow-[0_2px_6px_rgba(0,0,0,0.15)]" preserveAspectRatio="none">
             <path d="M0,0 L160,135 L320,0 Z" fill="#FAF6ED" stroke="#B8862D" strokeWidth="1" strokeOpacity="0.6" />
          </svg>
        </motion.div>

        {/* Wax Seal and Text */}
        <AnimatePresence>
          {!isOpen && (
            <motion.div 
              className="absolute top-[135px] left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 flex flex-col items-center"
              initial={{ opacity: hasOpened ? 0 : 1, scale: hasOpened ? 1.2 : 1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2, filter: "brightness(2)" }}
              transition={{ duration: 0.5, delay: hasOpened && !isOpen ? 2.8 : 0 }}
            >
              {/* Wax Seal */}
              <div className="relative w-[52px] h-[52px] rounded-full bg-gradient-to-br from-[#8a1c1c] to-[#4a0909] shadow-[0_4px_10px_rgba(0,0,0,0.4)] flex items-center justify-center border border-[#5a1010] transform transition-transform group-hover:scale-105">
                 <div className="absolute inset-1 rounded-full border border-[#B8862D]/40"></div>
                 <span className="font-script text-[22px] text-[#D8B96A] drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)] pt-1">S&P</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Reveal Text */}
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 w-full text-center pointer-events-none"
              initial={{ opacity: hasOpened ? 0 : 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, delay: hasOpened && !isOpen ? 2.8 : 0 }}
            >
              <p className="text-[10px] tracking-[0.3em] font-bold text-[#76552C] uppercase drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)] animate-pulse">
                Reveal Your Date
              </p>
            </motion.div>
          )}
        </AnimatePresence>
        {/* Close Button */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="absolute bottom-2 right-2 z-50 flex items-center justify-center cursor-pointer bg-white/60 hover:bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#B8862D]/40 shadow-md transition-colors"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: 1.5, duration: 0.8, ease: "backOut" }}
              onClick={handleClose}
            >
              <span className="text-[9px] tracking-[0.1em] font-bold text-[#5C4524] uppercase flex items-center gap-1">
                Close <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
