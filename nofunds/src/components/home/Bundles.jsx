import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import PaymentModal from "../universal/PaymentModal";
import { useBundles } from "../../hooks/useBundles";

const labelColor = (label) => {
  switch (label) {
    case "Best Value":  return "bg-green-500 text-white";
    case "Recommended": return "bg-blue-100 text-blue-700";
    case "Popular":     return "bg-yellow-100 text-yellow-800";
    case "Night":       return "bg-indigo-100 text-indigo-700";
    case "Voice":       return "bg-pink-100 text-pink-700";
    case "Social":      return "bg-purple-100 text-purple-700";
    default:            return "bg-gray-100 text-gray-700";
  }
};

function pickSix(bundles) {
  const bestValue = bundles.filter(b => b.label === "Best Value");
  const rest      = bundles.filter(b => b.label !== "Best Value");
  return [...bestValue, ...rest].slice(0, 6);
}

export default function Bundles() {
  const navigate = useNavigate();
  const { bundles, loading, error } = useBundles({ network_operator_country: "LS" });
  const [selectedBundle, setSelected] = useState(null);
  const [showModal, setShowModal]     = useState(false);

  const preview = pickSix(bundles);

  const handleBuy   = (bundle) => { setSelected(bundle); setShowModal(true); };
  const handleClose = ()       => { setShowModal(false); setSelected(null);  };

  const paymentItem = selectedBundle
    ? { name: selectedBundle.name, description: selectedBundle.description,
        price: selectedBundle.price, validity: selectedBundle.validity }
    : null;

  if (loading) return (
    <div className="px-4 sm:px-6 mt-3">
      <div className="flex items-center justify-between mb-2">
        <h2 className="font-semibold text-gray-800 text-sm">Recommended</h2>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-xl p-2 bg-white shadow-sm h-24 animate-pulse">
            <div className="h-3 bg-gray-100 rounded w-2/3 mb-2" />
            <div className="h-5 bg-gray-100 rounded w-1/2 mb-2" />
            <div className="h-3 bg-gray-100 rounded w-1/3" />
          </div>
        ))}
      </div>
    </div>
  );

  if (error) return (
    <div className="px-4 sm:px-6 mt-3 text-center py-6">
      <p className="text-xs text-red-400">Could not load bundles</p>
    </div>
  );

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
          {preview.map((bundle) => (
            <div
              key={bundle.id}
              className="rounded-xl p-2 flex flex-col justify-between shadow-sm bg-white text-gray-800 hover:shadow-md transition"
            >
              <span className={`inline-block w-fit text-[9px] font-semibold px-1.5 py-0.5 rounded-full leading-tight ${labelColor(bundle.label)}`}>
                {bundle.label}
              </span>
              <div className="mt-1 text-base font-bold leading-tight">{bundle.name}</div>
              <p className="text-[10px] text-gray-400 leading-tight">{bundle.validity}</p>
              <div className="flex items-center justify-between mt-2 gap-1">
                <span className="font-bold text-xs text-gray-800">{bundle.price}</span>
                <button
                  onClick={() => handleBuy(bundle)}
                  className="text-[10px] font-semibold px-2 py-1 rounded-full bg-blue-900 text-white hover:bg-blue-700 transition whitespace-nowrap"
                >
                  Buy
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

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