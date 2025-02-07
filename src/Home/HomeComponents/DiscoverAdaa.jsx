import { useEffect, useRef, useState } from "react"

export default function DiscoverAdaa() {
  const [imageHeight, setImageHeight] = useState("auto")
  const [displayText, setDisplayText] = useState("")
  const [isVisible, setIsVisible] = useState(false)
  const fullText = "Discover Adaa Jaipur"
  const contentRef = useRef(null)
  const headingRef = useRef(null)

  useEffect(() => {
    const updateImageHeight = () => {
      if (contentRef.current) {
        const contentHeight = contentRef.current.offsetHeight
        setImageHeight(`${contentHeight}px`)
      }
    }

    updateImageHeight()
    window.addEventListener("resize", updateImageHeight)

    return () => window.removeEventListener("resize", updateImageHeight)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      {
        threshold: 0.1 // Trigger when 10% of the component is visible
      }
    )

    if (headingRef.current) {
      observer.observe(headingRef.current)
    }

    return () => {
      if (headingRef.current) {
        observer.unobserve(headingRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (!isVisible) return

    let currentIndex = 0
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayText(fullText.slice(0, currentIndex))
        currentIndex++
      } else {
        clearInterval(typingInterval)
      }
    }, 150)

    return () => clearInterval(typingInterval)
  }, [isVisible])

  return (
    <div className="flex flex-col lg:flex-row min-h-screen relative overflow-hidden">
      {/* Left section with image */}
      <div className="relative w-full lg:w-1/2 overflow-hidden" style={{ height: imageHeight }}>
        <img
          src="http://adaajaipur.com/cdn/shop/files/Dicover.jpg?v=1707156739&width=1500"
          alt="Adaa Jaipur - Traditional Indian Fashion"
          className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50"></div>
        <div className="absolute bottom-4 left-4 text-white">
          <h2 className="text-2xl font-bold mb-2">Elegance Redefined</h2>
          <p className="text-sm">Discover the beauty of Indian fashion</p>
        </div>
      </div>

      {/* Right section with text */}
      <div
        ref={contentRef}
        className="flex w-full items-center bg-gradient-to-br from-pink-50 to-pink-100 p-8 lg:w-1/2 lg:p-16"
      >
        <div className="max-w-2xl relative">
          <div className="absolute top-0 right-0 w-24 h-24 bg-pink-200 rounded-full opacity-50 -z-10 animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-pink-200 rounded-full opacity-50 -z-10 animate-pulse"></div>
          <div className="relative" ref={headingRef}>
            <h1 className="mb-6 text-4xl font-bold lg:text-5xl relative group">
              <span className={`text-gray-800 transition-colors duration-300 hover:text-pink-700 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
                {displayText}
              </span>
              <span className={`inline-block w-1 h-8 ml-1 bg-pink-500 ${isVisible ? 'animate-blink' : 'opacity-0'}`}></span>
              <span className={`absolute -bottom-2 left-0 w-full h-1 bg-pink-400 transform origin-left ${isVisible ? 'animate-grow' : 'scale-x-0'}`}></span>
            </h1>
          </div>
          <div className="space-y-6 text-[#2D3B44]">
            <p className="text-lg leading-relaxed">
              Adaa, with its in-house exclusive feminine brand, has earned a strong reputation in the fashion industry.
              With an impressive range of collections, including Kurtis, Palazzos, Gowns, Shararas, and more, Adaa
              caters to the diverse fashion needs of its customers.
            </p>
            <p className="text-lg leading-relaxed">
              Whether you're looking for traditional Indian wear or contemporary outfits, Adaa strives to provide a wide
              selection to suit every taste and occasion.
            </p>
            <p className="text-lg leading-relaxed">
              Adaa has established itself as a go-to destination for Indian women seeking stylish and high-quality
              clothing options. It is widely recognized for offering a comprehensive range of collections that cater to
              the diverse fashion needs of Indian women.
            </p>
            <p className="text-lg leading-relaxed">
              It continues to uphold its reputation for delivering on-trend and sophisticated designs that capture the
              essence of Indian fashion while ensuring comfort and quality.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

const CustomStyles = () => (
  <style jsx global>{`
    @keyframes blink {
      0%, 100% { opacity: 0; }
      50% { opacity: 1; }
    }

    @keyframes grow {
      0% { transform: scaleX(0); }
      100% { transform: scaleX(1); }
    }

    @keyframes fadeIn {
      0% { opacity: 0; }
      100% { opacity: 1; }
    }

    .animate-blink {
      animation: blink 1s infinite;
    }

    .animate-grow {
      animation: grow 0.5s ease-out forwards;
    }

    .animate-fade-in {
      animation: fadeIn 0.3s ease-out forwards;
    }
  `}
</style>
)

export { CustomStyles }