import React, { useState } from "react";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import { useSearchParams } from "react-router";
import { useSocketContext } from "../../context/SocketContext.jsx";
import { useSelector } from "react-redux";
function MeetingMessages() {
  const { socket } = useSocketContext();

  const messages = useSelector((state) => state.messages);
  const auth = useSelector((state) => state.auth);

  const [text, setText] = useState("");

  const params = useSearchParams()[0];
  const roomId = params.get("id");

  const handleSendMessage = () => {
    if (!text) return;
    const { name, _id } = auth.data;
    const info = {
      sender: {
        name,
        id: _id,
      },
      message: text,
      time: Date.now(),
    };
    setText("");
    socket.emit("send:message", { to: roomId, info });
  };

  return (
    <div className="h-full flex flex-col gap-4 pt-4">
      <p className="text-pretty text-[0.7rem] text-gray-800 bg-[#F1F3F4] p-3 text-center rounded-md">
        You can pin message to make it visible for people who join later. When
        you leave the call, you won't be able to access this chat.
      </p>
      <div className="grow relative">
        <div className="absolute top-0 left-0 h-full w-full overflow-auto flex flex-col gap-2">
          {messages.map((info, idx) => {
            const formattedTime = new Date(info.time)
              .toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
              })
              .toString()
              .toLowerCase();
            return (
              <div key={info.sender.id + idx} className="text-sm">
                <div className="mb-1">
                  <span className="font-bold text-gray-800 pr-2">
                    {info.sender.name}
                  </span>
                  <span className="text-gray-700">{formattedTime}</span>
                </div>
                <p className="max-w-full text-wrap break-words text-gray-800">
                  {info.message}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="bg-[#F1F3F4] flex rounded-[20px] pl-2 align-bottom">
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          style={{
            fontSize: "0.9rem",
          }}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="send a message to everyone"
          inputProps={{ "aria-label": "send a message to everyone" }}
        />
        <IconButton
          onClick={handleSendMessage}
          type="button"
          sx={{ p: "10px" }}
          aria-label="send"
          style={{
            color: text.length > 0 ? "#0D57D1" : "",
          }}
        >
          <SendIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default MeetingMessages;
