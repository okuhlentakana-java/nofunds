import { useState } from "react";
import PaymentModal from "../universal/PaymentModal";

export default function BundleCard({ bundle }) {
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const handleBuy = () => {
    setShowPaymentModal(true);
  };

  return (
    <>
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition cursor-pointer">
        <div className="mb-3">
          <h3 className="text-2xl font-bold text-gray-800">{bundle.name}</h3>
          <p className="text-sm text-gray-500 mt-1">{bundle.description}</p>
          <p className="text-xs text-gray-400 mt-1">{bundle.validity}</p>
        </div>
        
        <div className="flex items-center justify-between mt-4">
          <span className="text-2xl font-bold text-blue-600">{bundle.price}</span>
          <button 
            onClick={handleBuy}
            className="bg-blue-900 text-white px-5 py-2 rounded-full font-semibold text-sm hover:bg-blue-700 transition"
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