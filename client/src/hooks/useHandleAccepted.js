import { useCallback } from "react";
export default function useHandleAccepted(peer, setOtherInfo) {
  const handleCallAccepted = useCallback(
    async ({ ans, userInfo }) => {
      if (peer.peer.connectionState == "have-remote-offer") return;
      try {
        await peer.setRemoteDescription(ans);
        setOtherInfo((prev) => ({ ...prev, info: userInfo }));
      } catch (error) {
        console.warn(error);
      }
    },
    [peer, setOtherInfo]
  );
  return handleCallAccepted;
}
