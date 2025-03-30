import useDetectMediaState from "./useDetectMediaState.js";
import { getDeviceMedia, getUserMedia } from "../service/getMedia.js";

export default function useShareScreen(myInfo, setMyInfo, peer) {
  const { detectAudioState } = useDetectMediaState(myInfo);

  const switchBackToCamera = async () => {
    try {
      const cameraStream = await getUserMedia(detectAudioState(), true);

      const senders = peer.peer.getSenders();
      const videoSender = senders.find(
        (sender) => sender.track && sender.track.kind === "video"
      );

      if (videoSender) {
        videoSender.replaceTrack(cameraStream.getVideoTracks()[0]);
      }

      setMyInfo((prev) => ({ ...prev, stream: cameraStream }));
    } catch (error) {
      console.error("Error switching back to camera:", error);
    }
  };

  const shareScreen = async () => {
    try {
      const videoSender = peer.peer
        .getSenders()
        .find((sender) => sender.track && sender.track.kind === "video");

      const screenStream = await getDeviceMedia(detectAudioState(), true);
      const screenTrack = screenStream.getVideoTracks()[0];
      if (!screenTrack) return;
      const newStream = new MediaStream([screenTrack]);
      const originalAudioTrack = myInfo.stream.getAudioTracks()[0];
      if (originalAudioTrack) {
        newStream.addTrack(originalAudioTrack);
      }

      screenTrack.onended = async () => {
        await switchBackToCamera();
      };

      if (videoSender) {
        await videoSender.replaceTrack(screenTrack);
      }

      setMyInfo((prev) => ({ ...prev, stream: newStream }));
    } catch (error) {
      console.error("Error sharing screen:", error);
    }
  };

  return shareScreen;
}
