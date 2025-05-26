import { useEffect, useState } from "react";

type Orientation = "portrait" | "landscape";

export default function useOrientation() {
  const isClient = typeof window !== "undefined";

  const getOrientation = (): Orientation =>
    window.innerWidth > window.innerHeight ? "landscape" : "portrait";

  const [orientation, setOrientation] = useState<Orientation>(
    isClient ? getOrientation() : "landscape"
  );

  useEffect(() => {
    if (!isClient) return;

    const handleResize = () => {
      setOrientation(getOrientation());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isClient]);

  return {
    orientation,
    isLandscape: orientation === "landscape",
    isPortrait: orientation === "portrait",
  };
}
