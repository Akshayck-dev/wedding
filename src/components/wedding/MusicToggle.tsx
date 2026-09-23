import { useEffect, useRef, useState } from "react";
import { Music2, VolumeX } from "lucide-react";

const SRC = "/RHTDM-Rain-Theme.mp3";

export function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const a = new Audio(SRC);
    a.loop = true;
    a.volume = 0.35;
    audioRef.current = a;

    // Start music when the user taps "Enter" on the splash screen
    const handleEnter = () => {
      a.play()
        .then(() => setPlaying(true))
        .catch(() => {});
    };

    document.addEventListener("wedding:enter", handleEnter);

    return () => {
      a.pause();
      audioRef.current = null;
      document.removeEventListener("wedding:enter", handleEnter);
    };
  }, []);

  function toggle() {
    const a = audioRef.current;
    if (!a) return;
    if (playing) {
      a.pause();
      setPlaying(false);
    } else {
      a.play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));
    }
  }

  return (
    <button
      onClick={toggle}
      aria-label={playing ? "Pause music" : "Play music"}
      title={playing ? "Click to mute music" : "Click to play music"}
      className="fixed right-4 bottom-4 z-40 flex h-10 w-10 items-center justify-center rounded-full bg-[#5A3A3A]/80 backdrop-blur-md border border-[#D4AF37]/30 text-[#D4AF37] shadow-[0_4px_12px_rgba(0,0,0,0.3)] transition hover:scale-105 sm:right-6 sm:bottom-6 sm:h-12 sm:w-12"
    >
      {playing ? (
        <span className="relative flex h-full w-full items-center justify-center">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#D4AF37]/20 opacity-75"></span>
          <Music2 size={16} className="relative" />
        </span>
      ) : (
        <VolumeX size={16} />
      )}
    </button>
  );
}
