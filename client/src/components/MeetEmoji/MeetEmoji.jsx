import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { useSocketContext } from "../../context/SocketContext.jsx";
import { useSearchParams } from "react-router";

function MeetEmoji({ emojiOpen = false }) {
  const auth = useSelector((state) => state.auth);
  const { socket } = useSocketContext();

  const params = useSearchParams()[0];
  const roomId = params.get("id");

  const emojies = ["💖", "👍", "🎉", "👏", "😂", "😮", "😢", "🤔", "👎"];

  const useEmojiThrottle = () => {
    const prevTimeRef = useRef(0);
    const delay = 1000;

    return (emoji) => {
      console.log("clicked");
      
      if (Date.now() - prevTimeRef.current > delay) {
        prevTimeRef.current = Date.now();
        const sender = auth.data.name;
        socket.emit("room:emoji:fire", { to: roomId, sender, emoji });
      }
    };
  };

  const sendEmoji = useEmojiThrottle();

  return (
    <div
      className="absolute top-0 left-[50%] translate-x-[-50%] translate-y-[-120%] bg-[rgb(51,53,55)] px-3 py-1 rounded-2xl transition-all"
      style={{
        scale: emojiOpen ? "1" : "0",
      }}
    >
      <div className="flex justify-between items-center">
        {emojies.map((emoji, idx) => {
          return (
            <button
              key={idx + emoji}
              onClick={() => sendEmoji(emoji)}
              className="text-2xl hover:cursor-pointer hover:bg-gray-700 p-1 rounded-full h-full aspect-square transition-all"
            >
              {emoji}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default MeetEmoji;
