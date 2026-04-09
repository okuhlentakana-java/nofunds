import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import PaymentModal from "../universal/PaymentModal";

const bundles = [
  { id: 1, label: "Best Value",   data: "1GB",        price: "M20.00",  validity: "24 hours",  category: "daily",   description: "Perfect for daily browsing"        },
  { id: 2, label: "Recommended",  data: "2GB",        price: "M50.00",  validity: "7 days",    category: "weekly",  description: "Stream and browse freely"          },
  { id: 3, label: "Best Value",   data: "7GB",        price: "M260.00", validity: "30 days",   category: "monthly", description: "Heavy usage, video streaming"      },
  { id: 4, label: "Best Night",   data: "1.5GB",      price: "M10.00",  validity: "11pm–5am",  category: "night",   description: "Perfect for late night streaming"  },
  { id: 5, label: "Popular",      data: "3.5+3.5GB",  price: "M30.00",  validity: "7 days",    category: "weekly",  description: "Double data bonus"                 },
  { id: 6, label: "Best Voice",   data: "1,900min",   price: "M250.00", validity: "30 days",   category: "voice",   description: "Unlimited calling"                 },
];

const labelColor = (label) => {
  if (label === "Best Value") return "bg-green-500 text-white";
  return "bg-blue-100 text-blue-700";
};

export default function Bundles() {
  const navigate = useNavigate();
  const [selectedBundle, setSelectedBundle] = useState(null);
  const [showModal, setShowModal]           = useState(false);

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handleBuy = (bundle) => {
    setSelectedBundle(bundle);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedBundle(null);
  };

  const paymentItem = selectedBundle
    ? {
        name:        selectedBundle.data,
        description: selectedBundle.description || `Valid ${selectedBundle.validity}`,
        price:       selectedBundle.price,
        validity:    selectedBundle.validity,
      }
    : null;

  return (
    <>
      <div className="px-4 sm:px-6 mt-3">
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-semibold text-gray-800 text-sm">Recommended</h2>
          <button
            onClick={() => navigate("/bundles")}
            className="flex items-center gap-1 text-blue-600 text-xs font-medium hover:text-blue-700 transition"
          >
            See All <FaArrowRight size={10} />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {bundles.map((bundle) => (
            <div
              key={bundle.id}
              className={`rounded-xl p-2 flex flex-col justify-between shadow-sm min-h-0 ${
                bundle.highlight
                  ? "bg-gradient-to-br from-blue-700 to-blue-500 text-white"
                  : "bg-white text-gray-800"
              }`}
            >
              <div>
                <span
                  className={`inline-block text-[9px] font-semibold px-1.5 py-0.5 rounded-full leading-tight ${
                    bundle.highlight ? "bg-white/20 text-white" : labelColor(bundle.label)
                  }`}
                >
                  {bundle.label}
                </span>

                <div className="mt-1 text-base font-bold leading-tight">
                  {bundle.data}
                  {bundle.badge && (
                    <span className="ml-1 text-[9px] font-semibold bg-yellow-400 text-yellow-900 px-1 py-0.5 rounded-full align-middle">
                      {bundle.badge}
                    </span>
                  )}
                </div>

                <p className={`text-[10px] leading-tight ${bundle.highlight ? "text-white/70" : "text-gray-400"}`}>
                  {bundle.validity}
                </p>
              </div>

              <div className="flex items-center justify-between mt-2 gap-1">
                <span className={`font-bold text-xs leading-tight ${bundle.highlight ? "text-white" : "text-gray-800"}`}>
                  {bundle.price}
                </span>
                <button
                  onClick={() => handleBuy(bundle)}
                  className={`text-[10px] font-semibold px-2 py-1 rounded-full transition hover:opacity-90 whitespace-nowrap ${
                    bundle.highlight
                      ? "bg-white text-blue-700"
                      : "bg-blue-900 text-white hover:bg-blue-700"
                  }`}
                >
                  Buy
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Normal modal — user pressed Buy */}
      {showModal && paymentItem && (
        <PaymentModal
          isOpen={showModal}
          onClose={handleClose}
          item={paymentItem}
          onSuccess={handleClose}
        />
      )}
    </>
  );
}