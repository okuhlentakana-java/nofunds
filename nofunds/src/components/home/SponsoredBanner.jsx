import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowRight, FaExternalLinkAlt } from "react-icons/fa";

const banners = [
  {
    title: "Protect Your Family",
    text: "Affordable mobile insurance from M5/month",
    buttonText: "Get Covered",
    route: "/services", // insurance service
    color: "from-teal-600 to-teal-400",
  },
  {
    title: "Night Bundles",
    text: "1.5GB from just M10 between 11pm-5am",
    buttonText: "Buy Now",
    route: "/bundles",
    color: "from-purple-700 to-indigo-600",
  },
  {
    title: "Send Money Instantly",
    text: "EcoCash Spache Fono - fast, secure transfers",
    buttonText: "Access EcoCash",
    route: "/services",
    color: "from-green-600 to-emerald-500",
  },
  {
    title: "Smart Savings",
    text: "Earn up to 5% on your savings. Start with just M50",
    buttonText: "Open Account",
    route: "/services",
    color: "from-cyan-600 to-blue-500",
  },
];

export default function SponsoredBanner() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const progressIntervalRef = useRef();
  const slideDuration = 5000;

  useEffect(() => {
    const bannerInterval = setInterval(() => {
      setCurrent((c) => (c + 1) % banners.length);
    }, slideDuration);
    return () => clearInterval(bannerInterval);
  }, []);

  useEffect(() => {
    setProgress(0);
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    progressIntervalRef.current = setInterval(() => {
      setProgress((prev) => {
        const increment = 100 / (slideDuration / 100);
        const newProgress = prev + increment;
        return newProgress >= 100 ? 100 : newProgress;
      });
    }, 100);
    return () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [current]);

  const banner = banners[current];

  const handleClick = () => {
    if (banner.route) {
      navigate(banner.route);
    } else {
      console.warn("No route defined for banner:", banner.title);
    }
  };

  return (
    <div className="relative">
      <div className={`mx-4 mt-3 rounded-2xl bg-gradient-to-r ${banner.color} text-white p-5 flex items-center justify-between shadow-md min-h-[180px]`}>
        <div className="flex-1">
          <div className="text-xs font-semibold uppercase tracking-wide opacity-70 mb-1">Sponsored</div>
          <h3 className="font-bold text-base leading-snug">{banner.title}</h3>
          <p className="text-sm opacity-90 mt-1">{banner.text}</p>
          <button onClick={handleClick} className="mt-3 bg-white text-gray-900 font-semibold text-sm px-4 py-1.5 rounded-full hover:opacity-90 transition">
            {banner.buttonText}
            <FaArrowRight className="inline ml-1" />
          </button>
        </div>
      </div>
      <div className="absolute bottom-0 left-4 right-4 h-1 bg-white/30 rounded-b-2xl overflow-hidden">
        <div className="h-1 bg-white transition-all duration-100 linear" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}