import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import spLogo from "@/assets/SP Logo.png";

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
    <div className="w-full max-w-[340px] bg-[#FAF6ED] rounded-[24px] shadow-[0_20px_50px_rgba(0,0,0,0.2)] flex flex-col items-center py-12 px-8 mx-auto relative overflow-hidden border border-[#D8B96A]/30">
      {/* Title */}
      <h2 className="font-script text-[42px] text-[#A85038] mb-4 drop-shadow-sm">Save the Date</h2>
      
      {/* Divider */}
      <div className="flex items-center gap-4 mb-6 w-full max-w-[200px] opacity-80">
        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#D8B96A] to-[#D8B96A]"></div>
        <img src={spLogo} alt="Logo" className="w-4 h-4 object-contain brightness-75" />
        <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#D8B96A] to-[#D8B96A]"></div>
      </div>

      <p className="font-serif text-[#5C4524] text-[14px] text-center mb-8 opacity-80 leading-relaxed max-w-[220px]">
        A moment, waiting to be uncovered
      </p>

      {/* Inner Box */}
      <div 
        className={`relative w-full aspect-[4/3] bg-[#F4EBE0]/80 rounded-[24px] overflow-hidden transition-shadow duration-500 border border-[#D8B96A]/20 ${!isRevealed ? "cursor-pointer hover:shadow-md" : "shadow-inner"}`} 
        onClick={handleReveal}
      >
        <AnimatePresence mode="wait">
          {!isRevealed ? (
            <motion.div
              key="unrevealed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
            >
              <div className="w-[60px] h-[60px] rounded-full border border-[#D8B96A]/70 flex items-center justify-center mb-5 shadow-sm bg-[#FAF6ED]/50">
                <img src={spLogo} alt="Logo" className="w-[22px] h-[22px] object-contain opacity-80 brightness-75" />
              </div>
              <span className="font-sans text-[10px] tracking-[0.3em] text-[#5C4524] uppercase font-semibold opacity-80">
                Tap to Reveal
              </span>
            </motion.div>
          ) : (
            <motion.div
              key="revealed"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="absolute inset-0 flex flex-col items-center justify-center px-4"
            >
              <h3 className="font-serif text-[18px] text-[#332A24] mb-2 font-medium tracking-wide">
                Save the Date
              </h3>
              <p className="font-serif text-[16px] text-[#332A24] mb-1">
                Wednesday
              </p>
              <p className="font-serif text-[16px] text-[#332A24] mb-5 tracking-wide">
                November 25<sup className="text-[10px]">th</sup> 2026
              </p>
              <img src={spLogo} alt="Logo" className="w-[18px] h-[18px] object-contain opacity-90 brightness-50" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
