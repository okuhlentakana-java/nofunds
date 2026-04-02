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

const bundles = [
  // Data - Daily bundles
  { id: 1, category: "data", subCategory: "daily", name: "20 MB", description: "Light browsing for the day", validity: "Until midnight", price: "M2.00", badge: "Daily" },
  { id: 2, category: "data", subCategory: "daily", name: "80 MB", description: "Messaging and light social media", validity: "Until midnight", price: "M5.00", badge: "Daily" },
  { id: 3, category: "data", subCategory: "daily", name: "200 MB", description: "Social media and streaming", validity: "Until midnight", price: "M8.00", badge: "Daily" },
  
  // Data - 3-Day bundles
  { id: 4, category: "data", subCategory: "3-day", name: "500 MB", description: "Weekend browsing", validity: "3 days", price: "M12.00", badge: "3-Day" },
  { id: 5, category: "data", subCategory: "3-day", name: "1 GB", description: "Stream and browse", validity: "3 days", price: "M20.00", badge: "3-Day" },
  
  // Data - Weekly bundles
  { id: 6, category: "data", subCategory: "weekly", name: "1 GB", description: "Stream, browse, and download", validity: "7 days", price: "M25.00", badge: "Weekly" },
  { id: 7, category: "data", subCategory: "weekly", name: "2 GB", description: "Heavy usage", validity: "7 days", price: "M45.00", badge: "Weekly" },
  
  // Data - Monthly bundles
  { id: 8, category: "data", subCategory: "monthly", name: "3 GB", description: "Heavy usage, video streaming", validity: "30 days", price: "M60.00", badge: "Monthly" },
  { id: 9, category: "data", subCategory: "monthly", name: "5 GB", description: "Ultimate package", validity: "30 days", price: "M90.00", badge: "Monthly" },
  
  // Voice - Daily bundles
  { id: 10, category: "voice", subCategory: "daily", name: "10 Minutes", description: "Daily calls", validity: "24 hours", price: "M3.00", badge: "Voice" },
  { id: 11, category: "voice", subCategory: "daily", name: "20 Minutes", description: "Daily calling pack", validity: "24 hours", price: "M5.00", badge: "Voice" },
  
  // Voice - 3-Day bundles
  { id: 12, category: "voice", subCategory: "3-day", name: "50 Minutes", description: "Weekend calls", validity: "3 days", price: "M12.00", badge: "Voice" },
  { id: 13, category: "voice", subCategory: "3-day", name: "100 Minutes", description: "3-day calling pack", validity: "3 days", price: "M22.00", badge: "Voice" },
  
  // Voice - Weekly bundles
  { id: 14, category: "voice", subCategory: "weekly", name: "150 Minutes", description: "Weekly calls", validity: "7 days", price: "M30.00", badge: "Voice" },
  { id: 15, category: "voice", subCategory: "weekly", name: "300 Minutes", description: "Weekly unlimited calls", validity: "7 days", price: "M55.00", badge: "Voice" },
  
  // Voice - Monthly bundles
  { id: 16, category: "voice", subCategory: "monthly", name: "500 Minutes", description: "Monthly calls", validity: "30 days", price: "M80.00", badge: "Voice" },
  { id: 17, category: "voice", subCategory: "monthly", name: "1000 Minutes", description: "Monthly unlimited calls", validity: "30 days", price: "M150.00", badge: "Voice" },
  
  // Social - Daily bundles
  { id: 18, category: "social", subCategory: "daily", name: "100 MB", description: "Daily social browsing", validity: "24 hours", price: "M3.00", badge: "Social" },
  { id: 19, category: "social", subCategory: "daily", name: "200 MB", description: "Daily social media", validity: "24 hours", price: "M5.00", badge: "Social" },
  
  // Social - 3-Day bundles
  { id: 20, category: "social", subCategory: "3-day", name: "500 MB", description: "Weekend social pack", validity: "3 days", price: "M10.00", badge: "Social" },
  { id: 21, category: "social", subCategory: "3-day", name: "1 GB", description: "3-day social media", validity: "3 days", price: "M18.00", badge: "Social" },
  
  // Social - Weekly bundles
  { id: 22, category: "social", subCategory: "weekly", name: "1.5 GB", description: "Weekly social pack", validity: "7 days", price: "M25.00", badge: "Social" },
  { id: 23, category: "social", subCategory: "weekly", name: "3 GB", description: "Weekly social media", validity: "7 days", price: "M45.00", badge: "Social" },
  
  // Social - Monthly bundles
  { id: 24, category: "social", subCategory: "monthly", name: "5 GB", description: "Monthly social pack", validity: "30 days", price: "M70.00", badge: "Social" },
  { id: 25, category: "social", subCategory: "monthly", name: "10 GB", description: "Monthly social media", validity: "30 days", price: "M130.00", badge: "Social" },
  
  // Night - Daily bundles
  { id: 26, category: "night", subCategory: "daily", name: "100 MB", description: "Late night browsing", validity: "11pm - 5am", price: "M2.00", badge: "Night" },
  { id: 27, category: "night", subCategory: "daily", name: "200 MB", description: "Night streaming", validity: "11pm - 5am", price: "M3.50", badge: "Night" },
  
  // Night - 3-Day bundles
  { id: 28, category: "night", subCategory: "3-day", name: "500 MB", description: "Weekend night browsing", validity: "11pm - 5am", price: "M8.00", badge: "Night" },
  { id: 29, category: "night", subCategory: "3-day", name: "1 GB", description: "3-day night pack", validity: "11pm - 5am", price: "M15.00", badge: "Night" },
  
  // Night - Weekly bundles
  { id: 30, category: "night", subCategory: "weekly", name: "2 GB", description: "Weekly night browsing", validity: "11pm - 5am", price: "M25.00", badge: "Night" },
  { id: 31, category: "night", subCategory: "weekly", name: "3 GB", description: "Weekly night pack", validity: "11pm - 5am", price: "M35.00", badge: "Night" },
  
  // Night - Monthly bundles
  { id: 32, category: "night", subCategory: "monthly", name: "5 GB", description: "Monthly night browsing", validity: "11pm - 5am", price: "M55.00", badge: "Night" },
  { id: 33, category: "night", subCategory: "monthly", name: "10 GB", description: "Monthly night pack", validity: "11pm - 5am", price: "M100.00", badge: "Night" },
];

const mainCategories = [
  { id: "all", label:(<> <RiStackLine className="inline ml-1"/> All </>)},
  { id: "data", label: (<> <PiLightning className="inline ml-1"/> Data </>)},
  { id: "voice", label: (<> <IoCallOutline className="inline ml-1"/> Voice </>)},
  { id: "social", label: (<> <BsChat className="inline ml-1"/> Social </>)},
  { id: "night", label: (<> <BiSolidMoon className="inline ml-1"/> Night </>)},
  { id: "custom", label:(<> <RxMixerHorizontal className="inline ml-1"/> Custom Mix </>) },
];

const subCategories = [
  { id: "daily", label: "Daily" },
  { id: "3-day", label: "3-Day" },
  { id: "weekly", label: "Weekly" },
  { id: "monthly", label: "Monthly" },
];

export default function BundlesPage() {
  const [activeMainCategory, setActiveMainCategory] = useState("all");
  const [activeSubCategory, setActiveSubCategory] = useState("daily");
  const [selectedBundle, setSelectedBundle] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const getFilteredBundles = () => {
    if (activeMainCategory === "custom") return [];
    
    // For "all" tab, filter by subCategory only
    if (activeMainCategory === "all") {
      return bundles.filter(bundle => bundle.subCategory === activeSubCategory);
    }
    
    // For specific categories (data, voice, social, night), filter by both
    return bundles.filter(bundle => 
      bundle.category === activeMainCategory && bundle.subCategory === activeSubCategory
    );
  };

  const filteredBundles = getFilteredBundles();
  // Show subcategories for all non-custom categories (including "all")
  const showSubCategories = activeMainCategory !== "custom";

  const handleMainCategoryChange = (categoryId) => {
    setActiveMainCategory(categoryId);
    // Reset to daily when switching categories
    setActiveSubCategory("daily");
  };

  const handleBuy = (bundle) => {
    setSelectedBundle(bundle);
    setShowPaymentModal(true);
  };

  const handleClosePayment = () => {
    setShowPaymentModal(false);
    setSelectedBundle(null);
  };

  const getPaymentItem = () => {
    if (!selectedBundle) return null;
    return {
      name: selectedBundle.name,
      description: selectedBundle.description,
      price: selectedBundle.price,
      validity: selectedBundle.validity
    };
  };

  const getBadgeColor = (category) => {
    switch(category) {
      case "data":
        return "bg-blue-100 text-blue-700";
      case "voice":
        return "bg-pink-100 text-pink-700";
      case "social":
        return "bg-purple-100 text-purple-700";
      case "night":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-blue-100 text-blue-700";
    }
  };

  return (
    <>
      <div className="px-4 sm:px-6 mt-6 pb-10">

        {/* Main Categories Tabs - Centered */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex bg-gray-100 rounded-xl p-1 flex-wrap justify-center">
            {mainCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleMainCategoryChange(category.id)}
                className={`px-3 py-2 rounded-lg font-medium transition whitespace-nowrap ${
                  activeMainCategory === category.id
                    ? "bg-blue-900 text-white shadow-sm"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Sub Categories Tabs - Shows for all non-custom categories (including "all") */}
        {showSubCategories && (
          <div className="flex justify-center mb-8">
            <div className="inline-flex gap-2 flex-wrap justify-center">
              {subCategories.map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => setActiveSubCategory(sub.id)}
                  className={`px-5 py-2 rounded-xl text-sm font-medium transition whitespace-nowrap ${
                    activeSubCategory === sub.id
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

        {/* Custom Bundle Builder */}
        {activeMainCategory === "custom" && <CustomBundleBuilder />}

        {/* Bundle Cards */}
        {activeMainCategory !== "custom" && (
          <>
            {filteredBundles.length === 0 ? (
              <div className="text-center py-12">
                <FiFilter className="text-6xl text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 mb-2">No bundles match your filters</p>
                <button
                  onClick={() => {
                    setActiveSubCategory("daily");
                  }}
                  className="text-blue-600 font-semibold hover:underline"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">
                {filteredBundles.map((bundle) => (
                  <div
                    key={bundle.id}
                    className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition"
                  >
                    {/* Badge */}
                    <div className="mb-3">
                      <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full ${getBadgeColor(bundle.category)}`}>
                        {bundle.badge}
                      </span>
                      <h3 className="text-2xl font-bold text-gray-800 mt-2">{bundle.name}</h3>
                      <p className="text-sm text-gray-500 mt-1">{bundle.description}</p>
                      <p className="text-xs text-gray-400 mt-1">{bundle.validity}</p>
                    </div>
                    
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-xl font-bold text-blue-600">{bundle.price}</span>
                      <button 
                        onClick={() => handleBuy(bundle)}
                        className="bg-blue-900 text-white px-4 py-2 rounded-full font-semibold text-sm hover:bg-blue-700 transition"
                      >
                        Buy
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Payment Modal */}
      {showPaymentModal && getPaymentItem() && (
        <PaymentModal 
          isOpen={showPaymentModal}
          onClose={handleClosePayment}
          item={getPaymentItem()}
          type="bundle"
        />
      )}
    </>
  );
}