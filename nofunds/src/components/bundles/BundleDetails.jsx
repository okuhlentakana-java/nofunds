import { FaCheck } from "react-icons/fa";

export default function BundleDetails({ bundle, onClose, onBuy }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden max-w-md w-full">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-5 text-white">
        <h2 className="text-xl font-bold">{bundle.name}</h2>
        <p className="text-sm opacity-90 mt-1">{bundle.description}</p>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="mb-6">
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-3xl font-bold text-gray-800">{bundle.price}</span>
            <span className="text-sm text-gray-500">{bundle.validity}</span>
          </div>

          <h3 className="font-semibold text-gray-800 mb-3">WHAT YOU GET</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <FaCheck className="text-green-500 text-sm" />
              <span className="text-gray-700">{bundle.name} data</span>
            </div>
            <div className="flex items-center gap-2">
              <FaCheck className="text-green-500 text-sm" />
              <span className="text-gray-700">Valid {bundle.validity.toLowerCase()}</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            onClose();
            onBuy(bundle);
          }}
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
        >
          Buy {bundle.price}
        </button>

        <button
          onClick={onClose}
          className="w-full mt-3 py-3 rounded-xl font-semibold text-gray-600 hover:bg-gray-100 transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}