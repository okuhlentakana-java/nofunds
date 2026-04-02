import { FaArrowRight } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
import { LuShield } from "react-icons/lu";
import { LiaMoneyBillSolid } from "react-icons/lia";
import { useNavigate } from "react-router-dom";
const services = [
  {
    name: "Sasai",
    icon: <CiStar />,
    description:
      "All-in-one super app for chat, pay, stream and connect. Your digital lifestyle companion.",
  },
  {
    name: "EcoCash Spache Fono",
    icon: <LiaMoneyBillSolid />,
    description:
      "Mobile money service for payments, transfers, and financial services across all networks in Lesotho.",
  },
  {
    name: "EcoSure Rebolokehile",
    icon: <LuShield />,
    description:
      "Affordable mobile insurance providing life cover for you and your family, right from your phone.",
  },
  {
    name: "Next Best Offer",
    icon: <CiStar />,
    description:
      "Personalised bundle recommendations based on your usage patterns. Get the perfect plan for you.",
  },
];

export default function Services() {
 const navigate = useNavigate();
  return (
    <div className="px-6 mt-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-gray-800 text-base">Popular Services</h2>
        <button
      onClick={() => navigate("/services")}
      className="flex items-center gap-1 text-blue-600 text-sm font-medium"
    >
      View All <FaArrowRight />
    </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {services.map((service, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl p-4 flex flex-col items-start shadow-sm hover:shadow-md transition cursor-pointer"
          >
            <div className="text-3xl mb-2">{service.icon}</div>
            <p className="font-semibold text-gray-800 text-sm">{service.name}</p>
            <p className="text-xs text-gray-500 mt-1 leading-relaxed">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}