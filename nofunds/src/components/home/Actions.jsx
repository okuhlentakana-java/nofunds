import { BsPhone } from "react-icons/bs";
import { CiWifiOn } from "react-icons/ci";
import { LuHandCoins } from "react-icons/lu";
import { BsStars } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const actions = [
  { name: "Recharge", icon: <BsPhone />, to: "/recharge" },
  { name: "Bundles", icon: <CiWifiOn />, to: "/bundles" },
  { name: "Borrow", icon: <LuHandCoins />, to: "/credit" },
  { name: "Services", icon: <BsStars />, to: "/services" },
];

export default function Actions() {
  const navigateTo = useNavigate();

  const handleNavigation = (path) => {
    navigateTo(path);
  };

  return (
    <div className="grid grid-cols-4 gap-2 px-4 mt-3">
      {actions.map((action) => (
        <div
          // this is to save data usage by navigating programmatically instead of using Link which preloads the route
          onClick={() => handleNavigation(action.to)}
          key={action.name}
          className="relative flex flex-col items-center justify-center p-3 rounded-xl bg-linear-to-br from-indigo-900 to-blue-500 text-white cursor-pointer hover:scale-105 transition overflow-hidden"
        >
          {/* Wave pattern overlay */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <defs>
              <pattern id={`wave-${action.name}`} patternUnits="userSpaceOnUse" width="80" height="24">
                <path d="M0 12 C 20 6, 60 18, 80 12" fill="none" stroke="white" strokeWidth="0.8" strokeOpacity="0.08" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#wave-${action.name})`} />
          </svg>

          <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <defs>
              <pattern id={`wave2-${action.name}`} patternUnits="userSpaceOnUse" width="100" height="30">
                <path d="M0 15 C 25 5, 75 25, 100 15" fill="none" stroke="white" strokeWidth="0.6" strokeOpacity="0.05" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#wave2-${action.name})`} />
          </svg>

          <div className="relative z-10 flex flex-col items-center">
            <div className="text-xl">{action.icon}</div>
            <p className="text-xs mt-1.5 font-medium">{action.name}</p>
          </div>
        </div>
      ))}
    </div>
  );
}