import { Link, useLocation } from "react-router-dom"

const navItems = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about-us" },
  { name: "Collections", path: "/products" },
  { name: "Contact Us", path: "/contact-us" },
]

export const DesktopNav = () => {
  const location = useLocation()

  const renderNavLink = (item) => {
    const isActive = location.pathname === item.path

    return (
      <Link
        key={item.name}
        to={item.path}
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

  return <nav className="hidden lg:flex space-x-6">{navItems.map(renderNavLink)}</nav>
}

