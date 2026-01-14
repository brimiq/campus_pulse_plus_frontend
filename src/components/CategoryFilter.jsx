import { useState, useEffect } from "react";

function CategoryFilter({ onCategoryChange, selectedCategory }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock categories (replace with backend later)
    const mockCategories = [
      { id: 1, name: "All Topics" },
      { id: 2, name: "Tech Issues" },
      { id: 3, name: "Facilities" },
      { id: 4, name: "Safety" },
      { id: 5, name: "Dining" },
      { id: 6, name: "Housing" },
    ];

    setTimeout(() => {
      setCategories(mockCategories);
      setLoading(false);
    }, 300);
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    onCategoryChange(value === "all" ? null : value);
  };

  if (loading) {
    return (
      <div className="text-sm text-zinc-500">
        Loading categories…
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <label
        htmlFor="category-select"
        className="text-sm font-medium text-zinc-700"
      >
        Filter by topic:
      </label>

      <select
        id="category-select"
        value={selectedCategory || "all"}
        onChange={handleChange}
        className="
          rounded-lg
          border
          border-zinc-300
          bg-white
          px-3
          py-2
          text-sm
          text-zinc-800
          shadow-sm
          focus:border-indigo-500
          focus:outline-none
          focus:ring-2
          focus:ring-indigo-500
        "
      >
        <option value="all">All Topics</option>

        {categories.slice(1).map((category) => (
          <option key={category.id} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CategoryFilter;
