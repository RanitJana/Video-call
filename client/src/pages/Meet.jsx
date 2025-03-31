//react
import { memo, useCallback, useEffect, useMemo, useState } from "react";

//components
import MeetUser from "../components/MeetUser/MeetUser.jsx";
import MeetingControls from "../components/MeetingControls/MeetingControls.jsx";

//redux and router
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router";

//service and context
import peerService from "../service/peer.js";
import { useSocketContext } from "../context/SocketContext.jsx";

//custom hooks
import useICEcandidate from "../hooks/useICEcandidate.js";
import useHandleCallUser from "../hooks/useHandleCallUser.js";
import useHandleIncomingCall from "../hooks/useHandleIncomingCall.js";
import useHandleAccepted from "../hooks/useHandleAccepted.js";
import usePeerEvents from "../hooks/usePeerEvents.js";

//utilities
import socketEventListener from "../utils/socketEventListener.js";
import socketEventRemover from "../utils/socketEventRemover.js";
import FloatingEmoji from "../components/FloatingEmoji/FloatingEmoji.jsx";
import Drawer from "../components/Drawer/Drawer.jsx";
import { addMessage } from "../features/messages/message.slice.js";
import useReceiveEmoji from "../hooks/useReceiveEmoji.js";
import useDeviceWidth from "../hooks/useDeviceWidth.js";

const Meet = memo(({ auth, peer, setPeer, myInfo, setMyInfo }) => {
  //socket info
  const { socket } = useSocketContext();

  //redux
  const dispatch = useDispatch();

  //room info
  const params = useSearchParams()[0];
  const roomId = useMemo(() => params.get("id"), [params]);

  //auth info
  const drawer = useSelector((state) => state.drawer);

  // drawer info
  const [drawerHeading, setDrawerHeading] = useState("");
  const [drawerChild, setDrawerChild] = useState(null);

  //remote user info
  const [otherInfo, setOtherInfo] = useState({
    info: null,
    stream: null,
    isAudioEnabled: false,
    isVideoEnabled: false,
  });

  //join room
  useEffect(() => {
    socket.emit("join:room", { roomId, email: auth.data.email });
  }, [auth.data.email, roomId, socket]);

  useICEcandidate(peer, socket, roomId); //exchange ice-candidates between peers
  usePeerEvents(peer, socket, roomId, auth, setOtherInfo); //listen and set peer event
  const handleCallUser = useHandleCallUser(peer, socket, roomId, auth); //call other user
  const handleIncomingCall = useHandleIncomingCall(
    peer,
    socket,
    auth,
    setOtherInfo
  ); //receive incoming call
  const handleCallAccepted = useHandleAccepted(peer, setOtherInfo); //accepted response to caller

  const handleReset = useCallback(async () => {
    //close previous connection and create a new peer connection
    peer.peer.close();
    const newPeer = new peerService();
    setPeer(newPeer);

    try {
      const myStream = myInfo.stream;

      if (myStream) {
        const videoTrack = myStream.getVideoTracks()[0];

        const videoSender = newPeer.peer
          .getSenders()
          .find((sender) => sender.track && sender.track.kind === "video");

        if (videoSender) await videoSender.replaceTrack(videoTrack);
        else
          myStream.getTracks().forEach((track) => {
            newPeer.peer.addTrack(track, myStream);
          });
      }
    } catch (error) {
      console.log(error);
    }

    setOtherInfo({
      info: null,
      stream: null,
      isAudioEnabled: false,
      isVideoEnabled: false,
    });

    setTimeout(() => {
      handleCallUser();
    }, 500);

    socket.emit("join:room", { roomId, email: auth.data.email });
  }, [
    peer.peer,
    setPeer,
    socket,
    roomId,
    auth.data.email,
    myInfo.stream,
    handleCallUser,
  ]); //reset the connection

  //initially invoke call user
  useEffect(() => {
    handleCallUser();
  }, [handleCallUser]);

  //socket for signaling
  useEffect(() => {
    const listeners = [
      ["incoming:call", handleIncomingCall],
      ["call:accepted", handleCallAccepted],
      ["peer:reset", handleReset],
    ];
    socketEventListener(socket, listeners);
    return () => {
      socketEventRemover(socket, listeners);
    };
  }, [handleCallAccepted, handleIncomingCall, handleReset, socket]);

  //  Notify when user leaves or refreshes
  useEffect(() => {
    const handleBeforeUnload = () => {
      peer.closeConnection();
      socket.emit("user:leave", { to: roomId, email: auth.data.email });
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [auth.data.email, peer, peer.peer, roomId, socket]);

  //handle received emoji in the meeting
  useReceiveEmoji(socket);

  //detect if width is >= height or not
  const isWidthMax = useDeviceWidth();

  //handle received message in the meeting
  useEffect(() => {
    const handleReceiveMessage = ({ info }) => {
      dispatch(addMessage(info));
    };
    socket.on("receive:message", handleReceiveMessage);
    return () => socket.off("receive:message", handleReceiveMessage);
  }, [socket, dispatch]);

  return (
    <div className="min-h-dvh max-h-dvh h-full w-full p-4 bg-background-meet grid grid-rows-[auto_4rem]">
      <FloatingEmoji />
      <div
        className="h-full w-full grid grid-cols-[auto_auto] gap-2 overflow-hidden"
        style={{
          gridTemplateColumns: `auto minmax(0, ${drawer.isOpen ? 22 : 0}rem)`,
          transition: "grid-template-columns 0.3s ease-in-out",
        }}
      >
        <div
          className="flex h-full w-full transition-all gap-1 justify-center items-center"
          style={{
            flexDirection: isWidthMax ? "row" : "column",
          }}
        >
          <MeetUser peer={myInfo} />
          <MeetUser peer={otherInfo} />
        </div>
        <Drawer heading={drawerHeading}>{drawerChild}</Drawer>
      </div>
      <MeetingControls
        setMyInfo={setMyInfo}
        myInfo={myInfo}
        peer={peer}
        setDrawerHeading={setDrawerHeading}
        setDrawerChild={setDrawerChild}
      />
    </div>
  );
});

export default Meet;
