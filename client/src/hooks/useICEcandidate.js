import { useCallback, useEffect } from "react";
export default function useICEcandidate(peer, socket, roomId) {
  //handle when ice-candidate comes
  const handleICEcandidate = useCallback(
    (event) => {
      if (event.candidate)
        socket.emit("ice:candidate", {
          to: roomId,
          candidate: event.candidate,
        });
    },
    [roomId, socket]
  );

  //set ice-canditate to the peer connection
  const handleIncomingICEcandidate = useCallback(
    async ({ candidate }) => {
      try {
        peer.setICEcandidate(candidate);
      } catch (error) {
        console.log(error);
      }
    },
    [peer]
  );

  useEffect(() => {
    peer.peer.addEventListener("icecandidate", handleICEcandidate);
    return () =>
      peer.peer.removeEventListener("icecandidate", handleICEcandidate);
  }, [handleICEcandidate, peer.peer]);

  useEffect(() => {
    socket.on("ice:candidate:receive", handleIncomingICEcandidate);
    return () =>
      socket.off("ice:candidate:receive", handleIncomingICEcandidate);
  }, [handleIncomingICEcandidate, socket]);

  return null;
}
