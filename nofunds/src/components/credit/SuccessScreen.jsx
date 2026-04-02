import { FaCheck } from "react-icons/fa";

export default function SuccessScreen({ selectedOption, onDone }) {
  return (
    <div className="text-center py-12 space-y-6">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
        <FaCheck className="text-green-600 text-4xl" />
      </div>
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Credit Approved</h2>
        <p className="text-gray-600">
          Borrow {selectedOption?.name} has been credited to your account.
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Repayment: {selectedOption?.totalRepayment} deducted on next recharge
        </p>
      </div>
      <button
        onClick={onDone}
        className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
      >
        Done
      </button>
    </div>
  );
}