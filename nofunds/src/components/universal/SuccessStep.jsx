import { FaCheck, FaArrowRight } from "react-icons/fa";

export default function SuccessStep({ amount }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-6">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
        <FaCheck className="text-green-600 text-4xl" />
      </div>
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Recharge Successful</h2>
        <p className="text-gray-600">
          M{amount} has been added to your account.
        </p>
      </div>

      {/* Win a Car Banner */}
      <div className="w-full bg-gradient-to-r from-teal-600 to-teal-400 rounded-xl p-4 text-white mt-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide opacity-80">Win a Car!</p>
            <p className="text-sm font-medium">Recharge M5+ to enter</p>
          </div>
          <FaArrowRight className="opacity-80" />
        </div>
      </div>
    </div>
  );
}