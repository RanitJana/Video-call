// react and redux
import React, { useState, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";

// utility
import { getUserMedia } from "../service/getMedia.js";
import peerService from "../service/peer.js";

// hooks
import useDetectMediaState from "../hooks/useDetectMediaState.js";
import useMediaToggle from "../hooks/useMediaToogle.js";

// components
import Meet from "./Meet.jsx";
import NavBar from "../components/Navbar/NavBar.jsx";
import ButtonCustom from "../components/Button/ButtonCustom.jsx";
import Button from "../components/Button/ButtonCustom.jsx";
import MeetUser from "../components/MeetUser/MeetUser.jsx";

// icons
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import VideocamOffOutlinedIcon from "@mui/icons-material/VideocamOffOutlined";

function ReadyMeet() {
  // auth info
  const auth = useSelector((state) => state.auth);

  //ready to join meeting
  const [isReady, setIsReady] = useState(false);

  //peer management
  const [peer, setPeer] = useState(null);

  //my info and streams
  const [myInfo, setMyInfo] = useState({
    info: auth.data,
    stream: null,
    isAudioEnabled: false,
    isVideoEnabled: false,
  });

  //utility methods
  const { detectAudioState, detectVideoState } = useDetectMediaState(myInfo);
  const { toggleAudio, toggleVideo } = useMediaToggle(myInfo, setMyInfo, peer);

  //function to apture initial stream
  const handleInitialStream = useCallback(async () => {
    try {
      const stream = await getUserMedia(true, true);

      setMyInfo((prev) => ({
        ...prev,
        stream,
        isAudioEnabled: true,
        isVideoEnabled: true,
      }));
    } catch (error) {
      console.log(error);
    }
  }, [setMyInfo]);

  //function to add user to the meeting
  const handleJoin = useCallback(async () => {
    try {
      const myStream = myInfo.stream;

      //crate a new RTC peer connection
      const newPeer = new peerService();
      setPeer(newPeer);

      if (!myStream) return;

      const videoTrack = myStream.getVideoTracks()[0];

      const videoSender = newPeer.peer
        .getSenders()
        .find((sender) => sender.track && sender.track.kind === "video");

      if (videoSender) await videoSender.replaceTrack(videoTrack);
      else
        myStream.getTracks().forEach((track) => {
          newPeer.peer.addTrack(track, myStream);
        });

      setIsReady(true);
    } catch (error) {
      console.log(error);
    }
  }, [myInfo.stream]);

  //invoke at initial render
  useEffect(() => {
    handleInitialStream();
  }, [handleInitialStream]);

  return (
    <>
      {isReady ? (
        <Meet
          auth={auth}
          peer={peer}
          setPeer={setPeer}
          myInfo={myInfo}
          setMyInfo={setMyInfo}
        />
      ) : (
        <div className="min-h-dvh max-h-dvh h-full w-full flex flex-col">
          <NavBar />
          <div className="flex flex-col items-center justify-center gap-4 w-full p-4 flex-1">
            <div className="w-full max-w-[30rem] aspect-video relative flex justify-center items-center">
              <MeetUser peer={myInfo} />
              <div className="absolute bottom-1 flex gap-4 p-1">
                {/* audio */}
                <Button
                  onClick={toggleAudio}
                  backgroundColor={"transparent"}
                  style={{
                    minWidth: "0",
                    minHeight: "0",
                    width: "3rem",
                    height: "3rem",
                    backgroundColor: "rgba(0,0,0,.5)",
                    border: "1px solid white",
                  }}
                >
                  {detectAudioState() ? <MicIcon /> : <MicOffIcon />}
                </Button>
                {/* video */}
                <Button
                  onClick={toggleVideo}
                  backgroundColor={"transparent"}
                  style={{
                    minWidth: "0",
                    minHeight: "0",
                    width: "3rem",
                    height: "3rem",
                    backgroundColor: "rgba(0,0,0,.5)",
                    border: "1px solid white",
                  }}
                >
                  {detectVideoState() ? (
                    <VideocamOutlinedIcon />
                  ) : (
                    <VideocamOffOutlinedIcon />
                  )}
                </Button>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center gap-4">
              <span className="text-2xl text-gray-800">Ready to join?</span>
              <ButtonCustom
                onClick={handleJoin}
                style={{
                  width: "10rem",
                  textTransform: "lowercase",
                }}
                backgroundColor={"#2C82FA"}
              >
                Join now
              </ButtonCustom>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ReadyMeet;
