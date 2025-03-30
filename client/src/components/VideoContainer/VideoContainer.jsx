import { useRef, useEffect } from "react";

export default function VideoComponent({ stream }) {
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
}
