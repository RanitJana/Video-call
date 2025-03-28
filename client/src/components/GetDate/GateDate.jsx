import { useEffect, useState } from "react";
const getFormattedTime = () => {
  return new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

export default function GetDate() {
  const [currTime, setCurrTime] = useState(getFormattedTime());
  useEffect(() => {
    setInterval(() => {
      setCurrTime(getFormattedTime());
    }, 1000);
  }, []);
  return <>{currTime}</>;
}
