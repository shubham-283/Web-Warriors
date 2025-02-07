import React from "react"
import { FaFacebookF, FaInstagram, FaYoutube, FaPinterest } from "react-icons/fa"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#232F3E] to-[#232F3E] text-[#F8F8F8] py-16 relative">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Left Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center md:text-left"
          >
            <img
              src="/adaa-logo.png"
              alt="Adaa Jaipur Logo"
              className="w-32 mx-auto md:mx-0 mb-6 shadow-lg"
            />
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <p className="mb-2">
              <span className="font-medium">Email:</span> adaajaipur4india@gmail.com
            </p>
            <p className="mb-4">
              <span className="font-medium">Phone:</span> +91 9828170003
            </p>
            <p className="font-medium mb-2">Address:</p>
            <p>H-5, Riico Mansarovar Industrial Area</p>
            <p>Jaipur - 302020, Rajasthan, India</p>
          </motion.div>

          {/* Center Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center"
          >
            <h3 className="text-xl font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/sale" className="hover:text-pink-500 transition-colors duration-300">
                  Sale
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-pink-500 transition-colors duration-300">
                  Our Collections
                </Link>
              </li>
              <li>
                <Link to="/size-chart" className="hover:text-pink-500 transition-colors duration-300">
                  Size Chart
                </Link>
              </li>
              <li>
                <Link to="/about-us" className="hover:text-pink-500 transition-colors duration-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact-us" className="hover:text-pink-500 transition-colors duration-300">
                  Contact Us
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Right Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center md:text-right"
          >
            <h3 className="text-xl font-semibold mb-6">Policies</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/refund-policy" className="hover:text-pink-500 transition-colors duration-300">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link to="/shipping-policy" className="hover:text-pink-500 transition-colors duration-300">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-of-service" className="hover:text-pink-500 transition-colors duration-300">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:text-pink-500 transition-colors duration-300">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Social Media Icons and Footer Bottom */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <div className="flex justify-center space-x-6 mb-8">
            {[
              { icon: FaFacebookF, href: "https://www.facebook.com/Adaajaipur.official?_rdr" },
              { icon: FaInstagram, href: "https://www.instagram.com/adaajaipur.official/" },
              { icon: FaYoutube, href: "https://www.youtube.com/channel/UC9Ccd68grj8EgEwHd3d8G_A" },
              { icon: FaPinterest, href: "https://in.pinterest.com/adaajaipur/" },
            ].map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl hover:text-pink-500 transition-colors duration-300"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <social.icon />
              </motion.a>
            ))}
          </div>
          <div className="border-t border-gray-600 pt-8">
            <p className="text-sm">&copy; {new Date().getFullYear()} Adaa Jaipur. All rights reserved.</p>
          </div>
        </motion.div>
        <br/>

        {/* Background Image at Bottom */}
        <div className="opacity-100"
          style={{
            backgroundImage: 'url("/footerbg[1].png")',
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            width: '100%',
            height: '100px', // Adjust height as needed for your design
            position: 'absolute',
            bottom: 0,
            left: 0,
            zIndex: 2,
          }} 
        />
      </div>
    </footer>
  )
}

export default Footer;
