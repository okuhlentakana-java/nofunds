import { FaArrowRight } from "react-icons/fa";
import PromoBanner from "../home/PromoBanner";
const GiftIcon = () => (

  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2">
    <polyline points="20 12 20 22 4 22 4 12" /><rect x="2" y="7" width="20" height="5" />
    <line x1="12" y1="22" x2="12" y2="7" /><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
    <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
  </svg>
);
const amounts = [
  { value: 5, label: "M5", description: "Quick Top-up" },
  { value: 10, label: "M10", description: "Basic" },
  { value: 20, label: "M20", description: "Standard" },
  { value: 30, label: "M30", description: "Plus" },
  { value: 50, label: "M50", description: "Value" },
  { value: 100, label: "M100", description: "Premium" },
  { value: 200, label: "M200", description: "Power" },
  { value: 500, label: "M500", description: "Max" },
];

export default function AmountSelection({ selectedAmount, customAmount, onAmountSelect, onCustomAmountChange }) {
  const handleCustomAmountChange = (e) => {
    const value = e.target.value;
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      onCustomAmountChange(value);
    }
  };

  return (
    <div className="space-y-6">
      {/* Hero Banner */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-900 via-indigo-800 to-blue-700 p-5 mb-6 text-white">
          <div className="absolute -top-5 right-5 opacity-10">
            <svg width="100" height="100" viewBox="0 0 100 100"><polygon points="50 5 95 95 5 95" fill="white" /></svg>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <GiftIcon />
            <span className="text-[11px] font-bold tracking-wider text-yellow-300 uppercase">Featured Promotion</span>
          </div>
          <h2 className="text-2xl font-extrabold mb-2">Hoa Khonahala</h2>
          <p className="text-sm text-white/80 mb-4">
            Recharge M5 or more for a chance to win a brand new car
          </p>
        </div>
  

     <div>
  <h2 className="text-lg font-bold text-gray-800 mb-4">SELECT AMOUNT</h2>
  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
    {amounts.map((amount) => (
      <button
        key={amount.value}
        onClick={() => onAmountSelect(amount.value)}
        className={`p-4 rounded-xl border-2 text-left transition ${
          selectedAmount === amount.value
            ? "border-blue-600 bg-blue-900 text-white"
            : "border-gray-200 bg-white hover:border-blue-300"
        }`}
      >
        <div className={`font-bold text-lg ${
          selectedAmount === amount.value ? "text-white" : "text-gray-800"
        }`}>
          {amount.label}
        </div>
        <div className={`text-xs ${
          selectedAmount === amount.value ? "text-blue-200" : "text-gray-500"
        }`}>
          {amount.description}
        </div>
      </button>
    ))}
  </div>
</div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          OR ENTER CUSTOM AMOUNT
        </label>
        
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">
            M
          </span>
          <input
            type="number"
            value={customAmount}
            onChange={handleCustomAmountChange}
            placeholder="0.00"
            className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
}