import { useEffect, useCallback } from "react";

export default function usePeerEvents(
  peer,
  socket,
  roomId,
  auth,
  setOtherInfo
) {
  //handle when negotiation is nedded
  const handleNegotiationEvent = useCallback(() => {
    setTimeout(async () => {
      try {
        if (peer.peer.connectionState === "have-remote-offer") return;
        const offer = await peer.getOffer();
        socket.emit("user:call", { to: roomId, offer, userInfo: auth.data });
      } catch (error) {
        console.warn(error);
      }
    }, 100); // Small delay prevents race conditions
  }, [peer, socket, roomId, auth.data]);

  //handle remote stream
  const handleTrackEvent = useCallback(
    (event) => {
      const stream = event.streams?.[0];
      if (!stream) return;

      //  Set up track event listeners that directly check track states
      const videoTrack = stream.getVideoTracks()[0];
      const audioTrack = stream.getAudioTracks()[0];

      setOtherInfo((prev) => ({
        ...prev,
        stream,
      }));

      if (videoTrack) {
        videoTrack.onmute = () => {
          setOtherInfo((prev) => ({ ...prev, isVideoEnabled: false }));
        };

        videoTrack.onunmute = () => {
          setOtherInfo((prev) => ({ ...prev, isVideoEnabled: true }));
        };
      }

      if (audioTrack) {
        audioTrack.onmute = () => {
          setOtherInfo((prev) => ({ ...prev, isAudioEnabled: false }));
        };

        audioTrack.onunmute = () => {
          setOtherInfo((prev) => ({ ...prev, isAudioEnabled: true }));
        };
      }
    },
    [setOtherInfo]
  );

  const handleConnectionChange = useCallback(() => {
    if (peer.peer.connectionState === "disconnected") {
      setOtherInfo({ info: null, stream: null });
      peer.peer.close();
    }
  }, [peer.peer, setOtherInfo]);

  useEffect(() => {
    peer.peer.addEventListener("track", handleTrackEvent);
    peer.peer.addEventListener("negotiationneeded", handleNegotiationEvent);
    peer.peer.addEventListener("connectionstatechange", handleConnectionChange);

    return () => {
      peer.peer.removeEventListener("track", handleTrackEvent);
      peer.peer.removeEventListener(
        "negotiationneeded",
        handleNegotiationEvent
      );
      peer.peer.removeEventListener(
        "connectionstatechange",
        handleConnectionChange
      );
    };
  }, [
    handleConnectionChange,
    handleNegotiationEvent,
    handleTrackEvent,
    peer.peer,
  ]);
}
