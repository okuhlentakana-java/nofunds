import { useState } from "react";
import { FiFilter } from "react-icons/fi";
import { RiStackLine } from "react-icons/ri";
import { PiLightning } from "react-icons/pi";
import { IoCallOutline } from "react-icons/io5";
import { BsChat } from "react-icons/bs";
import { BiSolidMoon } from "react-icons/bi";
import { RxMixerHorizontal } from "react-icons/rx";
import CustomBundleBuilder from "../components/bundles/CustomBundleBuilder";
import PaymentModal from "../components/universal/PaymentModal";
import { useBundles } from "../hooks/useBundles";

// ─── UI Constants ──────────────────────────────────────────────────────────
const mainCategories = [
  { id: "all",    label: <><RiStackLine    className="inline ml-1"/> All</>        },
  { id: "data",   label: <><PiLightning    className="inline ml-1"/> Data</>       },
  { id: "voice",  label: <><IoCallOutline  className="inline ml-1"/> Voice</>      },
  { id: "social", label: <><BsChat         className="inline ml-1"/> Social</>     },
  { id: "night",  label: <><BiSolidMoon    className="inline ml-1"/> Night</>      },
  { id: "custom", label: <><RxMixerHorizontal className="inline ml-1"/> Custom Mix</> },
];

const subCategories = [
  { id: "daily",   label: "Daily"   },
  { id: "3-day",   label: "3-Day"   },
  { id: "weekly",  label: "Weekly"  },
  { id: "monthly", label: "Monthly" },
];

// Helper: colour for the label badge (same as BundleCard)
const labelColor = (label) => {
  switch (label) {
    case "Best Value":   return "bg-green-500 text-white";
    case "Recommended":  return "bg-blue-100 text-blue-700";
    case "Popular":      return "bg-yellow-100 text-yellow-800";
    case "Night":        return "bg-indigo-100 text-indigo-700";
    case "Voice":        return "bg-pink-100 text-pink-700";
    case "Social":       return "bg-purple-100 text-purple-700";
    default:             return "bg-gray-100 text-gray-700";
  }
};

export default function BundlesPage() {
  const { bundles, loading, error } = useBundles({ network_operator_country: "LS" });
  const [activeMain, setActiveMain] = useState("all");
  const [activeSub, setActiveSub] = useState("daily");
  const [selectedBundle, setSelected] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // ─── Filtering ──────────────────────────────────────────────────────────
  const filteredBundles = (() => {
    if (activeMain === "custom") return [];
    if (activeMain === "all") return bundles.filter(b => b.subCategory === activeSub);
    return bundles.filter(b => b.category === activeMain && b.subCategory === activeSub);
  })();

  const handleMainChange = (id) => {
    setActiveMain(id);
    setActiveSub("daily");
  };

  const handleBuy = (bundle) => {
    setSelected(bundle);
    setShowModal(true);
  };

  const paymentItem = selectedBundle
    ? {
        name: selectedBundle.name,
        description: selectedBundle.description,
        price: selectedBundle.price,
        validity: selectedBundle.validity,
      }
    : null;

  // ─── Loading & Error States ─────────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex justify-center items-center py-24">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-900 border-t-transparent" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 mb-2">Failed to load bundles</p>
        <button onClick={() => window.location.reload()} className="text-blue-600 font-semibold hover:underline">
          Retry
        </button>
      </div>
    );
  }

  // ─── Render ─────────────────────────────────────────────────────────────
  return (
    <>
      <div className="px-4 sm:px-6 mt-6 pb-10">
        {/* Main category tabs */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex bg-gray-100 rounded-xl p-1 flex-wrap justify-center">
            {mainCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleMainChange(cat.id)}
                className={`px-3 py-2 rounded-lg font-medium transition whitespace-nowrap ${
                  activeMain === cat.id
                    ? "bg-blue-900 text-white shadow-sm"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Sub category tabs (hidden for Custom Mix) */}
        {activeMain !== "custom" && (
          <div className="flex justify-center mb-8">
            <div className="inline-flex gap-2 flex-wrap justify-center">
              {subCategories.map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => setActiveSub(sub.id)}
                  className={`px-5 py-2 rounded-xl text-sm font-medium transition whitespace-nowrap ${
                    activeSub === sub.id
                      ? "bg-white text-blue-600 border border-blue-600 shadow-sm"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {sub.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Custom bundle builder */}
        {activeMain === "custom" && <CustomBundleBuilder />}

        {/* Bundle cards – new design from bundles.jsx */}
        {activeMain !== "custom" && (
          filteredBundles.length === 0 ? (
            <div className="text-center py-12">
              <FiFilter className="text-6xl text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 mb-2">No bundles match your filters</p>
              <button onClick={() => setActiveSub("daily")} className="text-blue-600 font-semibold hover:underline">
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-3 gap-2">
              {filteredBundles.map((bundle) => (
                <div
                  key={bundle.id}
                  className="rounded-xl p-2 flex flex-col justify-between shadow-sm bg-white text-gray-800 hover:shadow-md transition cursor-pointer"
                >
                  {/* Label badge */}
                  <span className={`inline-block w-fit text-[9px] font-semibold px-1.5 py-0.5 rounded-full leading-tight ${labelColor(bundle.label)}`}>
                    {bundle.label}
                  </span>

                  {/* Data (size/name) */}
                  <div className="mt-1 text-base font-bold leading-tight">
                    {bundle.name}
                    {/* Optional extra badge, e.g., "Bonus" – if your API provides it */}
                    {bundle.extraBadge && (
                      <span className="ml-1 text-[9px] font-semibold bg-yellow-400 text-yellow-900 px-1 py-0.5 rounded-full align-middle">
                        {bundle.extraBadge}
                      </span>
                    )}
                  </div>

                  {/* Validity */}
                  <p className="text-[10px] text-gray-400 leading-tight">{bundle.validity}</p>

                  {/* Price & Buy button */}
                  <div className="flex items-center justify-between mt-2 gap-1">
                    <span className="font-bold text-xs text-gray-800">{bundle.price}</span>
                    <button
                      onClick={() => handleBuy(bundle)}
                      className="text-[10px] font-semibold px-2 py-1 rounded-full bg-blue-900 text-white hover:bg-blue-700 transition whitespace-nowrap"
                    >
                      Buy
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )
        )}
      </div>

      {/* Payment modal */}
      {showModal && paymentItem && (
        <PaymentModal
          isOpen={showModal}
          onClose={() => { setShowModal(false); setSelected(null); }}
          item={paymentItem}
          type="bundle"
          bundleCode={selectedBundle.code}
          onSuccess={() => { setShowModal(false); setSelected(null); }}
        />
      )}
    </>
  );
}