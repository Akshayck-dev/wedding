import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const target = new Date("2026-11-25T12:00:00+05:30").getTime();

function diff() {
  const d = Math.max(0, target - Date.now());
  return {
    days: Math.floor(d / 86400000),
    hours: Math.floor((d / 3600000) % 24),
    minutes: Math.floor((d / 60000) % 60),
    seconds: Math.floor((d / 1000) % 60),
  };
}

export function Countdown() {
  const [t, setT] = useState(() => {
    if (typeof window === "undefined") return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return diff();
  });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const id = setInterval(() => setT(diff()), 1000);
    return () => clearInterval(id);
  }, []);

  const items = [
    { label: "DAYS", value: t.days },
    { label: "HRS", value: t.hours },
    { label: "MIN", value: t.minutes },
    { label: "SEC", value: t.seconds },
  ];

  if (!isMounted) return null;

  return (
    <div className="flex justify-center items-center w-full max-w-[420px] mx-auto px-1 sm:px-0">
      <div className="flex w-full justify-between items-center gap-2 sm:gap-3">
        {items.map((it) => (
          <div key={it.label} className="flex flex-col items-center flex-1 bg-[#FFF8E7] border border-[#E7C66A]/50 rounded-xl shadow-[0_8px_16px_rgba(0,0,0,0.15)] py-4 sm:py-5 relative overflow-hidden shrink-0">
            {/* Subtle inner highlight */}
            <div className="absolute inset-0 rounded-xl border-[0.5px] border-white/60 pointer-events-none"></div>
            
            {/* Value */}
            <div className="relative h-10 sm:h-12 w-full overflow-hidden flex justify-center items-center mb-[2px] sm:mb-1">
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={it.value}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="absolute font-serif text-[28px] sm:text-[34px] text-[#4A0715] tabular-nums leading-none tracking-tight font-medium"
                >
                  {String(it.value).padStart(2, "0")}
                </motion.div>
              </AnimatePresence>
            </div>
            
            {/* Tiny ornament divider */}
            <div className="flex items-center gap-[2px] opacity-60 mb-2">
              <div className="w-[6px] sm:w-[8px] h-[1px] bg-[#E7C66A]"></div>
              <div className="w-1 h-1 bg-[#E7C66A] rotate-45"></div>
              <div className="w-[6px] sm:w-[8px] h-[1px] bg-[#E7C66A]"></div>
            </div>

            {/* Label */}
            <div className="text-[9px] sm:text-[10px] tracking-[0.2em] text-[#8B7D6B] uppercase font-medium">
              {it.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
