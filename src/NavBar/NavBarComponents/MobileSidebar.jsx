import { useEffect, useRef } from "react"
import { Link, useLocation } from "react-router-dom"
import { IoChevronBack } from "react-icons/io5"
import { FaRegHeart } from "react-icons/fa"
import { RiShoppingBag3Line } from "react-icons/ri";
import { BiUser, BiLogOut } from "react-icons/bi"
import { PiDress } from "react-icons/pi";

const navItems = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about-us" },
  { name: "Collections", path: "/products" },
  { name: "Contact Us", path: "/contact-us" },
]

export const MobileSidebar = ({ toggleSidebar, isAuthenticated, handleLoginLogout }) => {
  const sidebarRef = useRef(null)
  const location = useLocation()

  useEffect(() => {
    const sidebar = sidebarRef.current
    if (!sidebar) return

    const handleTouchMove = (e) => {
      if (
        (sidebar.scrollTop === 0 && e.touches[0].clientY > 0) ||
        (sidebar.scrollHeight - sidebar.scrollTop === sidebar.clientHeight && e.touches[0].clientY < 0)
      ) {
        e.preventDefault()
      }
    }

    sidebar.addEventListener("touchmove", handleTouchMove, { passive: false })

    return () => {
      sidebar.removeEventListener("touchmove", handleTouchMove)
    }
  }, [])

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === path
    }
    return location.pathname.startsWith(path)
  }

  const renderNavItem = (item, icon = null) => {
    const active = isActive(item.path)
    return (
      <Link
        key={item.name}
        to={item.path}
        onClick={toggleSidebar}
        className={`relative flex items-center px-3 py-2 rounded-lg transition-all duration-300
          ${active ? "text-pink-600 bg-pink-50" : "text-gray-700 hover:text-pink-600 hover:bg-pink-50"}`}
      >
        {icon && <span className="w-5">{icon}</span>}
        <span>{item.name}</span>
        {active && <span className="absolute inset-y-0 left-0 w-1 bg-pink-600 rounded-r-full" />}
      </Link>
    )
  }

  return (
    <div className="fixed inset-y-0 left-0 bg-white z-50 md:w-1/3 w-2/3 lg:hidden shadow-xl overflow-hidden">
      <div ref={sidebarRef} className="h-full overflow-y-auto p-4 flex flex-col">
        <button onClick={toggleSidebar} className="self-end p-2 hover:bg-gray-100 rounded-full transition-colors">
          <IoChevronBack className="h-6 w-6 text-gray-700" />
        </button>

        <nav className="mt-8 mb-16 space-y-2">{navItems.map((item) => renderNavItem(item))}</nav>
        <hr className="border-gray-200" />
        <div className="mt-16 space-y-2">
          {renderNavItem({ name: "Wishlist", path: "/wishlist" }, <FaRegHeart />)}
          {renderNavItem({ name: "Cart", path: "/shoppingcart" }, <RiShoppingBag3Line />)}
          {isAuthenticated && renderNavItem({ name: "My Account", path: "/account" }, <BiUser />)}
          {renderNavItem({ name: "My Orders", path: "/orders" }, <PiDress />)}
          <button
            onClick={() => {
              handleLoginLogout()
              toggleSidebar()
            }}
            className="flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300 w-full text-left text-gray-700 hover:text-pink-600 hover:bg-pink-50"
          >
            <BiLogOut className="w-5" />
            <span>{isAuthenticated ? "Logout" : "Login/Register"}</span>
          </button>
        </div>
      </div>
    </div>
  )
}

