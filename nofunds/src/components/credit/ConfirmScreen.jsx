export default function ConfirmScreen({ selectedOption, onConfirm, onBack }) {
  if (!selectedOption) return null;

  return (
    <div className="space-y-4">

      {/* Hero card */}
      <div className="bg-blue-50 rounded-2xl p-6 text-center">
        <p className="text-base font-bold text-gray-800 mb-2">Borrow {selectedOption.name}</p>
        <p className="text-5xl font-black text-blue-700 leading-none">{selectedOption.amount}</p>
        <p className="text-sm text-gray-400 mt-2">{selectedOption.validity}</p>
      </div>

      {/* Detail rows */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <Row label="Credit Amount" value={selectedOption.amount} />
        <Row label="Service Fee" value={`${selectedOption.serviceFee} service fee`} />
        <Row label="Total Repayment" value={`${selectedOption.totalRepayment} deducted on next recharge`} bold />
        <Row label="Validity" value={selectedOption.validity} last />
      </div>

      {/* Warning */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
        <p className="text-sm text-yellow-700 leading-relaxed">
          By proceeding, you agree that {selectedOption.totalRepayment} will be automatically
          deducted from your next recharge.
        </p>
      </div>

      {/* Confirm button */}
      <button
        onClick={onConfirm}
        className="w-full bg-gradient-to-r from-blue-700 to-blue-500 text-white py-4 rounded-2xl font-bold text-base hover:opacity-90 transition"
      >
        Confirm Borrow
      </button>

      {/* Plain text back link */}
      <button
        onClick={onBack}
        className="w-full text-center text-sm text-gray-400 hover:text-gray-600 transition py-1"
      >
        Back
      </button>
    </div>
  );
}

function Row({ label, value, bold, last }) {
  return (
    <div className={`flex items-center justify-between px-5 py-4 ${!last ? "border-b border-gray-100" : ""}`}>
      <span className="text-sm text-gray-500">{label}</span>
      <span className={`text-sm text-right max-w-[55%] ${bold ? "font-bold text-gray-900" : "text-gray-700"}`}>
        {value}
      </span>
    </div>
  );
}
