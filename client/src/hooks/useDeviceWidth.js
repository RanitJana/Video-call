import { useState, useEffect } from "react";

export default function useDeviceWidth() {
  const [isWidthMax, setIsWidthMax] = useState(true);
  useEffect(() => {
    const handleWidthCalculate = () => {
      const width = Math.floor(window.innerWidth),
        height = Math.floor(window.innerHeight);

      setIsWidthMax(3 * width >= 4 * height);
    };
    handleWidthCalculate();
    window.addEventListener("resize", handleWidthCalculate);
    return () => window.removeEventListener("resize", handleWidthCalculate);
  });
  return isWidthMax;
}
