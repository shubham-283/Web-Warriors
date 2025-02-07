import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { FiSearch } from "react-icons/fi"
import { FaRegHeart } from "react-icons/fa"
import { RiShoppingBag3Line } from "react-icons/ri";

const sideIcons = [
  {
    label: "Search",
    icon: FiSearch,
    action: null,
    path: null,
    showInMobile: true,
  },
  {
    label: "Wishlist",
    icon: FaRegHeart,
    path: "/wishlist",
    showInMobile: false,
  },
  {
    label: "Cart",
    icon: RiShoppingBag3Line,
    path: "/shoppingcart",
    showInMobile: false,
  },
]

export const SideIcons = ({ toggleSearchBar, isSearchBarVisible }) => {
  const [hoveredIcon, setHoveredIcon] = useState(null)
  const [tooltipVisible, setTooltipVisible] = useState(false)

  useEffect(() => {
    let timeoutId
    if (hoveredIcon) {
      setTooltipVisible(true)
      timeoutId = setTimeout(() => {
        setTooltipVisible(false)
      }, 2000) // Hide tooltip after 2 seconds
    }
    return () => {
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [hoveredIcon])

  return (
    <>
      {sideIcons.map(({ label, icon: Icon, path, action, showInMobile }) => (
        <div
          key={label}
          className={`relative group ${!showInMobile ? "hidden lg:block" : ""}`}
          onMouseEnter={() => setHoveredIcon(label)}
          onMouseLeave={() => setHoveredIcon(null)}
        >
          {path ? (
            <Link to={path} className="p-2 hover:bg-gray-100 rounded-full transition-colors block">
              <Icon className="h-5 w-5 text-gray-700" />
            </Link>
          ) : (
            <button
              className={`p-2 hover:bg-gray-100 rounded-full transition-colors block ${label === "Search" && isSearchBarVisible ? "bg-gray-100" : ""}`}
              onClick={label === "Search" ? toggleSearchBar : undefined}
              aria-label={label}
            >
              <Icon className="h-5 w-5 text-gray-700" />
            </button>
          )}
          {hoveredIcon === label && tooltipVisible && (
            <span className="absolute top-full mt-1 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-gray-800 text-white text-xs rounded-md px-2 py-1 transition-opacity duration-200 pointer-events-none">
              {label}
            </span>
          )}
        </div>
      ))}
    </>
  )
}

