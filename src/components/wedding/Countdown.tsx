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
    <div className="flex justify-center items-center w-full max-w-sm sm:max-w-md mx-auto">
      <div className="flex w-full justify-between items-center w-full px-2">
        {items.map((it, idx) => (
          <div key={it.label} className="flex flex-col items-center flex-1 relative">
            <div className="relative h-10 w-12 overflow-hidden flex justify-center items-center">
              <AnimatePresence>
                <motion.div
                  key={it.value}
                  initial={{ y: -30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 30, opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="absolute font-serif-display text-2xl font-medium text-[#8B1A1A] tabular-nums sm:text-3xl leading-none drop-shadow-sm"
                >
                  {String(it.value).padStart(2, "0")}
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="mt-2 text-[8px] tracking-[0.2em] text-[#A67C43] uppercase font-bold sm:text-[9px]">
              {it.label}
            </div>
            {/* Vertical Divider */}
            {idx < items.length - 1 && (
              <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-[1px] h-2/3 bg-[#B8862D]/30"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
