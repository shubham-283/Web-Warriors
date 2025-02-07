import { Link } from "react-router-dom"
import { BiUser } from "react-icons/bi"
import { FaChevronDown } from "react-icons/fa"

export const AccountDropdown = ({
  isAuthenticated,
  isAccountDropdownOpen,
  setIsAccountDropdownOpen,
  handleLoginLogout,
}) => (
  <div className="account-dropdown relative">
    <button
      onClick={(e) => {
        e.stopPropagation()
        setIsAccountDropdownOpen(!isAccountDropdownOpen)
      }}
      className="flex items-center space-x-1 p-2 hover:bg-gray-100 rounded-full transition-colors"
    >
      <BiUser className="h-5 w-5 text-gray-700" />
      <FaChevronDown
        className={`h-3 w-3 text-gray-700 transition-transform duration-200 ${
          isAccountDropdownOpen ? "rotate-180" : ""
        }`}
      />
    </button>

    {isAccountDropdownOpen && (
      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50">
        {isAuthenticated && (
          <Link
            to="/account"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-pink-50 transition-colors"
            onClick={() => setIsAccountDropdownOpen(false)}
          >
            My Account
          </Link>
        )}
        <Link
        to='/orders'
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-pink-50 transition-colors"
        onClick={() => setIsAccountDropdownOpen(false)}>
        My Orders
        </Link>
        <Link
        to='/return-requests'
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-pink-50 transition-colors"
        onClick={() => setIsAccountDropdownOpen(false)}>
        Return Requests
        </Link>
        <button
          onClick={handleLoginLogout}
          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-pink-50 transition-colors"
        >
          {isAuthenticated ? "Logout" : "Login/Register"}
        </button>
      </div>
    )}
  </div>
)

