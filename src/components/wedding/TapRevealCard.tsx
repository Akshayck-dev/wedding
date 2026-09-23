import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function TapRevealCard({ 
  onOpenStart, 
  onReveal 
}: { 
  onOpenStart?: () => void;
  onReveal?: () => void;
}) {
  const [isRevealed, setIsRevealed] = useState(false);

  const handleReveal = () => {
    if (isRevealed) return;
    setIsRevealed(true);
    if (onOpenStart) onOpenStart();
    setTimeout(() => {
      if (onReveal) onReveal();
    }, 1000);
  };

  return (
    <div className="w-full max-w-[340px] bg-[#FFF8E7] rounded-[24px] shadow-[0_15px_40px_rgba(0,0,0,0.12)] flex flex-col items-center py-10 px-6 mx-auto relative overflow-hidden border border-[#E7C66A]/40">
      
      {/* Top Floral Symbol */}
      <div className="mb-3 opacity-90 mt-1">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E7C66A" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22v-7" />
          <path d="M12 15c-2-1-3-2-3-4 0-1 1-2 2-2" />
          <path d="M12 15c2-1 3-2 3-4 0-1-1-2-2-2" />
          <circle cx="12" cy="7" r="1.5" fill="#E7C66A" stroke="none" />
          <circle cx="9" cy="6" r="1" fill="#E7C66A" stroke="none" />
          <circle cx="15" cy="6" r="1" fill="#E7C66A" stroke="none" />
        </svg>
      </div>

      {/* Title */}
      <h2 className="font-script text-[46px] text-[#4A0715] mb-3 leading-none drop-shadow-sm">Save the Date</h2>
      
      {/* Divider */}
      <div className="flex items-center gap-4 mb-6 w-full max-w-[180px] opacity-80">
        <div className="h-[1px] flex-1 bg-[#E7C66A]/60"></div>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#E7C66A" strokeWidth="1.5">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
        <div className="h-[1px] flex-1 bg-[#E7C66A]/60"></div>
      </div>

      {/* Text */}
      <p className="font-serif text-[#8B7D6B] text-[15px] text-center mb-8 opacity-90 leading-relaxed max-w-[220px]">
        A moment, waiting to be uncovered
      </p>

      {/* Inner Box */}
      <div 
        className={`relative w-full h-[120px] bg-[#FFFBF2] rounded-[16px] overflow-hidden transition-all duration-700 ease-in-out border-[0.5px] border-[#E7C66A]/50 ${!isRevealed ? "cursor-pointer hover:shadow-md shadow-sm" : "shadow-inner bg-[#FDF8EE]"}`} 
        onClick={handleReveal}
      >
        <AnimatePresence mode="wait">
          {!isRevealed ? (
            <motion.div
              key="unrevealed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-4"
            >
              {/* Bottom Left Corner Ornament */}
              <div className="absolute bottom-1 left-2 opacity-40">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#E7C66A" strokeWidth="0.8">
                   <path d="M4 20S8 12 15 9" />
                   <path d="M15 9c-2.5 2.5-2.5 6 0 8.5 2.5-2.5 6-2.5 8.5 0-3.5-5-8.5-8.5-8.5-8.5z" />
                   <path d="M10 14c-1.5 1.5-1.5 3.5 0 5 1.5-1.5 3.5-1.5 5 0-2-3-5-5-5-5z" />
                </svg>
              </div>
              
              {/* Bottom Right Corner Ornament */}
              <div className="absolute bottom-1 right-2 opacity-40" style={{ transform: 'scaleX(-1)' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#E7C66A" strokeWidth="0.8">
                   <path d="M4 20S8 12 15 9" />
                   <path d="M15 9c-2.5 2.5-2.5 6 0 8.5 2.5-2.5 6-2.5 8.5 0-3.5-5-8.5-8.5-8.5-8.5z" />
                   <path d="M10 14c-1.5 1.5-1.5 3.5 0 5 1.5-1.5 3.5-1.5 5 0-2-3-5-5-5-5z" />
                </svg>
              </div>

              {/* Circular Button */}
              <div className="w-[56px] h-[56px] mt-2 rounded-full border-[0.5px] border-[#E7C66A]/80 flex items-center justify-center shadow-[0_4px_12px_rgba(231,198,106,0.15)] bg-[#FFF8E7] z-10 shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E7C66A" strokeWidth="1.2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </div>

              {/* Tap to Reveal */}
              <span className="font-serif text-[11px] tracking-[0.3em] text-[#8B7D6B] uppercase mt-3 opacity-95">
                Tap to Reveal
              </span>
            </motion.div>
          ) : (
            <motion.div
              key="revealed"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="absolute inset-0 flex flex-col items-center justify-center px-4 py-4"
            >
              <h3 className="font-serif text-[16px] text-[#8B7D6B] mb-1 tracking-wide">
                Wednesday
              </h3>
              <p className="font-serif text-[24px] sm:text-[26px] text-[#4A0715] mb-2 tracking-wide font-medium">
                November 25<sup className="text-[12px]">th</sup> 2026
              </p>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#E7C66A" strokeWidth="1.5" className="opacity-80">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
