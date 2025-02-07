import { useState, useEffect, useRef } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useAuth0 } from "@auth0/auth0-react"
import { FaBars, FaTimes } from "react-icons/fa"
import { Logo } from "./NavBarComponents/NavLogo"
import { DesktopNav } from "./NavBarComponents/DesktopNav"
import { SideIcons } from "./NavBarComponents/SideIcons"
import { AccountDropdown } from "./NavBarComponents/AccountDropDown"
import { SearchBar } from "./NavBarComponents/SearchBar"
import { MobileSidebar } from "./NavBarComponents/MobileSidebar"
import { WhatsAppButton } from "./NavBarComponents/WhatsAppButton"


// import { useState, useEffect, useRef } from "react"
// import { useLocation, useNavigate } from "react-router-dom"
// import { useAuth0 } from "@auth0/auth0-react"
// import { FaBars, FaTimes } from "react-icons/fa"
// import { Logo } from "./Logo"
// import { DesktopNav } from "./DesktopNav"
// import { SideIcons } from "./SideIcons"
// import { AccountDropdown } from "./AccountDropdown"
// import { SearchBar } from "./SearchBar"
// import { MobileSidebar } from "./MobileSidebar"
// import { WhatsAppButton } from "./WhatsAppButton"

const NavbarAdaa = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isNavbarVisible, setIsNavbarVisible] = useState(true)
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false)
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const searchBarRef = useRef(null)
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0()
  const location = useLocation()
  const lastScrollY = 0
  const navigate = useNavigate()

  const handleClear = () => {
    setSearchQuery("")
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
      if (
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target) &&
        !event.target.closest("[aria-label='Search']")
      ) {
        setIsSearchBarVisible(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const toggleSearchBar = () => {
    setIsSearchBarVisible((prev) => !prev)
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

  return (
    <div
      className={`fixed top-0 w-full z-50 transition-transform duration-300 ${
        isNavbarVisible ? "transform-none" : "-translate-y-full"
      }`}
    >
      <div className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button onClick={toggleSidebar} className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition-colors">
              {isSidebarOpen ? <FaTimes className="text-gray-700" /> : <FaBars className="text-gray-700" />}
            </button>
            <Logo />
          </div>

          <DesktopNav />

          <div className="flex items-center space-x-4">
            <SideIcons toggleSearchBar={toggleSearchBar} isSearchBarVisible={isSearchBarVisible} />
            <div className="hidden lg:block">
              <AccountDropdown
                isAuthenticated={isAuthenticated}
                isAccountDropdownOpen={isAccountDropdownOpen}
                setIsAccountDropdownOpen={setIsAccountDropdownOpen}
                handleLoginLogout={handleLoginLogout}
              />
            </div>
            <WhatsAppButton />
          </div>
        </div>
      </div>

      {isSearchBarVisible && (
        <SearchBar
          searchQuery={searchQuery}
          handleSearchChange={handleSearchChange}
          handleSearchSubmit={handleSearchSubmit}
          handleSearchClick={handleSearchClick}
          searchBarRef={searchBarRef}
        />
      )}

      {isSidebarOpen && (
        <MobileSidebar
          toggleSidebar={toggleSidebar}
          isAuthenticated={isAuthenticated}
          handleLoginLogout={handleLoginLogout}
        />
      )}
    </div>
  )
}

export default NavbarAdaa

