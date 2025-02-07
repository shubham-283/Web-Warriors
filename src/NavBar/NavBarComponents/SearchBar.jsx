export const SearchBar = ({ searchQuery, handleSearchChange, handleSearchSubmit, handleSearchClick, searchBarRef }) => (
    <div className="bg-white border-t border-gray-200 p-4 shadow-inner" ref={searchBarRef}>
      <div className="max-w-2xl mx-auto relative">
        <input
          type="text"
          placeholder="Search for products..."
          value={searchQuery}
          onChange={handleSearchChange}
          onKeyPress={handleSearchSubmit}
          className="w-full px-4 py-2 bg-gray-50 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent"
        />
        <button
          onClick={handleSearchClick}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-pink-500 hover:text-pink-600 transition-colors"
        >
          Search
        </button>
      </div>
    </div>
  )
  
  