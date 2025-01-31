import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const slides = [
  {
    image: "https://img.recraft.ai/gqMKUv-7uVjVoUMaHXVXVn71D13wzDOheMlnLI3CBM4/rs:fit:1536:1024:0/q:95/g:no/plain/abs://prod/images/406b6f13-d17e-400b-a8c6-4effa47ddae3@jpg",
    title: "Summer Collection",
    description: "Discover our latest summer styles, perfect for the sunny season.",
  },
  {
    image: "https://img.recraft.ai/lomxsAO1ekszOoCLMb2DxC1iK8DKXCxJDByBpEdcnUc/rs:fit:1536:1024:0/q:95/g:no/plain/abs://prod/images/c2d29305-e72e-4a5c-8584-826c6261ac36@jpg",
    title: "New Arrivals",
    description: "Check out our freshest looks, designed to elevate your wardrobe.",
  },
  {
    image: "https://img.recraft.ai/f9cjpZmEMvQ7-P8KI_1UVvR1cdmHXQ_ByRrpX1h556I/rs:fit:1536:1024:0/q:95/g:no/plain/abs://prod/images/1bd2c3e2-ee1f-4436-9f9a-53eaee94826d@jpg",
    title: "Sale Up to 50% Off",
    description: "Don't miss out on these amazing deals and shop now.",
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[60vh] md:h-[70vh] lg:h-[700px] overflow-hidden bg-gradient-to-br from-[#D6A9A1] via-[#FFC1C1] to-[#F8E1E1]">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={slide.image || "/placeholder.svg"}
            alt={slide.title}
            className="w-full h-full object-cover brightness-75"
          />
          <div className="absolute inset-0 flex items-center justify-center text-center text-white">
            <div className="max-w-lg px-4 sm:px-6 md:px-8">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-4 drop-shadow-lg">{slide.title}</h2>
              <p className="text-base sm:text-lg md:text-xl mb-4">{slide.description}</p>
              <Link to='/products'>
  <button className="bg-[#FFC1C1] text-[#6B1E3C] px-6 py-2 rounded-full font-semibold hover:bg-[#FF5C8D] transition-all duration-300">
    Shop Now
  </button>
</Link>
            </div>
          </div>
        </div>
      ))}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-6 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-3 hover:bg-opacity-75 transition-colors"
      >
        <ChevronLeft className="h-8 w-8 text-[#6B1E3C]" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-6 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-3 hover:bg-opacity-75 transition-colors"
      >
        <ChevronRight className="h-8 w-8 text-[#6B1E3C]" />
      </button>
    </div>
  );
}
