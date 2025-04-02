import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  addEmoji,
  removeFirstEmoji,
} from "../features/floatingEmoji/floatingEmoji.slice";

export default function useReceiveEmoji(socket) {
  const dispatch = useDispatch();

  const handleReceiveEmoji = useCallback(
    ({ sender, emoji }) => {
      dispatch(addEmoji({ sender, emoji }));
      setTimeout(() => dispatch(removeFirstEmoji()), 4000);
    },
    [dispatch]
  );

  useEffect(() => {
    socket.on("room:emoji:listen", handleReceiveEmoji);
    return () => socket.off("room:emoji:listen", handleReceiveEmoji);
  }, [handleReceiveEmoji, socket]);
}
