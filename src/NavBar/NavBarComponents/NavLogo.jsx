import { Link } from "react-router-dom"

export const Logo = () => (
  <Link to="/" className="flex items-center space-x-2">
    <img src="/adaa-logo.png" alt="Company Logo" className="h-14 w-auto shadow-md" />
  </Link>
)

