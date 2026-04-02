const typeColor = {
  airtime: "text-blue-700",
  data: "text-blue-700",
  voice: "text-blue-700",
  sms: "text-blue-700",
};

export default function OptionCard({ option, onSelect }) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition">
      {/* Title row */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-bold text-gray-900">Borrow {option.name}</h3>
          <p className="text-xs text-gray-400 mt-0.5">{option.validity}</p>
        </div>
        <span className={`text-xl font-black flex-shrink-0 ${typeColor[option.type] || "text-blue-700"}`}>
          {option.amount}
        </span>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-500 mt-3 leading-relaxed">
        {option.description}. Repay {option.totalRepayment} on your next top-up.
      </p>

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between">
        <p className="text-xs text-gray-400">{option.serviceFee} service fee</p>
        <button
          onClick={() => onSelect(option)}
          className="relative overflow-hidden bg-gradient-to-br from-blue-900 to-blue-900 text-white px-5 py-2 rounded-full font-semibold text-sm ring-1 ring-white/10 after:absolute after:inset-0 after:rounded-full after:bg-gradient-to-b after:from-white/15 after:to-transparent after:pointer-events-none hover:opacity-90 transition"
        >
          Borrow
        </button>
      </div>
    </div>
  );
}