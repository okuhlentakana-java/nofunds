import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import PaymentModal from "../universal/PaymentModal";

const bundles = [
  { 
    id: 1,
    label: "Best Value", 
    data: "1GB", 
    price: "M20.00", 
    validity: "24 hours",
    category: "daily",
    description: "Perfect for daily browsing"
  },
  { 
    id: 2,
    label: "Recommended", 
    data: "2GB", 
    price: "M50.00", 
    validity: "7 days",
    category: "weekly",
    description: "Stream and browse freely"
  },
  { 
    id: 3,
    label: "Best Value", 
    data: "7GB", 
    price: "M260.00", 
    validity: "30 days",
    category: "monthly",
    description: "Heavy usage, video streaming"
  },
  { 
    id: 4,
    label: "Best Night", 
    data: "1.5GB", 
    price: "M10.00", 
    validity: "11pm – 5am",
    category: "night",
    description: "Perfect for late night streaming"
  },
  { 
    id: 5,
    label: "Popular", 
    data: "3.5GB + 3.5GB", 
    price: "M30.00", 
    validity: "7 days", 
    badge: "SASAI",
    category: "weekly",
    description: "Double data bonus"
  },
  { 
    id: 6,
    label: "Best Voice", 
    data: "1,900min", 
    price: "M250.00", 
    validity: "30 days",
    category: "voice",
    description: "Unlimited calling"
  },
];

export default function Bundles() {
  const navigate = useNavigate();
  const [selectedBundle, setSelectedBundle] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const handleSeeAll = () => {
    navigate("/bundles");
  };

  const handleBuy = (bundle) => {
    setSelectedBundle(bundle);
    setShowPaymentModal(true);
  };

  const handleClosePayment = () => {
    setShowPaymentModal(false);
    setSelectedBundle(null);
  };

  const getPaymentItem = () => {
    if (!selectedBundle) return null;
    return {
      name: selectedBundle.data,
      description: selectedBundle.description || `Valid ${selectedBundle.validity}`,
      price: selectedBundle.price,
      validity: selectedBundle.validity
    };
  };

  return (
    <>
      <div className="px-4 sm:px-6 mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-gray-800 text-base">Recommended</h2>
          <button 
            onClick={handleSeeAll}
            className="flex items-center gap-1 text-blue-600 text-sm font-medium hover:text-blue-700 transition"
          >
            See All <FaArrowRight />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {bundles.map((bundle, i) => (
            <div
              key={bundle.id}
              className={`rounded-2xl p-4 flex flex-col justify-between shadow-sm ${
                bundle.highlight
                  ? "bg-gradient-to-br from-blue-700 to-blue-500 text-white"
                  : "bg-white text-gray-800"
              }`}
            >
              <div>
                <span
                  className={`text-xs font-semibold px-2 py-0.5 rounded-full whitespace-nowrap ${
                    bundle.label === "Best Value"
                      ? "bg-green-500 text-white"
                      : bundle.highlight
                      ? "bg-white/20 text-white"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {bundle.label}
                </span>
                <div className="mt-2 text-2xl font-bold leading-tight flex flex-wrap items-center">
                  {bundle.data}
                  {bundle.badge && (
                    <span className="ml-1 mt-1 sm:mt-0 text-xs font-semibold bg-yellow-400 text-yellow-900 px-1.5 py-0.5 rounded-full">
                      {bundle.badge}
                    </span>
                  )}
                </div>
                <p className={`text-xs mt-0.5 ${bundle.highlight ? "text-white/80" : "text-gray-400"}`}>
                  {bundle.validity}
                </p>
              </div>

              <div className="flex items-center justify-between mt-4">
                <span className={`font-bold text-base ${bundle.highlight ? "text-white" : "text-gray-800"}`}>
                  {bundle.price}
                </span>
                <button
                  onClick={() => handleBuy(bundle)}
                  className={`text-sm font-semibold px-3 sm:px-4 py-1.5 rounded-full transition hover:opacity-90 whitespace-nowrap ${
                    bundle.highlight
                      ? "bg-white text-blue-700 hover:bg-gray-100"
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

      {/* Payment Modal */}
      {showPaymentModal && getPaymentItem() && (
        <PaymentModal 
          isOpen={showPaymentModal}
          onClose={handleClosePayment}
          item={getPaymentItem()}
          type="bundle"
        />
      )}
    </>
  );
}