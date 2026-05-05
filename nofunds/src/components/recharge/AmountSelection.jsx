import { useTangazoAd } from "../../hooks/useTangazoAd";

const amounts = [
  { value: 5,   label: "M5",   description: "Quick Top-up" },
  { value: 10,  label: "M10",  description: "Basic"        },
  { value: 20,  label: "M20",  description: "Standard"     },
  { value: 30,  label: "M30",  description: "Plus"         },
  { value: 50,  label: "M50",  description: "Value"        },
  { value: 100, label: "M100", description: "Premium"      },
  { value: 200, label: "M200", description: "Power"        },
  { value: 500, label: "M500", description: "Max"          },
];

export default function AmountSelection({ selectedAmount, customAmount, onAmountSelect, onCustomAmountChange }) {
  useTangazoAd("primary_banner");

  const handleCustomAmountChange = (e) => {
    const value = e.target.value;
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      onCustomAmountChange(value);
    }
  };

  return (
    <div className="space-y-6">

      {/* Hero Banner */}
      <div className="rounded-2xl overflow-hidden mb-6">
        <div
          data-tangazo-zone="primary_banner"
          style={{ display: "block", width: "100%", minHeight: "180px" }}
        />
      </div>

      {/* Amount Selection */}
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

      {/* Custom Amount */}
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