import { useCallback } from "react";

export default function useHandleCallUser(peer, socket, roomId, auth) {
  const handleCallUser = useCallback(async () => {
    if (peer.peer.signalingState !== "stable") return;
    try {
      const offer = await peer.getOffer();
      socket.emit("user:call", { to: roomId, offer, userInfo: auth.data });
    } catch (error) {
      console.warn(error);
    }
  }, [peer, socket, roomId, auth.data]);

  return handleCallUser;
}
