import { useState, useEffect, useRef } from "react";
import { useTangazoAd } from "../../hooks/useTangazoAd";

const ZONE = "slim_strip";
const AD_HEIGHT = 50;
const slideDuration = 5000;

export default function UniversalBanner() {
  const [progress, setProgress] = useState(0);
  const progressIntervalRef = useRef();
  const { isEmpty } = useTangazoAd(ZONE);

  useEffect(() => {
    setProgress(0);
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    progressIntervalRef.current = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 100 / (slideDuration / 100);
        return next >= 100 ? 0 : next;
      });
    }, 100);
    return () => clearInterval(progressIntervalRef.current);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 flex justify-center pb-4 px-4">
      <div className="w-full max-w-2xl rounded-xl overflow-hidden shadow-md bg-gray-100">
        {isEmpty ? (
          <img
            src="/VisitLesotho_slim_320x50 2.jpg"
            alt="Visit Lesotho"
            className="w-full block"
            style={{ height: `${AD_HEIGHT}px`, objectFit: "cover", objectPosition: "center center" }}
          />
        ) : (
          <div
            data-tangazo-zone={ZONE}
            style={{ display: "block", width: "100%", minHeight: `${AD_HEIGHT}px` }}
          />
        )}
        <div className="h-0.5 bg-gray-300">
          <div
            className="h-0.5 bg-gray-500 transition-all duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}