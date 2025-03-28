import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Button from "../Button/ButtonCustom.jsx";
import GetDate from "../GetDate/GateDate.jsx";
import MeetEmoji from "../MeetEmoji/MeetEmoji.jsx";
import useMediaToggle from "../../hooks/useMediaToogle.js";
import useDetectMediaState from "../../hooks/useDetectMediaState.js";
import useShareScreen from "../../hooks/useShareScreen.js";
import { toggleDrawer } from "../../features/drawerOpen/drawer.slice.js";
import MeetingInfo from "../MeetingInof/MeetingInfo.jsx";

import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import PresentToAllIcon from "@mui/icons-material/PresentToAll";
import CallEndIcon from "@mui/icons-material/CallEnd";
import InfoIcon from "@mui/icons-material/Info";
import ChatIcon from "@mui/icons-material/Chat";
import MeetingMessages from "../MeetingMessages/MeetingMessages.jsx";

import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

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

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [smallScreen, setSmallScreen] = useState(false);

  useEffect(() => {
    const handleScreenSize = () => {
      if (window.innerWidth <= 564) setSmallScreen(true);
      else setSmallScreen(false);
    };
    handleScreenSize();

    window.addEventListener("resize", handleScreenSize);
    return () => window.removeEventListener("resize", handleScreenSize);
  }, []);

  return (
    <div className="flex gap-4 w-full pt-4">
      {!smallScreen && (
        <div className="flex justify-start items-center w-full text-white font-bold text-nowrap overflow-hidden">
          <GetDate />
        </div>
      )}
      <div className="flex justify-center items-center gap-2 w-full">
        {/* audio */}
        <Button
          onClick={toggleAudio}
          backgroundColor={!detectAudioState() ? "#B33D23" : null}
        >
          {detectAudioState() ? <MicIcon /> : <MicOffIcon />}
        </Button>
        {/* video */}
        <Button
          onClick={toggleVideo}
          backgroundColor={!detectVideoState() ? "#B33D23" : null}
        >
          {detectVideoState() ? <VideocamIcon /> : <VideocamOffIcon />}
        </Button>
        <div className="relative">
          <MeetEmoji emojiOpen={emojiOpen} />
          {/* emoji */}

          <Button
            onClick={() => setEmojiOpen((prev) => !prev)}
            backgroundColor={emojiOpen ? "purple" : null}
          >
            {<EmojiEmotionsIcon />}
          </Button>
        </div>
        {/* share screen */}
        <Button onClick={shareScreen}>
          <PresentToAllIcon />
        </Button>
        {/* call end */}
        <Button onClick={() => {}} backgroundColor={"#DD402F"}>
          <CallEndIcon />
        </Button>
      </div>

      <div className="relative flex justify-end items-center w-full">
        <SpeedDial
          ariaLabel="SpeedDial openIcon example"
          sx={{
            position: "absolute",
            bottom: 0,
            right: 0,
            "& .MuiFab-root": { boxShadow: "none" },
          }}
          onClose={handleClose}
          onOpen={handleOpen}
          open={open}
          icon={
            open ? (
              <KeyboardArrowDownIcon
                style={{
                  backgroundColor: "#333436",
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  padding: "0.8rem",
                }}
              />
            ) : (
              <KeyboardArrowUpIcon
                style={{
                  backgroundColor: "#333436",
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  padding: "0.8rem",
                }}
              />
            )
          }
        >
          <SpeedDialAction
            icon={<InfoIcon style={{ color: "white" }} />}
            sx={{
              backgroundColor: "#333436",
              "&:hover": { backgroundColor: "#333436" },
            }}
            onClick={() => {
              dispatch(toggleDrawer(0));
              setDrawerHeading("Meeting details");
              setDrawerChild(<MeetingInfo />);
              setOpen(false);
            }}
          />

          <SpeedDialAction
            icon={<ChatIcon style={{ color: "white" }} />}
            sx={{
              backgroundColor: "#333436",
              "&:hover": { backgroundColor: "#333436" },
            }}
            onClick={() => {
              dispatch(toggleDrawer(1));
              setDrawerHeading("In-call messages");
              setDrawerChild(<MeetingMessages />);
              setOpen(false);
            }}
          />
        </SpeedDial>
      </div>
    </div>
  );
}

export default MeetingControls;
