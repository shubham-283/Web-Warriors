import React, { useState } from 'react';

const ProductFilters = ({
  filter,
  handleFilterChange,
  uniqueColors,
  productsData,
  getUniqueValues
}) => {
  const uniqueFabrics = getUniqueValues('Fabric');
  const uniqueFabricCare = getUniqueValues('FabricCare');

  // State to manage modal visibility and selected values for each category
  const [modalOpen, setModalOpen] = useState(false);
  const [currentFilterKey, setCurrentFilterKey] = useState('');
  const [selectedColors, setSelectedColors] = useState(filter.color || []);
  const [selectedFabrics, setSelectedFabrics] = useState(filter.fabric || []);
  const [selectedFabricCare, setSelectedFabricCare] = useState(filter.fabricCare || []);

  const FilterDropdown = ({ title, options, filterKey, selectedValues, setSelectedValues }) => (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <label className="text-lg font-semibold text-pink-700 block mb-2">
        Filter by {title}
      </label>
      <button
        type="button"
        onClick={() => {
          setCurrentFilterKey(filterKey);
          setModalOpen(true);
        }}
        className="w-full px-4 py-2 text-left bg-pink-50 border border-pink-200 rounded-md hover:bg-pink-100 transition-colors"
      >
        {selectedValues.length ? `${selectedValues.length} selected` : `Select ${title}`}
      </button>
    </div>
  );

  const PriceRangeFilter = () => (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <label className="text-lg font-semibold text-pink-700 block mb-2">
        Filter by Price
      </label>
      <div className="px-2">
        <input
          type="range"
          min="0"
          max="10000"
          step="100"
          value={filter.priceRange[1]}
          onChange={(e) =>
            handleFilterChange({
              ...filter,
              priceRange: [filter.priceRange[0], parseInt(e.target.value)],
            })
          }
          className="w-full h-2 bg-pink-200 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between mt-2 text-sm text-gray-600">
          <span>₹{filter.priceRange[0]}</span>
          <span>₹{filter.priceRange[1]}</span>
        </div>
      </div>
    </div>
  );

  const SizeFilter = () => (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <label className="text-lg font-semibold text-pink-700 block mb-2">
        Filter by Size
      </label>
      <select
        value={filter.size || ""}
        onChange={(e) => handleFilterChange({ ...filter, size: e.target.value })}
        className="w-full px-4 py-2 bg-pink-50 border border-pink-200 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
      >
        <option value="">All Sizes</option>
        {Array.from(
          new Set(
            productsData
              .map((product) => product.Size)
              .flat()
              .filter(Boolean)
          )
        ).map((size) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </select>
    </div>
  );

  const FilterHeader = () => (
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-xl font-bold text-pink-800">Filters</h3>
      <button
        onClick={() => handleFilterChange({
          size: null,
          priceRange: [0, 10000],
          color: [],
          fabric: [],
          fabricCare: []
        })}
        className="text-sm text-pink-600 hover:text-pink-800 transition-colors"
      >
        Clear All
      </button>
    </div>
  );

  // Modal for selecting filter options
  const FilterModal = () => {
    const handleCheckboxChange = (option) => {
      if (currentFilterKey === 'color') {
        setSelectedColors(prev =>
          prev.includes(option)
            ? prev.filter(c => c !== option)
            : [...prev, option]
        );
      } else if (currentFilterKey === 'fabric') {
        setSelectedFabrics(prev =>
          prev.includes(option)
            ? prev.filter(c => c !== option)
            : [...prev, option]
        );
      } else if (currentFilterKey === 'fabricCare') {
        setSelectedFabricCare(prev =>
          prev.includes(option)
            ? prev.filter(c => c !== option)
            : [...prev, option]
        );
      }
    };

    const getOptions = () => {
      if (currentFilterKey === 'color') return uniqueColors;
      if (currentFilterKey === 'fabric') return uniqueFabrics;
      if (currentFilterKey === 'fabricCare') return uniqueFabricCare;
      return [];
    };

    return (
      <div className={`fixed inset-0 z-50 flex items-center justify-center`}>
        <div
          onClick={() => setModalOpen(false)}
          className={`fixed inset-0 bg-black opacity-50 z-40`}
        />
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md z-50 relative">
          <h3 className="text-lg font-semibold text-pink-700 mb-4">
            Select {currentFilterKey.charAt(0).toUpperCase() + currentFilterKey.slice(1)}
          </h3>

          <div className="max-h-[300px] overflow-y-auto">
            {getOptions().map(option => (
              <label key={option} className="flex items-center cursor-pointer hover:bg-pink-50 p-2 rounded">
                <input
                  type="checkbox"
                  checked={
                    currentFilterKey === 'color'
                      ? selectedColors.includes(option)
                      : currentFilterKey === 'fabric'
                      ? selectedFabrics.includes(option)
                      : selectedFabricCare.includes(option)
                  }
                  onChange={() => handleCheckboxChange(option)}
                  className="form-checkbox h-4 w-4 text-pink-600 rounded border-pink-300 focus:ring-pink-500"
                />
                <span className="ml-2 text-gray-700">{option}</span>
              </label>
            ))}
          </div>

          <div className="flex justify-end mt-4">
            <button
              onClick={() => {
                handleFilterChange({
                  ...filter,
                  [currentFilterKey]: currentFilterKey === 'color'
                    ? selectedColors
                    : currentFilterKey === 'fabric'
                    ? selectedFabrics
                    : selectedFabricCare,
                });
                setModalOpen(false);
              }}
              className="bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-700 transition-colors mr-2"
            >
              Done
            </button>

            <button
              onClick={() => setModalOpen(false)}
              className="border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="bg-pink-50 p-4 rounded-lg sticky top-4">
        <FilterHeader />
        <div className="space-y-4">
          <SizeFilter />
          <PriceRangeFilter />
          <FilterDropdown title="Color" options={uniqueColors} filterKey="color" selectedValues={selectedColors} setSelectedValues={setSelectedColors} />
          <FilterDropdown title="Fabric" options={uniqueFabrics} filterKey="fabric" selectedValues={selectedFabrics} setSelectedValues={setSelectedFabrics} />
          <FilterDropdown title="Fabric Care" options={uniqueFabricCare} filterKey="fabricCare" selectedValues={selectedFabricCare} setSelectedValues={setSelectedFabricCare} />
        </div>
      </div>

      {/* Render the modal */}
      {modalOpen && <FilterModal />}
    </>
  );
};

export default ProductFilters;
