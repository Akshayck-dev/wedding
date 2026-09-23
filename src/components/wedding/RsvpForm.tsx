import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, Minus, Plus, Loader2 } from "lucide-react";
import { Reveal } from "./Reveal";

// Google Apps Script Web App URL for submitting RSVP responses to Google Sheets
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwDQlQlnrGmOqnq1L6L2IjDGIM5afs_6pd3casKTbrEIY3uGlSysaoxFTys2xM99hW3Pw/exec";

export function RsvpForm() {
  const [selection, setSelection] = useState<"yes" | "no" | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [guests, setGuests] = useState(1);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const resetForm = () => {
    setSelection(null);
    setSubmitted(false);
    setIsSubmitting(false);
    setGuests(1);
    setName("");
    setMessage("");
  };

  const handleGuestChange = (change: number) => {
    setGuests((prev) => Math.max(1, Math.min(10, prev + change)));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) return;

    setIsSubmitting(true);

    try {
      if (GOOGLE_SCRIPT_URL !== "YOUR_GOOGLE_SCRIPT_URL_HERE") {
        // Send data to Google Apps Script
        const formData = new FormData();
        formData.append("timestamp", new Date().toLocaleString());
        formData.append("name", name);
        formData.append("attending", selection === "yes" ? "Yes" : "No");
        formData.append("guests", selection === "yes" ? guests.toString() : "0");
        formData.append("message", message);

        await fetch(GOOGLE_SCRIPT_URL, {
          method: "POST",
          body: formData,
          mode: "no-cors" // Important for Google Apps Script
        });
      }
      
      // Simulate network delay if URL is not set
      if (GOOGLE_SCRIPT_URL === "YOUR_GOOGLE_SCRIPT_URL_HERE") {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      setSubmitted(true);
    } catch (error) {
      console.error("Failed to submit RSVP", error);
      setSubmitted(true); 
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col items-center text-center px-4">


      <Reveal>
        <h2 className="font-serif-display text-3xl sm:text-4xl tracking-[0.15em] uppercase text-gold font-bold mb-4">
          Kindly RSVP
        </h2>
        <p className="text-sm sm:text-base text-ivory/80 max-w-xs mx-auto mb-10 leading-relaxed font-serif italic">
          Your presence would make our celebration even more special.
        </p>
      </Reveal>

      <AnimatePresence mode="wait">
        {!submitted ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="w-full flex flex-col items-center"
          >
            <p className="text-[10px] tracking-[0.25em] text-gold uppercase font-bold mb-6">
              Will you be joining us?
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center mb-8">
              <button
                onClick={() => setSelection("yes")}
                className={`px-6 py-3.5 rounded-full border text-[11px] font-bold tracking-[0.15em] uppercase transition-all duration-300 shadow-md ${
                  selection === "yes"
                    ? "border-gold bg-gold text-maroon shadow-gold/20"
                    : "border-gold/40 bg-maroon text-ivory hover:border-gold hover:bg-maroon-deep"
                }`}
              >
                Yes, I'll be there 🥰
              </button>
              <button
                onClick={() => setSelection("no")}
                className={`px-6 py-3.5 rounded-full border text-[11px] font-bold tracking-[0.15em] uppercase transition-all duration-300 shadow-md ${
                  selection === "no"
                    ? "border-gold bg-gold text-maroon shadow-gold/20"
                    : "border-gold/40 bg-maroon text-ivory hover:border-gold hover:bg-maroon-deep"
                }`}
              >
                Sorry, can't make it 🙁
              </button>
            </div>

            <AnimatePresence>
              {selection && (
                <motion.form
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  onSubmit={handleSubmit}
                  className="w-full max-w-sm flex flex-col gap-6 overflow-hidden"
                >
                  <div className="flex flex-col text-left">
                    <label className="text-[10px] tracking-[0.2em] text-gold/80 uppercase font-bold mb-2 ml-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your name"
                      className="w-full bg-transparent border-b border-gold/40 px-2 py-2 text-ivory placeholder-ivory/30 focus:outline-none focus:border-gold transition-colors text-sm"
                    />
                  </div>

                  {selection === "yes" && (
                    <div className="flex flex-col text-left">
                      <label className="text-[10px] tracking-[0.2em] text-gold/80 uppercase font-bold mb-3 ml-1">
                        Number of Guests
                      </label>
                      <div className="flex items-center justify-between border border-gold/40 rounded-full px-4 py-2 w-32 bg-maroon-deep">
                        <button
                          type="button"
                          onClick={() => handleGuestChange(-1)}
                          className="text-gold hover:text-ivory transition-colors p-1"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="text-ivory font-semibold text-sm">{guests}</span>
                        <button
                          type="button"
                          onClick={() => handleGuestChange(1)}
                          className="text-gold hover:text-ivory transition-colors p-1"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col text-left">
                    <label className="text-[10px] tracking-[0.2em] text-gold/80 uppercase font-bold mb-2 ml-1">
                      Optional Message
                    </label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Leave a message"
                      rows={2}
                      className="w-full bg-transparent border-b border-gold/40 px-2 py-2 text-ivory placeholder-ivory/30 focus:outline-none focus:border-gold transition-colors text-sm resize-none"
                    />
                  </div>

                  <div className="mt-4 mb-2 flex justify-center">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center justify-center rounded-full bg-gold px-8 py-3.5 text-[11px] font-bold tracking-[0.2em] text-maroon uppercase shadow-lg shadow-gold/10 hover:bg-gold-soft hover:-translate-y-0.5 transition-all duration-300 w-full sm:w-auto disabled:opacity-70 disabled:hover:translate-y-0"
                    >
                      {isSubmitting ? (
                        <Loader2 size={16} className="animate-spin text-maroon" />
                      ) : (
                        selection === "yes" ? "Confirm RSVP" : "Send"
                      )}
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full flex flex-col items-center py-6"
          >
            {selection === "yes" ? (
              <>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="mb-4 text-gold"
                >
                  <Sparkles size={32} />
                </motion.div>
                <h3 className="font-serif-display text-2xl sm:text-3xl text-gold font-bold mb-4 uppercase tracking-[0.1em]">
                  Thank You! 🥰
                </h3>
                <p className="text-ivory/90 font-serif italic text-sm sm:text-base max-w-sm mb-8 leading-relaxed">
                  We’re so happy to have you with us!
                  <br /><br />
                  Your presence will make our celebration<br />even more special.
                  <br /><br />
                  Can’t wait to celebrate together! ✨
                </p>
              </>
            ) : (
              <>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.8, type: "spring" }}
                  className="mb-4 text-gold/80"
                >
                  <Heart size={28} fill="currentColor" className="opacity-80" />
                </motion.div>
                <h3 className="font-serif-display text-2xl sm:text-3xl text-gold/90 font-bold mb-4 uppercase tracking-[0.1em]">
                  We'll miss you! 🙁
                </h3>
                <p className="text-ivory/80 font-serif italic text-sm sm:text-base max-w-sm mb-8 leading-relaxed">
                  We’re sorry you won’t be able to join us.
                  <br /><br />
                  Your love and blessings will always be<br />special to us. ❤️
                  <br /><br />
                  Sending you our warmest wishes!
                </p>
              </>
            )}

          </motion.div>
        )}
      </AnimatePresence>


    </div>
  );
}
