import { memo, useCallback, useEffect, useState, useRef } from "react";
import MicOffIcon from "@mui/icons-material/MicOff";
import MicIcon from "@mui/icons-material/Mic";

const VideoComponent = memo(({ stream }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <div className="absolute top-0 left-0 w-full h-full rounded-xl">
      <video
        ref={videoRef}
        className="absolute left-0 top-0 h-full w-full"
        autoPlay
        playsInline
      />
    </div>
  );
});

function MeetUser({ peer }) {
  const { stream, isAudioEnabled, isVideoEnabled, info } = peer;
  const [speaking, setSpeaking] = useState(false);

  const startSpeechDetection = useCallback(async () => {
    if (!stream || !isAudioEnabled) return;

    try {
      const audioContext = new AudioContext();
      await audioContext.audioWorklet.addModule("/vadProcessor.js");

      const source = audioContext.createMediaStreamSource(stream);
      const vadNode = new AudioWorkletNode(audioContext, "vad-processor");

      source.connect(vadNode);

      vadNode.port.onmessage = (event) => {
        if (event.data === "speech") {
          setSpeaking(true);
        } else if (event.data === "silence") {
          setSpeaking(false);
        }
      };

      return () => {
        vadNode.disconnect();
        source.disconnect();
        audioContext.close();
      };
    } catch {
      // console.error("Error starting speech detection:", error);
    }
  }, [stream, isAudioEnabled]);

  useEffect(() => {
    if (isAudioEnabled) {
      // Uncomment this when ready to use speech detection
      startSpeechDetection();
    }
  }, [startSpeechDetection, isAudioEnabled]);

  // Only render if we have info to display
  if (!info && !stream) return null;

  return (
    <div
      className="relative rounded-xl overflow-hidden"
      style={{
        borderWidth: info ? "3px" : "0px",
        borderStyle: "solid",
        borderColor: speaking && isAudioEnabled ? "#007FFF" : "transparent",
        transition: "all 0.3s ease",
        height: "100%",
        width: info ? "100%" : "0px",
      }}
    >
      <div className="w-full h-full relative bg-background-meet-single-use rounded-md flex justify-center items-center">
        {/* Audio muted indicator */}
        {!isAudioEnabled && (
          <div className="absolute z-10 right-2 top-2 bg-[rgba(0,0,0,0.44)] w-10 aspect-square rounded-full flex justify-center items-center">
            <MicOffIcon style={{ color: "white" }} />
          </div>
        )}

        {/* Speaking indicator */}
        <div
          className={`absolute z-10 right-2 top-2 w-10 aspect-square rounded-full 
            bg-[#0067ce] flex justify-center items-center transition
            ${
              speaking && isAudioEnabled
                ? "speaking-indicator border-[1px] border-[#fbfbfb] scale-100"
                : "scale-0"
            }`}
        >
          <MicIcon style={{ color: "white" }} />
        </div>

        {isVideoEnabled && <VideoComponent stream={stream} />}

        <div
          className="w-[80%] max-w-[8rem] aspect-square rounded-full overflow-hidden"
          style={{
            background: `#6a7282 url(${
              info?.avatar || ""
            }) no-repeat center/cover`,
          }}
        ></div>

        {/* User name */}
        <span className="text-white text-sm font-semibold absolute left-4 bottom-2 bg-[rgba(0,0,0,0.5)] px-2 py-0.5 rounded-md">
          {info?.name || "Unknown"}
        </span>
      </div>
    </div>
  );
}

export default MeetUser;
