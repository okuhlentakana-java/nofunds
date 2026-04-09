import { useState } from "react";
import PaymentModal from "../universal/PaymentModal";

export default function BundleCard({ bundle }) {
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const handleBuy = () => {
    setShowPaymentModal(true);
  };

  const labelColor = (label) => {
    if (label === "Best Value") return "bg-green-500 text-white";
    if (label === "Recommended") return "bg-blue-100 text-blue-700";
    return "bg-blue-100 text-blue-700";
  };

  return (
    <>
      <div className="rounded-xl p-2 flex flex-col justify-between shadow-sm bg-white text-gray-800 hover:shadow-md transition cursor-pointer">
        {/* Top: label + data + validity */}
        <div>
          <span
            className={`inline-block text-[9px] font-semibold px-1.5 py-0.5 rounded-full leading-tight ${labelColor(bundle.label)}`}
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

          <p className="text-[10px] text-gray-400 leading-tight">{bundle.validity}</p>
        </div>

        {/* Bottom: price + buy */}
        <div className="flex items-center justify-between mt-2 gap-1">
          <span className="font-bold text-xs text-gray-800">{bundle.price}</span>
          <button
            onClick={handleBuy}
            className="text-[10px] font-semibold px-2 py-1 rounded-full bg-blue-900 text-white hover:bg-blue-700 transition whitespace-nowrap"
          >
            Buy
          </button>
        </div>
      </div>

      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        item={bundle}
        type="bundle"
      />
    </>
  );
}