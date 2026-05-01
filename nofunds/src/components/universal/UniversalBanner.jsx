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
    route: "/services",
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
  const [showAd, setShowAd] = useState(false);
  const progressIntervalRef = useRef();
  const adInjected = useRef(false);

  const slideDuration = 5000;

  useEffect(() => {
    const bannerInterval = setInterval(() => {
      setCurrent((c) => {
        const next = (c + 1) % banners.length;
        if (next === 0) setShowAd(true);
        else setShowAd(false);
        return next;
      });
    }, slideDuration);
    return () => clearInterval(bannerInterval);
  }, []);

  // Inject Tangazo script once — script auto-finds data-tangazo-zone divs
  useEffect(() => {
    if (showAd && !adInjected.current) {
      adInjected.current = true;
      const script = document.createElement("script");
      script.async = true;
      script.src =
        "https://tangazo.onrender.com/api/v1/serve/embed.js?key=ak_692424d6a9d242d5f9de709804479d57e10218da7da3c04b&zone=primary_banner";
      document.body.appendChild(script);
    }
  }, [showAd]);

  useEffect(() => {
    setProgress(0);
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    progressIntervalRef.current = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 100 / (slideDuration / 100);
        return next >= 100 ? 100 : next;
      });
    }, 100);
    return () => clearInterval(progressIntervalRef.current);
  }, [current, showAd]);

  const banner = banners[current];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40">
      <div className="mx-4 mb-4">

        {showAd ? (
          <div className="rounded-xl overflow-hidden shadow-md bg-gray-100">
            {/* Zone name matches zone= param exactly */}
            <div
              data-tangazo-zone="primary_banner"
              style={{ minHeight: "90px", width: "100%" }}
            />
            <div className="h-0.5 bg-gray-300">
              <div
                className="h-0.5 bg-gray-500 transition-all duration-100 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        ) : (
          <div className={`rounded-xl bg-gradient-to-r ${banner.color} text-white shadow-md`}>
            <div className="flex items-center justify-between px-4 py-2">
              <div>
                <h3 className="font-semibold text-sm leading-tight">{banner.title}</h3>
                <p className="text-xs opacity-90">{banner.text}</p>
              </div>
              <button
                onClick={() => banner.route && navigate(banner.route)}
                className="bg-white text-gray-900 font-semibold text-xs px-3 py-1 rounded-full hover:opacity-90 transition whitespace-nowrap ml-3"
              >
                {banner.buttonText}
              </button>
            </div>
            <div className="h-0.5 bg-white/30 rounded-b-xl overflow-hidden">
              <div
                className="h-0.5 bg-white transition-all duration-100 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

      </div>
    </div>
  );
}