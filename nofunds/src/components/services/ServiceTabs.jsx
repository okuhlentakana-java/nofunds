const tabs = [
  { id: "all", label: "All Services" },
  { id: "digital", label: "Digital" },
  { id: "finance", label: "Finance" },
  { id: "lifestyle", label: "Lifestyle" },
  { id: "content", label: "Content" },
];

export default function ServiceTabs({ activeTab, onTabChange }) {
  return (
    <div className="flex justify-center flex-wrap gap-2 pb-2 mb-5">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`px-4 py-2 text-sm font-medium rounded-xl transition whitespace-nowrap ${
            activeTab === tab.id
              ? "bg-gradient-to-br from-blue-900 to-blue-600 text-white shadow-sm"
              : "bg-white text-gray-500 border border-gray-200 hover:border-blue-200 hover:text-blue-600"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}