export default function CategoryTabs({ categories, activeCategory, onCategoryChange }) {
  return (
    <div className="flex gap-2 overflow-x-auto flex-nowrap pb-2 mb-6 scrollbar-hide snap-x snap-mandatory">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={`flex-shrink-0 px-4 py-2 rounded-full whitespace-nowrap transition snap-start ${
            activeCategory === category.id
              ? "bg-blue-600 text-white shadow-md"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
}