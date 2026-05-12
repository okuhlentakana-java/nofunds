import { RiWifiOffLine } from "react-icons/ri";

export default function Banner() {
  return (
    <div className="relative mx-3 mt-2 py-1.5 px-3 rounded-xl bg-gradient-to-r from-blue-900 to-blue-500 text-white overflow-hidden">
      {/* Wave pattern background */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern
            id="wavePattern"
            patternUnits="userSpaceOnUse"
            width="100"
            height="30"
            patternTransform="rotate(0)"
          >
            <path
              d="M0 15 C 25 5, 75 25, 100 15"
              fill="none"
              stroke="white"
              strokeWidth="0.8"
              strokeOpacity="0.12"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#wavePattern)" />
      </svg>

      {/* Optional second layer of waves with different offset */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern
            id="wavePattern2"
            patternUnits="userSpaceOnUse"
            width="80"
            height="25"
            patternTransform="rotate(0)"
          >
            <path
              d="M0 12 C 20 6, 60 18, 80 12"
              fill="none"
              stroke="white"
              strokeWidth="0.6"
              strokeOpacity="0.08"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#wavePattern2)" />
      </svg>

      {/* Content */}
      <div className="flex items-center gap-2 relative z-10">
        <div className="text-2xl">
          <RiWifiOffLine />
        </div>
        <div>
          <h2 className="font-semibold text-base">You're out of data</h2>
          <p className="text-xs opacity-90">
            Recharge, buy a bundle, or borrow .
          </p>
        </div>
      </div>
    </div>
  );
}