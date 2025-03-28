import { getUserMedia } from "../service/getMedia.js";
import useDetectMediaState from "./useDetectMediaState.js";

export default function useMediaToggle(myInfo, setMyInfo, peer) {
  const { detectAudioState, detectVideoState } = useDetectMediaState(myInfo);

  const toggleVideo = async () => {
    const videoEnabled = detectVideoState();
    const videoSender = peer.peer
      .getSenders()
      .find((sender) => sender.track && sender.track.kind === "video");

    if (videoEnabled) {
      const videoTrack = myInfo.stream.getVideoTracks()[0];

      if (videoTrack) {
        // First, notify the peer by replacing the track with null
        if (videoSender) await videoSender.replaceTrack(null);

        // Stop and remove the track
        videoTrack.stop();
        myInfo.stream.removeTrack(videoTrack);

        setMyInfo((prev) => ({
          ...prev,
          isVideoEnabled: false,
        }));
      }
    } else {
      const newMediaStream = await getUserMedia(detectAudioState(), true);
      const newVideoTrack = newMediaStream.getVideoTracks()[0];

      if (!newVideoTrack) return;

      const updatedStream = new MediaStream();

      // Add existing audio track (if available)
      const currentAudioTrack = myInfo.stream.getAudioTracks()[0];
      if (currentAudioTrack) updatedStream.addTrack(currentAudioTrack);

      // Add the new video track
      updatedStream.addTrack(newVideoTrack);

      if (videoSender) {
        await videoSender.replaceTrack(newVideoTrack);
      } else {
        peer.peer.addTrack(newVideoTrack, updatedStream);
      }

      setMyInfo((prev) => ({
        ...prev,
        stream: updatedStream,
        isVideoEnabled: true,
      }));

      // Stop unnecessary tracks to avoid memory leaks
      newMediaStream.getTracks().forEach((track) => {
        if (track !== newVideoTrack) track.stop();
      });
    }
  };

  const toggleAudio = async () => {
    const audioEnabled = detectAudioState();
    const audioSender = peer.peer
      .getSenders()
      .find((sender) => sender.track && sender.track.kind === "audio");

    if (audioEnabled) {
      const audioTrack = myInfo.stream.getAudioTracks()[0];

      if (audioTrack) {
        myInfo.stream.removeTrack(audioTrack);
        setMyInfo((prev) => ({
          ...prev,
          isAudioEnabled: false,
        }));
        if (audioSender) peer.peer.removeTrack(audioSender); // Only remove if sender exists
      }
    } else {
      const newMediaStream = await getUserMedia(true, detectVideoState());
      const newAudioTrack = newMediaStream.getAudioTracks()[0];

      if (!newAudioTrack) return;

      myInfo.stream.addTrack(newAudioTrack);
      if (audioSender) {
        await audioSender.replaceTrack(newAudioTrack);
      } else {
        peer.peer.addTrack(newAudioTrack, myInfo.stream);
      }

      setMyInfo((prev) => ({
        ...prev,
        isAudioEnabled: true,
      }));

      newMediaStream.getTracks().forEach((track) => {
        if (track !== newAudioTrack) track.stop();
      });
    }
  };

  return { toggleVideo, toggleAudio };
}
