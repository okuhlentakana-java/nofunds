import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const banners = [
  {
    title: "Win A Car!",
    text: "Recharge M5+ to enter",
    color: "from-teal-600 to-teal-400",
    buttonText: "Recharge",
    route: "/recharge",
  },
  {
    title: "Get Connected",
    text: "Data from M2",
    color: "from-purple-700 to-indigo-600",
    buttonText: "Buy Data",
    route: "/bundles",
  },
  {
    title: "New Hilux",
    text: "From M4,999/mo",
    color: "from-green-600 to-emerald-500",
    buttonText: "Enquire",
    route: "/services", // you can change to a dedicated car page if you have one
  },
  {
    title: "Download Sasai",
    text: "Chat, pay, stream",
    color: "from-cyan-600 to-blue-500",
    buttonText: "Get App",
    route: "/services",
  },
];

export default function UniversalBanner() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const progressIntervalRef = useRef();

  const slideDuration = 5000; // 5 seconds per slide

  // Handle banner rotation separately
  useEffect(() => {
    const bannerInterval = setInterval(() => {
      setCurrent((c) => {
        const next = (c + 1) % banners.length;
        return next;
      });
    }, slideDuration);

    return () => clearInterval(bannerInterval);
  }, []);

  // Handle progress bar separately
  useEffect(() => {
    setProgress(0);
    
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }
    
    progressIntervalRef.current = setInterval(() => {
      setProgress((prev) => {
        const increment = 100 / (slideDuration / 100);
        const newProgress = prev + increment;
        
        if (newProgress >= 100) {
          return 100;
        }
        return newProgress;
      });
    }, 100);

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, [current]);

  const banner = banners[current];

  const handleClick = () => {
    if (banner.route) {
      navigate(banner.route);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40">
      <div
        className={`mx-4 mb-4 rounded-xl bg-gradient-to-r ${banner.color} text-white shadow-md`}
      >
        <div className="flex items-center justify-between px-4 py-2">
          <div className=" items-center gap-3">
            <h3 className="font-semibold text-sm leading-tight">{banner.title}</h3>
            <p className="text-xs opacity-90">{banner.text}</p>
          </div>
          <button 
            onClick={handleClick}
            className="bg-white text-gray-900 font-semibold text-xs px-3 py-1 rounded-full hover:opacity-90 transition whitespace-nowrap ml-3"
          >
            {banner.buttonText}
          </button>
        </div>

        {/* Sliding progress bar */}
        <div className="h-0.5 bg-white/30 rounded-b-xl overflow-hidden">
          <div
            className="h-0.5 bg-white transition-all duration-100 linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}