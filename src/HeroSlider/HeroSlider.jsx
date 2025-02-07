import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from 'framer-motion';

const slides = [
  {
    image: "https://img.recraft.ai/gqMKUv-7uVjVoUMaHXVXVn71D13wzDOheMlnLI3CBM4/rs:fit:1536:1024:0/q:95/g:no/plain/abs://prod/images/406b6f13-d17e-400b-a8c6-4effa47ddae3@jpg",
    title: "Summer Collection",
    description: "Discover our latest summer styles, perfect for the sunny season.",
    ctaText: "Shop Collection"
  },
  {
    image: "https://img.recraft.ai/lomxsAO1ekszOoCLMb2DxC1iK8DKXCxJDByBpEdcnUc/rs:fit:1536:1024:0/q:95/g:no/plain/abs://prod/images/c2d29305-e72e-4a5c-8584-826c6261ac36@jpg",
    title: "New Arrivals",
    description: "Check out our freshest looks, designed to elevate your wardrobe.",
    ctaText: "View New In"
  },
  {
    image: "https://img.recraft.ai/f9cjpZmEMvQ7-P8KI_1UVvR1cdmHXQ_ByRrpX1h556I/rs:fit:1536:1024:0/q:95/g:no/plain/abs://prod/images/1bd2c3e2-ee1f-4436-9f9a-53eaee94826d@jpg",
    title: "Sale Up to 50% Off",
    description: "Don't miss out on these amazing deals and shop now.",
    ctaText: "Shop Sale"
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const [direction, setDirection] = useState(1); // 1 for right, -1 for left

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    if (isAutoplay) {
      const timer = setInterval(nextSlide, 5000);
      return () => clearInterval(timer);
    }
  }, [isAutoplay]);

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <div 
      className="relative h-[80vh] md:h-[90vh] lg:h-[800px] overflow-hidden bg-gradient-to-br from-[#D6A9A1] via-[#FFC1C1] to-[#F8E1E1] shadow-lg"
      onMouseEnter={() => setIsAutoplay(false)}
      onMouseLeave={() => setIsAutoplay(true)}
    >
      <AnimatePresence initial={false} custom={direction}>
        {slides.map((slide, index) => (
          index === currentSlide && (
            <motion.div
              key={index}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              className="absolute top-0 left-0 w-full h-full"
            >
              <motion.img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover brightness-75"
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.5 }}
              />
              <div className="absolute inset-0 flex items-center justify-center text-center text-white">
                <div className="max-w-lg px-4 sm:px-6 md:px-8">
                  <motion.h2
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg"
                  >
                    {slide.title}
                  </motion.h2>
                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="text-lg sm:text-xl md:text-2xl mb-6"
                  >
                    {slide.description}
                  </motion.p>
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                  >
                    <Link to='/products'>
                      <button className="bg-[#FF5C8D] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#FFC1C1] hover:scale-105 transition-all duration-300 shadow-md">
                        {slide.ctaText}
                      </button>
                    </Link>
                  </motion.div>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-[30%] bg-gradient-to-t from-black to-transparent opacity-50" />
            </motion.div>
          )
        ))}
      </AnimatePresence>

      {/* Navigation Buttons */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSlide === index 
                ? 'bg-white w-8' 
                : 'bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>

      {/* Arrow Buttons */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-6 transform -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-3 hover:bg-opacity-90 hover:scale-110 transition-all duration-300 shadow-md"
      >
        <ChevronLeft className="h-10 w-10 text-[#6B1E3C]" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-6 transform -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-3 hover:bg-opacity-90 hover:scale-110 transition-all duration-300 shadow-md"
      >
        <ChevronRight className="h-10 w-10 text-[#6B1E3C]" />
      </button>
    </div>
  );
}