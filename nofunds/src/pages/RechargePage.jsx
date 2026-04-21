import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AmountSelection from "../components/recharge/AmountSelection";
import PaymentModal from "../components/universal/PaymentModal";

export default function RechargePage() {
  const navigate = useNavigate();
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState("");
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [rechargeItem, setRechargeItem] = useState(null);

  const getTotalAmount = () => {
    if (selectedAmount) return selectedAmount;
    if (customAmount) return parseFloat(customAmount) || 0;
    return 0;
  };

  const isValidAmount = () => {
    return selectedAmount || (customAmount && parseFloat(customAmount) > 0);
  };

  const handleContinue = () => {
    if (isValidAmount()) {
      const amount = getTotalAmount();
      const item = {
        name: `Recharge M${amount}`,
        description: `Add M${amount} airtime to your account`,
        price: `M${amount}.00`,
        validity: "Until used",
        features: [`M${amount} airtime credit`, "No expiry", "Valid for all services"],
      };
      setRechargeItem(item);
      setShowPaymentModal(true);
    }
  };

  const handlePaymentSuccess = () => {
    setShowPaymentModal(false);
    navigate("/"); // go directly to homepage
  };

  const handlePaymentClose = () => {
    setShowPaymentModal(false);
  };

  const handleAmountSelect = (amount) => {
    setSelectedAmount(amount);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (amount) => {
    setCustomAmount(amount);
    if (amount) setSelectedAmount(null);
  };

  return (
    <div className="px-4 sm:px-6 mt-6 pb-10">
      <AmountSelection
        selectedAmount={selectedAmount}
        customAmount={customAmount}
        onAmountSelect={handleAmountSelect}
        onCustomAmountChange={handleCustomAmountChange}
      />
      <div className="mt-8">
        <button
          onClick={handleContinue}
          disabled={!isValidAmount()}
          className={`w-full py-3 rounded-xl font-semibold transition ${
            isValidAmount()
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          Continue
        </button>
      </div>

      <PaymentModal
        isOpen={showPaymentModal}
        onClose={handlePaymentClose}
        item={rechargeItem}
        type="airtime"
        onSuccess={handlePaymentSuccess}
      />
    </div>
  );
}