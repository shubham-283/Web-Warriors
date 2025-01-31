import React, { useState, useEffect, useRef } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { FaRegHeart, FaBars, FaTimes, FaChevronDown } from "react-icons/fa"
import { PiShoppingCartSimpleBold } from "react-icons/pi"
import { FiSearch } from "react-icons/fi"
import { BiUser, BiLogOut } from "react-icons/bi"
import { BsWhatsapp } from "react-icons/bs"
import { IoChevronBack } from "react-icons/io5"
import { useAuth0 } from "@auth0/auth0-react"
import { ShoppingBag } from "lucide-react"

const NavbarAdaa = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isNavbarVisible, setIsNavbarVisible] = useState(true)
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false)
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const searchBarRef = useRef(null)
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0()
  const location = useLocation()
  let lastScrollY = 0
  const navigate = useNavigate()

  const handleClear = () => {
    setSearchQuery("")
  }

  const handleIconClick = (action) => {
    console.log(`${action} clicked`)
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const handleLoginLogout = () => {
    if (isAuthenticated) {
      logout({ returnTo: window.location.origin })
    } else {
      loginWithRedirect()
    }
    setIsAccountDropdownOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".account-dropdown")) {
        setIsAccountDropdownOpen(false)
      }
      if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
        setIsSearchBarVisible(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleScroll = () => {
    if (window.scrollY > lastScrollY) {
      setIsNavbarVisible(false)
    } else {
      setIsNavbarVisible(true)
    }
    lastScrollY = window.scrollY <= 0 ? 0 : window.scrollY
  }

  const toggleSearchBar = () => {
    setIsSearchBarVisible(!isSearchBarVisible)
  }

  const handleSearchSubmit = (event) => {
    if (event.key === "Enter" || event.type === "click") {
      console.log("Searching for:", searchQuery)
      if (searchQuery.trim().length >= 3) {
        navigate(`/search-results?query=${encodeURIComponent(searchQuery)}`)
      }
      setIsSearchBarVisible(false)
    }
  }

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value)
  }

  const handleSearchClick = () => {
    handleSearchSubmit({ type: "click" })
  }

  useEffect(() => {
    let lastScrollY = window.scrollY

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsNavbarVisible(false)
      } else {
        setIsNavbarVisible(true)
      }
      lastScrollY = currentScrollY
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about-us" },
    { name: "Collections", path: "/products" },
    { name: "Contact Us", path: "/contact-us" },
  ]

  const sideIcons = [
    {
      label: "Search",
      icon: FiSearch,
      action: toggleSearchBar,
      path: null,
    },
    {
      label: "Wishlist",
      icon: FaRegHeart,
      path: "/wishlist",
    },
    {
      label: "Cart",
      icon: ShoppingBag,
      path: "/shoppingcart",
    },
  ]

  const AccountDropdown = () => (
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

  const renderNavLink = (item, isMobile = false) => {
    const isActive = location.pathname === item.path

    return (
      <Link
        key={item.name}
        to={item.path}
        onClick={() => isMobile && setIsSidebarOpen(false)}
        className={`relative group px-3 py-2 rounded-lg transition-all duration-300 
        ${isActive ? "text-pink-600" : "text-gray-700 hover:text-pink-600"}`}
      >
        {item.name}
        <span
          className={`absolute inset-x-0 bottom-0 h-0.5 bg-pink-400 
          ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"} 
          transition-transform duration-300`}
        />
      </Link>
    )
  }

  return (
    <div
      className={`fixed top-0 w-full z-50 transition-transform duration-300 ${
        isNavbarVisible ? "transform-none" : "-translate-y-full"
      }`}
    >
      <div className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleSidebar}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              {isSidebarOpen ? (
                <FaTimes className="text-gray-700" />
              ) : (
                <FaBars className="text-gray-700" />
              )}
            </button>
            <Link to="/" className="flex items-center space-x-2">
              <img
                src="/adaa-logo.png"
                alt="Company Logo"
                className="h-14 w-auto shadow-md"
              />
            </Link>
          </div>

          <nav className="hidden lg:flex space-x-6">
            {navItems.map((item) => renderNavLink(item))}
          </nav>

          <div className="flex items-center space-x-4">
            {sideIcons.map(({ label, icon: Icon, path, action }, index) => (
              <div key={label} className="relative group" onClick={action ? action : () => {}}>
                {path ? (
                  <Link
                    to={path}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors block"
                  >
                    <Icon className="h-5 w-5 text-gray-700" />
                  </Link>
                ) : (
                  <button className="p-2 hover:bg-gray-100 rounded-full transition-colors block">
                    <Icon className="h-5 w-5 text-gray-700" />
                  </button>
                )}
                <span className="absolute top-full mt-1 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-gray-800 text-white text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                  {label}
                </span>
              </div>
            ))}
            <AccountDropdown />
            <a
              href="https://wa.me/9983170003"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 hover:bg-gray-100 rounded-full transition-colors block"
            >
              <BsWhatsapp className="h-5 w-5 text-green-500" />
            </a>
          </div>
        </div>
      </div>

      {isSearchBarVisible && (
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
      )}

      {isSidebarOpen && (
        <div className="fixed inset-y-0 left-0 bg-white z-50 w-3/4 lg:hidden shadow-xl">
          <div className="p-4 flex flex-col h-full">
            <button
              onClick={toggleSidebar}
              className="self-end p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <IoChevronBack className="h-6 w-6 text-gray-700" />
            </button>

            <nav className="mt-8 mb-16">
              {navItems.map((item) => (
                <div key={item.name} className="mb-4">
                  {renderNavLink(item, true)}
                </div>
              ))}
            </nav>
            <hr className="border-gray-200" />
            <div className="mt-16 space-y-6">
              <Link
                to="/wishlist"
                onClick={() => setIsSidebarOpen(false)}
                className="flex items-center space-x-2 text-gray-600 hover:text-pink-600 transition-colors"
              >
                <FaRegHeart />
                <span>Wishlist</span>
              </Link>

              <Link
                to="/shoppingcart"
                onClick={() => setIsSidebarOpen(false)}
                className="flex items-center space-x-2 text-gray-600 hover:text-pink-600 transition-colors"
              >
                <ShoppingBag className="" />
                <span>Cart</span>
              </Link>

              {isAuthenticated && (
                <Link
                  to="/account"
                  onClick={() => setIsSidebarOpen(false)}
                  className="flex items-center space-x-2 text-gray-600 hover:text-pink-600 transition-colors"
                >
                  <BiUser />
                  <span>My Account</span>
                </Link>
              )}

              <button
                onClick={() => {
                  handleLoginLogout();
                  setIsSidebarOpen(false);
                }}
                className="flex items-center space-x-2 text-gray-600 hover:text-pink-600 transition-colors w-full"
              >
                <BiLogOut />
                <span>{isAuthenticated ? "Logout" : "Login/Register"}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default NavbarAdaa