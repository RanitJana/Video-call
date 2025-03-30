import React, { useState, useCallback, useEffect } from "react";
import { getUserMedia } from "../service/getMedia.js";
import { useSelector } from "react-redux";
import Meet from "./Meet.jsx";
import VideoComponent from "../components/VideoContainer/VideoContainer.jsx";
import NavBar from "../components/Navbar/NavBar.jsx";
import ButtonCustom from "../components/Button/ButtonCustom.jsx";
import peerService from "../service/peer.js";
import useDetectMediaState from "../hooks/useDetectMediaState.js";
import useMediaToggle from "../hooks/useMediaToogle.js";
import Button from "../components/Button/ButtonCustom.jsx";

import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import VideocamOffOutlinedIcon from "@mui/icons-material/VideocamOffOutlined";

function ReadyMeet() {
  const auth = useSelector((state) => state.auth);

  const [isReady, setIsReady] = useState(false);

  //peer management
  const [peer, setPeer] = useState(null);

  //user info and streams
  const [myInfo, setMyInfo] = useState({
    info: auth.data,
    stream: null,
    isAudioEnabled: false,
    isVideoEnabled: false,
  });

  const { detectAudioState, detectVideoState } = useDetectMediaState(myInfo);
  const { toggleAudio, toggleVideo } = useMediaToggle(myInfo, setMyInfo, peer);

  const handleInitialStream = useCallback(async () => {
    try {
      const stream = await getUserMedia(true, true);
      setMyInfo((prev) => ({
        ...prev,
        stream,
        isAudioEnabled: true,
        isVideoEnabled: true,
      }));
      setPeer(new peerService());
    } catch (error) {
      console.log(error);
    }
  }, [setMyInfo]);

  useEffect(() => {
    handleInitialStream();
  }, [handleInitialStream]);

  const handleJoin = useCallback(async () => {
    try {
      const myStream = myInfo.stream;
      if (!myStream || !peer) return;

      const videoTrack = myStream.getVideoTracks()[0];

      const videoSender = peer.peer
        .getSenders()
        .find((sender) => sender.track && sender.track.kind === "video");

      if (videoSender) await videoSender.replaceTrack(videoTrack);
      else
        myStream.getTracks().forEach((track) => {
          peer.peer.addTrack(track, myStream);
        });

      setIsReady(true);
    } catch (error) {
      console.log(error);
    }
  }, [myInfo.stream, peer]);

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
            <div className="w-full max-w-[30rem] aspect-video relative bg-background-meet-single-use rounded-md flex justify-center items-center">
              {myInfo.isVideoEnabled && (
                <VideoComponent stream={myInfo.stream} />
              )}
              <div
                className="w-[80%] max-w-[8rem] aspect-square rounded-full overflow-hidden"
                style={{
                  background: `#6a7282 url(${
                    myInfo.info?.avatar || ""
                  }) no-repeat center/cover`,
                }}
              ></div>
              <div className="absolute bottom-1 flex gap-4 p-1">
                {/* audio */}
                <Button
                  onClick={toggleAudio}
                  backgroundColor={"transparent"}
                  style={{
                    minWidth: "0",
                    width: "3.5rem",
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
                    width: "3.5rem",
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
                  // fontSize: "0.4rem",
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
