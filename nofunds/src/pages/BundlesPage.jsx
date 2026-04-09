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
import { usePaymentReturn } from "../hooks/UsePaymentReturn";

const bundles = [
  // Data - Daily
  { id: 1,  category: "data",   subCategory: "daily",   name: "20 MB",        description: "Light browsing for the day",         validity: "Until midnight",  price: "M2.00",   badge: "Daily"   },
  { id: 2,  category: "data",   subCategory: "daily",   name: "80 MB",        description: "Messaging and light social media",   validity: "Until midnight",  price: "M5.00",   badge: "Daily"   },
  { id: 3,  category: "data",   subCategory: "daily",   name: "200 MB",       description: "Social media and streaming",         validity: "Until midnight",  price: "M8.00",   badge: "Daily"   },
  // Data - 3-Day
  { id: 4,  category: "data",   subCategory: "3-day",   name: "500 MB",       description: "Weekend browsing",                   validity: "3 days",          price: "M12.00",  badge: "3-Day"   },
  { id: 5,  category: "data",   subCategory: "3-day",   name: "1 GB",         description: "Stream and browse",                  validity: "3 days",          price: "M20.00",  badge: "3-Day"   },
  // Data - Weekly
  { id: 6,  category: "data",   subCategory: "weekly",  name: "1 GB",         description: "Stream, browse, and download",       validity: "7 days",          price: "M25.00",  badge: "Weekly"  },
  { id: 7,  category: "data",   subCategory: "weekly",  name: "2 GB",         description: "Heavy usage",                        validity: "7 days",          price: "M45.00",  badge: "Weekly"  },
  // Data - Monthly
  { id: 8,  category: "data",   subCategory: "monthly", name: "3 GB",         description: "Heavy usage, video streaming",       validity: "30 days",         price: "M60.00",  badge: "Monthly" },
  { id: 9,  category: "data",   subCategory: "monthly", name: "5 GB",         description: "Ultimate package",                   validity: "30 days",         price: "M90.00",  badge: "Monthly" },
  // Voice - Daily
  { id: 10, category: "voice",  subCategory: "daily",   name: "10 Minutes",   description: "Daily calls",                        validity: "24 hours",        price: "M3.00",   badge: "Voice"   },
  { id: 11, category: "voice",  subCategory: "daily",   name: "20 Minutes",   description: "Daily calling pack",                 validity: "24 hours",        price: "M5.00",   badge: "Voice"   },
  // Voice - 3-Day
  { id: 12, category: "voice",  subCategory: "3-day",   name: "50 Minutes",   description: "Weekend calls",                      validity: "3 days",          price: "M12.00",  badge: "Voice"   },
  { id: 13, category: "voice",  subCategory: "3-day",   name: "100 Minutes",  description: "3-day calling pack",                 validity: "3 days",          price: "M22.00",  badge: "Voice"   },
  // Voice - Weekly
  { id: 14, category: "voice",  subCategory: "weekly",  name: "150 Minutes",  description: "Weekly calls",                       validity: "7 days",          price: "M30.00",  badge: "Voice"   },
  { id: 15, category: "voice",  subCategory: "weekly",  name: "300 Minutes",  description: "Weekly unlimited calls",             validity: "7 days",          price: "M55.00",  badge: "Voice"   },
  // Voice - Monthly
  { id: 16, category: "voice",  subCategory: "monthly", name: "500 Minutes",  description: "Monthly calls",                      validity: "30 days",         price: "M80.00",  badge: "Voice"   },
  { id: 17, category: "voice",  subCategory: "monthly", name: "1000 Minutes", description: "Monthly unlimited calls",            validity: "30 days",         price: "M150.00", badge: "Voice"   },
  // Social - Daily
  { id: 18, category: "social", subCategory: "daily",   name: "100 MB",       description: "Daily social browsing",              validity: "24 hours",        price: "M3.00",   badge: "Social"  },
  { id: 19, category: "social", subCategory: "daily",   name: "200 MB",       description: "Daily social media",                 validity: "24 hours",        price: "M5.00",   badge: "Social"  },
  // Social - 3-Day
  { id: 20, category: "social", subCategory: "3-day",   name: "500 MB",       description: "Weekend social pack",                validity: "3 days",          price: "M10.00",  badge: "Social"  },
  { id: 21, category: "social", subCategory: "3-day",   name: "1 GB",         description: "3-day social media",                 validity: "3 days",          price: "M18.00",  badge: "Social"  },
  // Social - Weekly
  { id: 22, category: "social", subCategory: "weekly",  name: "1.5 GB",       description: "Weekly social pack",                 validity: "7 days",          price: "M25.00",  badge: "Social"  },
  { id: 23, category: "social", subCategory: "weekly",  name: "3 GB",         description: "Weekly social media",                validity: "7 days",          price: "M45.00",  badge: "Social"  },
  // Social - Monthly
  { id: 24, category: "social", subCategory: "monthly", name: "5 GB",         description: "Monthly social pack",                validity: "30 days",         price: "M70.00",  badge: "Social"  },
  { id: 25, category: "social", subCategory: "monthly", name: "10 GB",        description: "Monthly social media",               validity: "30 days",         price: "M130.00", badge: "Social"  },
  // Night - Daily
  { id: 26, category: "night",  subCategory: "daily",   name: "100 MB",       description: "Late night browsing",                validity: "11pm - 5am",      price: "M2.00",   badge: "Night"   },
  { id: 27, category: "night",  subCategory: "daily",   name: "200 MB",       description: "Night streaming",                    validity: "11pm - 5am",      price: "M3.50",   badge: "Night"   },
  // Night - 3-Day
  { id: 28, category: "night",  subCategory: "3-day",   name: "500 MB",       description: "Weekend night browsing",             validity: "11pm - 5am",      price: "M8.00",   badge: "Night"   },
  { id: 29, category: "night",  subCategory: "3-day",   name: "1 GB",         description: "3-day night pack",                   validity: "11pm - 5am",      price: "M15.00",  badge: "Night"   },
  // Night - Weekly
  { id: 30, category: "night",  subCategory: "weekly",  name: "2 GB",         description: "Weekly night browsing",              validity: "11pm - 5am",      price: "M25.00",  badge: "Night"   },
  { id: 31, category: "night",  subCategory: "weekly",  name: "3 GB",         description: "Weekly night pack",                  validity: "11pm - 5am",      price: "M35.00",  badge: "Night"   },
  // Night - Monthly
  { id: 32, category: "night",  subCategory: "monthly", name: "5 GB",         description: "Monthly night browsing",             validity: "11pm - 5am",      price: "M55.00",  badge: "Night"   },
  { id: 33, category: "night",  subCategory: "monthly", name: "10 GB",        description: "Monthly night pack",                 validity: "11pm - 5am",      price: "M100.00", badge: "Night"   },
];

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

const getBadgeColor = (category) => {
  switch (category) {
    case "data":   return "bg-blue-100 text-blue-700";
    case "voice":  return "bg-pink-100 text-pink-700";
    case "social": return "bg-purple-100 text-purple-700";
    case "night":  return "bg-gray-100 text-gray-700";
    default:       return "bg-blue-100 text-blue-700";
  }
};

export default function BundlesPage() {
  const [activeMain, setActiveMain]     = useState("all");
  const [activeSub,  setActiveSub]      = useState("daily");
  const [selectedBundle, setSelected]   = useState(null);
  const [showModal, setShowModal]       = useState(false);

  // ── PayFast return detection ─────────────────────────────────────────────
  const { paymentStatus, returnedItem, returnedPhone, clear } = usePaymentReturn();

  // Auto-open modal when PayFast redirects back with ?payment=success|cancelled
  const returnModalOpen      = paymentStatus === "success" || paymentStatus === "cancelled";
  const returnFallbackItem   = returnedItem || { name: "Bundle", description: "", price: "", validity: "" };
  const returnForceSuccess = paymentStatus === "success";
  const returnForceCancelled = paymentStatus === "cancelled";

  // ── Filtering ────────────────────────────────────────────────────────────
  const filteredBundles = (() => {
    if (activeMain === "custom") return [];
    if (activeMain === "all")    return bundles.filter(b => b.subCategory === activeSub);
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
    ? { name: selectedBundle.name, description: selectedBundle.description, price: selectedBundle.price, validity: selectedBundle.validity }
    : null;

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

        {/* Sub category tabs */}
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

        {/* Custom builder */}
        {activeMain === "custom" && <CustomBundleBuilder />}

        {/* Bundle cards */}
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
                  <div>
                    <span className={`inline-block text-[9px] font-semibold px-1.5 py-0.5 rounded-full leading-tight ${getBadgeColor(bundle.category)}`}>
                      {bundle.badge}
                    </span>
                    <div className="mt-1 text-base font-bold leading-tight">{bundle.name}</div>
                    <p className="text-[10px] text-gray-500 leading-tight mt-0.5">{bundle.description}</p>
                    <p className="text-[10px] text-gray-400 leading-tight">{bundle.validity}</p>
                  </div>
                  <div className="flex items-center justify-between mt-2 gap-1">
                    <span className="font-bold text-xs text-blue-600">{bundle.price}</span>
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

      {/* ── Normal modal (user presses Buy) ─────────────────────────────────── */}
      {showModal && paymentItem && (
        <PaymentModal
          isOpen={showModal}
          onClose={() => { setShowModal(false); setSelected(null); }}
          item={paymentItem}
          onSuccess={() => { setShowModal(false); setSelected(null); }}
        />
      )}

      {/* ── Return modal (PayFast redirects back with ?payment=success|cancelled) */}
      {returnModalOpen && (
        <PaymentModal
          isOpen={returnModalOpen}
          onClose={clear}
          item={returnFallbackItem}
          restoredPhone={returnedPhone}
          forceSuccess={returnForceSuccess}
          forceCancelled={returnForceCancelled}
          onSuccess={clear}
        />
      )}
    </>
  );
}