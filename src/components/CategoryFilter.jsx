import { useState, useEffect } from 'react';
import './CategoryFilter.css';

function CategoryFilter({ onCategoryChange, selectedCategory }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock categories - will fetch from backend later
    const mockCategories = [
      { id: 1, name: 'All Topics' },
      { id: 2, name: 'Tech Issues' },
      { id: 3, name: 'Facilities' },
      { id: 4, name: 'Safety' },
      { id: 5, name: 'Dining' },
      { id: 6, name: 'Housing' }
    ];

    setTimeout(() => {
      setCategories(mockCategories);
      setLoading(false);
    }, 300);

    // Real implementation will be:
    // fetch('/api/categories')
    //   .then(res => res.json())
    //   .then(data => setCategories([{ id: 0, name: 'All Topics' }, ...data]))
    //   .finally(() => setLoading(false));
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    onCategoryChange(value === 'all' ? null : value);
  };

  if (loading) {
    return <div className="category-filter-loading">Loading categories...</div>;
  }

  return (
    <div className="category-filter">
      <label htmlFor="category-select" className="filter-label">
        Filter by Topic:
      </label>
      <select
        id="category-select"
        className="category-select"
        value={selectedCategory || 'all'}
        onChange={handleChange}
      >
        <option value="all">All Topics</option>
        {categories.slice(1).map(category => (
          <option key={category.id} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CategoryFilter;