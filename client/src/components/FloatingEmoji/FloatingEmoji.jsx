import React from "react";
import { useSelector } from "react-redux";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

function FloatingEmoji() {
  const emojis = useSelector((state) => state.floatingEmoji);

  return (
    <div className="absolute z-10 bottom-0 left-0 w-full h-screen pointer-events-none">
      <AnimatePresence>
        {emojis.map((emoji, idx) => {
          const randomX = Math.random() * 200 - 100; // Random horizontal offset

          return (
            <motion.div
              key={idx}
              initial={{
                y: "90vh",
                x: randomX,
                opacity: 1,
              }}
              animate={{
                y: "10vh",
                opacity: [1, 0.5, 0], // Stays visible, then fades out
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 4,
                ease: "easeOut",
                opacity: { delay: 1, duration: 1 }, // Opacity fades after 2s
              }}
              className="absolute left-1/2 translate-x-[-50%] text-3xl"
            >
              <div className="flex flex-col items-center">
                <span>{emoji.emoji}</span>
                <span className="text-xs text-white py-1 px-2 rounded-md bg-[rgba(0,0,0,0.77)]">
                  {emoji.sender}
                </span>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

export default FloatingEmoji;
