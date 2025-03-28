export default function useDetectMediaState(myInfo) {
  const detectAudioState = () => {
    const audioTrack = myInfo.stream?.getAudioTracks()[0];
    return (
      audioTrack && audioTrack.readyState !== "ended" && audioTrack.enabled
    );
  };

  const detectVideoState = () => {
    const videoTrack = myInfo.stream?.getVideoTracks()[0];
    return (
      videoTrack && videoTrack.readyState !== "ended" && videoTrack.enabled
    );
  };

  return { detectAudioState, detectVideoState };
}
