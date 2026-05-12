import { useLocation, useNavigate } from "react-router-dom"; // Swapped Link for useNavigate
import { BsPhone } from "react-icons/bs";
import { CiWifiOn, CiHome } from "react-icons/ci";
import { LuHandCoins } from "react-icons/lu";
import { BsStars, BsExclamationCircle, BsMegaphone } from "react-icons/bs";
import { GoLightBulb, GoQuestion } from "react-icons/go";
import { FiMessageSquare, FiFileText, FiLock } from "react-icons/fi";
import { AiOutlineGlobal } from "react-icons/ai";
import { RiFireLine } from "react-icons/ri";

const navLinks = [
  {
    section: "Navigate",
    links: [
      { icon: <CiHome />, label: "Home", to: "/" },
      { icon: <BsPhone />, label: "Recharge Airtime", to: "/recharge" },
      { icon: <CiWifiOn />, label: "Data Bundles", to: "/bundles" },
      { icon: <BsMegaphone />, label: "Advertise With Us", to: "/ads" },
      { icon: <LuHandCoins />, label: "Airtime Credit", to: "/credit" },
      { icon: <RiFireLine />, label: "Hot Offers", to: "/offers" },
      { icon: <BsStars />, label: "Services", to: "/services" },
    ]
  },
  {
    section: "Resources",
    links: [
      { icon: <GoLightBulb />, label: "Free Usage Tips", to: "/tips" },
      { icon: <BsExclamationCircle />, label: "Emergency", to: "/emergency" },
      { icon: <BsExclamationCircle />, label: "About No Funds", to: "/no-funds" },
    ]
  },
  {
    section: "More",
    links: [
      { icon: <GoQuestion />, label: "Help & Support", to: "/help" },
      { icon: <FiMessageSquare />, label: "FAQs", to: "/faqs" },
      { icon: <AiOutlineGlobal />, label: "Language", to: "/language" },
    ]
  },
  {
    section: "Legal",
    links: [
      { icon: <FiFileText />, label: "Terms and Conditions", to: "/terms" },
      { icon: <FiLock />, label: "Privacy Policy", to: "/policy" },
    ]
  },
];

export default function Sidebar({ open, onClose }) {
  const location = useLocation();
  const navigate = useNavigate(); // Initialize the navigate hook

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  // Programmatic navigation handler
  const handleNavigation = (path) => {
    navigate(path);
    onClose(); // Close the sidebar after navigating
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-all duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white z-50 shadow-2xl transform transition-transform duration-300 flex flex-col ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-linear-to-r from-indigo-900 to-blue-700">
          <img
            src="/etl-logo.png"
            alt="ETL"
            className="h-8 w-auto object-contain brightness-0 invert"
          />
          <button onClick={onClose} className="text-white text-2xl leading-none">
            ✕
          </button>
        </div>

        {/* Links */}
        <nav className="flex-1 overflow-y-auto px-4 py-3">
          {navLinks.map((section, sectionIndex) => (
            <div key={section.section} className="mb-4">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-3">
                {section.section}
              </h3>
              
              <div className="space-y-0.5">
                {section.links.map((link) => {
                  const active = isActive(link.to);
                  return (
                    <button
                      key={link.label}
                      onClick={() => handleNavigation(link.to)}
                      className={`w-full flex items-center gap-4 px-3 py-2 rounded-lg transition text-left ${
                        active
                          ? "bg-blue-900 text-white"
                          : "text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                      }`}
                    >
                      <span className={`text-lg transition ${
                        active ? "text-white" : "text-gray-500"
                      }`}>
                        {link.icon}
                      </span>
                      <span className="text-sm font-medium">{link.label}</span>
                    </button>
                  );
                })}
              </div>
              
              {sectionIndex < navLinks.length - 1 && (
                <div className="mt-3 border-b border-gray-200" />
              )}
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-gray-100">
          <p className="text-xs text-gray-400 text-center">Econet Telecom Lesotho</p>
          <p className="text-xs text-gray-400 text-center">Powered by Econet Wireless</p>
        </div>
      </div>
    </>
  );
}