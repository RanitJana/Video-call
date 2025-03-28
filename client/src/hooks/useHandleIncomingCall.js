import { useCallback } from "react";

export default function useHandleIncomingCall(
  peer,
  socket,
  auth,
  setOtherInfo
) {
  const handleIncomingCall = useCallback(
    async ({ from, offer, userInfo }) => {
      try {
        if (peer.peer.connectionState == "closed") return;
        const answer = await peer.getAnswer(offer);
        socket.emit("ans:accepted", {
          to: from,
          ans: answer,
          userInfo: auth.data,
        });
        setOtherInfo((prev) => ({ ...prev, info: userInfo }));
      } catch (error) {
        console.warn(error);
      }
    },
    [auth.data, peer, setOtherInfo, socket]
  );

  return handleIncomingCall;
}
