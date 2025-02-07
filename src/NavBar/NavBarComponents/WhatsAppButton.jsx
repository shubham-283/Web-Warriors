import { BsWhatsapp } from "react-icons/bs"

export const WhatsAppButton = () => (
  <a
    href="https://wa.me/9983170003"
    target="_blank"
    rel="noopener noreferrer"
    className="p-2 hover:bg-gray-100 rounded-full transition-colors block"
  >
    <BsWhatsapp className="h-5 w-5 text-green-500" />
  </a>
)

