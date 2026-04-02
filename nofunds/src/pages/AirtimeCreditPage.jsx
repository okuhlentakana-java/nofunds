import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowRight, FaSpinner, FaCheck } from "react-icons/fa";
import { LuHandCoins } from "react-icons/lu";
import CreditTabs from "../components/credit/CreditTabs";
import OptionCard from "../components/credit/OptionCard";
import ConfirmScreen from "../components/credit/ConfirmScreen";
import SuccessScreen from "../components/credit/SuccessScreen";

const creditOptions = {
  airtime: [
    { id: 1, type: "airtime", name: "M5 Airtime", description: "Get M5 emergency airtime instantly", validity: "Until used", amount: "M5.00", serviceFee: "M0.50", totalRepayment: "M5.50" },
    { id: 2, type: "airtime", name: "M10 Airtime", description: "Get M10 emergency airtime instantly", validity: "Until used", amount: "M10.00", serviceFee: "M1.00", totalRepayment: "M11.00" },
    { id: 3, type: "airtime", name: "M20 Airtime", description: "Get M20 emergency airtime instantly", validity: "Until used", amount: "M20.00", serviceFee: "M2.00", totalRepayment: "M22.00" },
  ],
  data: [
    { id: 4, type: "data", name: "50MB Data", description: "Get 50MB emergency data for 24 hours", validity: "24 hours", amount: "50MB", serviceFee: "M0.50", totalRepayment: "M3.50" },
    { id: 5, type: "data", name: "100MB Data", description: "Get 100MB emergency data for 24 hours", validity: "24 hours", amount: "100MB", serviceFee: "M1.00", totalRepayment: "M6.00" },
    { id: 6, type: "data", name: "200MB Data", description: "Get 200MB emergency data for 24 hours", validity: "24 hours", amount: "200MB", serviceFee: "M2.00", totalRepayment: "M12.00" },
  ],
  voice: [
    { id: 7, type: "voice", name: "10 Minutes", description: "Get 10 minutes emergency voice", validity: "24 hours", amount: "10min", serviceFee: "M0.50", totalRepayment: "M2.50" },
    { id: 8, type: "voice", name: "20 Minutes", description: "Get 20 minutes emergency voice", validity: "24 hours", amount: "20min", serviceFee: "M1.00", totalRepayment: "M5.00" },
    { id: 9, type: "voice", name: "50 Minutes", description: "Get 50 minutes emergency voice", validity: "24 hours", amount: "50min", serviceFee: "M2.50", totalRepayment: "M12.50" },
  ],
  sms: [
    { id: 10, type: "sms", name: "50 SMS", description: "Get 50 emergency SMS", validity: "24 hours", amount: "50 SMS", serviceFee: "M0.50", totalRepayment: "M2.00" },
    { id: 11, type: "sms", name: "100 SMS", description: "Get 100 emergency SMS", validity: "24 hours", amount: "100 SMS", serviceFee: "M1.00", totalRepayment: "M4.00" },
    { id: 12, type: "sms", name: "200 SMS", description: "Get 200 emergency SMS", validity: "24 hours", amount: "200 SMS", serviceFee: "M2.00", totalRepayment: "M8.00" },
  ],
};

function IntroScreen({ onCheckEligibility }) {
  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl p-8 shadow-sm text-center">
        <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-5">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-5">
            <LuHandCoins className="w-8 h-8 text-blue-700" />
            </div>
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Airtime Credit Service</h2>
        <p className="text-sm text-gray-500 mb-6 leading-relaxed">
          Borrow airtime, data, voice minutes, or SMS when you run out.
          We'll check your eligibility based on your account activity.
        </p>
        <button
          onClick={onCheckEligibility}
          className="w-full bg-gradient-to-r from-blue-900 to-blue-500 text-white py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition"
        >
          Check My Eligibility <FaArrowRight />
        </button>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex gap-3">
        <span className="text-yellow-500 mt-0.5">⚠️</span>
        <p className="text-xs text-yellow-700 leading-relaxed">
          Eligibility is based on your recharge history and account standing.
          Borrowed credit is automatically repaid on your next recharge.
        </p>
      </div>
    </div>
  );
}

function CheckingScreen() {
  return (
    <div className="text-center py-16 space-y-4">
      <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
        <FaSpinner className="text-blue-600 text-3xl animate-spin" />
      </div>
      <h2 className="text-xl font-bold text-gray-800">Checking Eligibility</h2>
      <p className="text-gray-400 text-sm">Analysing your account activity...</p>
    </div>
  );
}

function QualifyScreen({ creditScore }) {
  return (
    <div className="text-center py-16 space-y-4">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
        <FaCheck className="text-green-600 text-3xl" />
      </div>
      <h2 className="text-xl font-bold text-gray-800">You Qualify!</h2>
      <p className="text-gray-500 text-sm">Credit score: {creditScore}/100</p>
      <p className="text-xs text-gray-400">Loading your available options...</p>
    </div>
  );
}

function CreditScoreCard({ creditScore }) {
  return (
    <div className="flex items-center justify-between px-1">
      <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Available Credit</p>
      <span className="text-xs font-semibold bg-green-100 text-green-700 px-3 py-1 rounded-full">
        Score: {creditScore}/100
      </span>
    </div>
  );
}

export default function AirtimeCreditPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedOption, setSelectedOption] = useState(null);
  const [creditScore] = useState(79);
  const [activeTab, setActiveTab] = useState("all");

  const handleCheckEligibility = () => {
    setStep(2);
    setTimeout(() => {
      setStep(3);
      setTimeout(() => setStep(4), 1500);
    }, 2000);
  };

  const handleSelectOption = (option) => {
    setSelectedOption(option);
    setStep(5);
  };

  const handleConfirmBorrow = () => {
    setStep(6);
    setTimeout(() => navigate("/"), 3500);
  };

  const handleBack = () => {
    setStep(4);
    setSelectedOption(null);
  };

  const getFilteredOptions = () => {
    if (activeTab === "all") return Object.values(creditOptions).flat();
    return creditOptions[activeTab] || [];
  };

  return (
    <div className="px-4 sm:px-6 pt-6 pb-10 max-w-2xl mx-auto">
      {step === 1 && <IntroScreen onCheckEligibility={handleCheckEligibility} />}
      {step === 2 && <CheckingScreen />}
      {step === 3 && <QualifyScreen creditScore={creditScore} />}
      {step === 4 && (
        <div className="space-y-5">
          <CreditScoreCard creditScore={creditScore} />
          <CreditTabs activeTab={activeTab} onTabChange={setActiveTab} />
          <div className="flex flex-col gap-4">
            {getFilteredOptions().map((option) => (
              <OptionCard key={option.id} option={option} onSelect={handleSelectOption} />
            ))}
          </div>
        </div>
      )}
      {step === 5 && (
        <ConfirmScreen selectedOption={selectedOption} onConfirm={handleConfirmBorrow} onBack={handleBack} />
      )}
      {step === 6 && (
        <SuccessScreen selectedOption={selectedOption} onDone={() => navigate("/")} />
      )}
    </div>
  );
}
