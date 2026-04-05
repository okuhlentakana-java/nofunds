import { FaArrowRight } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
import { LuShield, LuMegaphone } from "react-icons/lu";
import { LiaMoneyBillSolid } from "react-icons/lia";
import { useNavigate } from "react-router-dom";

const services = [
  {
    name: "Sasai",
    icon: <CiStar />,
    description: "All-in-one super app for chat, pay, stream and connect.",
    route: "/services/sasai",
  },
  {
    name: "EcoCash Spache Fono",
    icon: <LiaMoneyBillSolid />,
    description: "Mobile money for payments, transfers, and financial services.",
    route: "/services/ecocash",
  },
  {
    name: "EcoSure Rebolokehile",
    icon: <LuShield />,
    description: "Affordable mobile insurance for you and your family.",
    route: "/services/ecosure",
  },
  {
    name: "Next Best Offer",
    icon: <CiStar />,
    description: "Personalised bundle recommendations based on your usage.",
    route: "/services/nbo",
  },
];

export default function Services() {
  const navigate = useNavigate();

  return (
    <div className="px-4 mt-3">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-semibold text-gray-800 text-base">Popular Services</h2>
        <button
          onClick={() => navigate("/services")}
          className="flex items-center gap-1 text-blue-600 text-sm font-medium"
        >
          View All <FaArrowRight size={11} />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {/* Service Cards */}
        {services.map((service, i) => (
          <div
            key={i}
            onClick={() => navigate(service.route)}
            className="bg-white rounded-2xl p-4 flex flex-col items-start shadow-sm hover:shadow-md active:scale-95 transition-all cursor-pointer"
          >
            <div className="text-2xl mb-2 text-blue-900">{service.icon}</div>
            <p className="font-semibold text-gray-800 text-sm leading-tight">{service.name}</p>
            <p className="text-xs text-gray-400 mt-1 leading-relaxed">{service.description}</p>
          </div>
        ))}

        {/* Advertise With Us Card */}
        <div
          onClick={() => navigate("/ads")}
          className="bg-gradient-to-br from-indigo-900 to-blue-600 rounded-2xl p-4 flex flex-col items-start shadow-sm hover:shadow-md active:scale-95 transition-all cursor-pointer col-span-2"
        >
          <div className="flex items-center justify-between w-full">
            <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center">
              <LuMegaphone size={18} className="text-white" />
            </div>
            <span className="text-white/70 text-xs font-medium bg-white/10 px-2 py-0.5 rounded-full">
              Advertising
            </span>
          </div>
          <p className="font-bold text-white text-sm mt-3">Advertise With Us</p>
          <p className="text-xs text-white/70 mt-1 leading-relaxed">
            Reach thousands of active ETL users. Place your brand where it matters.
          </p>
          <div className="flex items-center gap-1 mt-3 text-white text-xs font-semibold">
            Get Started <FaArrowRight size={10} />
          </div>
        </div>
      </div>
    </div>
  );
}