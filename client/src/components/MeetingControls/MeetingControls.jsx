import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Button from "../Button/ButtonCustom.jsx";
import GetDate from "../GetDate/GateDate.jsx";
import MeetEmoji from "../MeetEmoji/MeetEmoji.jsx";
import useMediaToggle from "../../hooks/useMediaToogle.js";
import useDetectMediaState from "../../hooks/useDetectMediaState.js";
import useShareScreen from "../../hooks/useShareScreen.js";
import MeetingInfo from "../MeetingInof/MeetingInfo.jsx";
import { toggleDrawer } from "../../features/drawerOpen/drawer.slice.js";

import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import VideocamOffOutlinedIcon from "@mui/icons-material/VideocamOffOutlined";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import PresentToAllIcon from "@mui/icons-material/PresentToAll";
import CallEndIcon from "@mui/icons-material/CallEnd";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import MeetingMessages from "../MeetingMessages/MeetingMessages.jsx";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import SwipeableDrawer from "@mui/material/SwipeableDrawer";

function MeetingControls({
  myInfo,
  setMyInfo,
  peer,
  setDrawerHeading,
  setDrawerChild,
}) {
  const [emojiOpen, setEmojiOpen] = useState(false);
  const dispatch = useDispatch();

  const { detectAudioState, detectVideoState } = useDetectMediaState(myInfo);
  const { toggleAudio, toggleVideo } = useMediaToggle(myInfo, setMyInfo, peer);
  const shareScreen = useShareScreen(myInfo, setMyInfo, peer);

  const [smallScreen, setSmallScreen] = useState(false);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    const handleScreenSize = () => {
      if (window.innerWidth <= 564) setSmallScreen(true);
      else setSmallScreen(false);
    };
    handleScreenSize();

    window.addEventListener("resize", handleScreenSize);
    return () => window.removeEventListener("resize", handleScreenSize);
  }, []);

  const toggleMore = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setIsDrawerOpen(open);
  };

  return (
    <div className="flex gap-4 w-full pt-4 justify-center relative">
      {!smallScreen && (
        <div className="absolute left-0 top-[50%] flex justify-start items-center w-full text-white font-bold text-nowrap overflow-hidden">
          <GetDate />
        </div>
      )}
      <div className="flex justify-center items-center gap-[0.3rem] w-full">
        {/* audio */}
        <Button
          onClick={toggleAudio}
          backgroundColor={!detectAudioState() ? "#B33D23" : null}
          style={{
            minWidth: "0",
            width: "3.5rem",
          }}
        >
          {detectAudioState() ? <MicIcon /> : <MicOffIcon />}
        </Button>
        {/* video */}
        <Button
          onClick={toggleVideo}
          backgroundColor={!detectVideoState() ? "#B33D23" : null}
          style={{
            minWidth: "0",
            width: "3.5rem",
          }}
        >
          {detectVideoState() ? (
            <VideocamOutlinedIcon />
          ) : (
            <VideocamOffOutlinedIcon />
          )}
        </Button>
        {/* emoji */}
        <div className="relative">
          <MeetEmoji emojiOpen={emojiOpen} />
          <Button
            onClick={() => setEmojiOpen((prev) => !prev)}
            backgroundColor={emojiOpen ? "purple" : null}
            style={{
              minWidth: "0",
              width: "3.5rem",
            }}
          >
            <EmojiEmotionsOutlinedIcon />
          </Button>
        </div>
        {/* more */}
        <Button
          style={{
            minWidth: "0",
            paddingLeft: "5px",
            paddingRight: "5px",
          }}
          onClick={() => setIsDrawerOpen((prev) => !prev)}
        >
          <MoreVertIcon />
        </Button>
        {/* more options */}
        <SwipeableDrawer
          anchor={"bottom"}
          open={isDrawerOpen}
          onClose={toggleMore(false)}
          onOpen={toggleMore(true)}
          sx={{
            "& .MuiPaper-root": {
              backgroundColor: "#202124",
              padding: "1rem",
              width: "18rem", // Set width to 80% or adjust as needed
              margin: "0 auto",
              borderRadius: "20px 20px 0 0",
            },
          }}
        >
          <div className="grid grid-cols-2 gap-2">
            {/* meeting info */}
            <div className="flex justify-center items-center flex-col w-full">
              <Button
                style={{
                  backgroundColor: "transparent",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                  textWrap: "wrap",
                  textAlign: "center",
                  width: "100%",
                  height: "100%",
                }}
                onClick={() => {
                  dispatch(toggleDrawer(0));
                  setIsDrawerOpen(false);
                  setDrawerHeading("Meeting details");
                  setDrawerChild(<MeetingInfo />);
                }}
              >
                <InfoOutlinedIcon style={{ color: "white" }} />
                <span className="text-xs">Meeting Info</span>
              </Button>
            </div>
            {/* share screen */}
            <div className="flex justify-center items-center flex-col w-full">
              <Button
                onClick={() => {
                  shareScreen();
                  setIsDrawerOpen(false);
                }}
                style={{
                  backgroundColor: "transparent",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                  textWrap: "wrap",
                  textAlign: "center",
                  width: "100%",
                  height: "100%",
                }}
              >
                <PresentToAllIcon />
                <span className="text-xs">Share screen</span>
              </Button>
            </div>
            {/* meeting chat */}
            <div className="flex justify-center items-center flex-col w-full">
              <Button
                style={{
                  backgroundColor: "transparent",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                  textWrap: "wrap",
                  textAlign: "center",
                  width: "100%",
                  height: "100%",
                }}
                onClick={() => {
                  dispatch(toggleDrawer(1));
                  setIsDrawerOpen(false);
                  setDrawerHeading("In-call messages");
                  setDrawerChild(<MeetingMessages />);
                }}
              >
                <ChatOutlinedIcon style={{ color: "white" }} />
                <span className="text-xs">Messages</span>
              </Button>
            </div>
          </div>
        </SwipeableDrawer>

        <div className="h-[80%] bg-gray-700 w-[2px] mx-1"></div>

        {/* call end */}
        <Button
          onClick={() => {}}
          backgroundColor={"#DD402F"}
          style={{
            minWidth: "0",
            width: "3.5rem",
          }}
        >
          <CallEndIcon />
        </Button>
      </div>
    </div>
  );
}

export default MeetingControls;
