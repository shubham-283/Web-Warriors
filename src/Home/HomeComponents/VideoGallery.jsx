import React, { useRef, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, ChevronUp, ChevronDown, Play, X } from "lucide-react";
import SectionHeader from "./SectionHeading";

const videos = [
  "/Assets/Videos/videogallery1.mp4",
  "/Assets/Videos/videogallery2.mp4",
  "/Assets/Videos/videogallery3.mp4",
  "/Assets/Videos/videogallery4.mp4",
  "/Assets/Videos/videogallery5.mp4",
  "/Assets/Videos/videogallery6.mp4",
  "/Assets/Videos/videogallery7.mp4",
  "/Assets/Videos/videogallery8.mp4",
];

function VideoGallery() {
  const scrollRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (selectedVideo) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedVideo]);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer || isHovered || selectedVideo) return;

    const scrollInterval = setInterval(() => {
      if (scrollContainer) {
        const newIndex = (activeIndex + 1) % videos.length;
        setActiveIndex(newIndex);
        scrollContainer.scrollTo({
          left: newIndex * 320,
          behavior: "smooth"
        });
      }
    }, 3000);

    return () => clearInterval(scrollInterval);
  }, [activeIndex, isHovered, selectedVideo]);

  const handleVideoClick = (video, index) => {
    setSelectedVideo(video);
    setSelectedIndex(index);
  };

  const handleVideoLoadStart = () => {
    setIsLoading(true);
    setError(null);
  };

  const handleVideoLoadedData = () => {
    setIsLoading(false);
  };

  const handleVideoError = () => {
    setIsLoading(false);
    setError("Failed to load video.");
  };

  const handleClose = (e) => {
    e.stopPropagation();
    setSelectedVideo(null);
  };

  const navigateFullscreenVideo = (direction) => {
    const newIndex = direction === 'prev' 
      ? Math.max(0, selectedIndex - 1)
      : Math.min(videos.length - 1, selectedIndex + 1);
    
    setSelectedIndex(newIndex);
    setSelectedVideo(videos[newIndex]);
  };

  const scrollTo = (direction) => {
    const newIndex = direction === 'left' 
      ? Math.max(0, activeIndex - 1)
      : Math.min(videos.length - 1, activeIndex + 1);
    
    setActiveIndex(newIndex);
    scrollRef.current?.scrollTo({
      left: newIndex * 320,
      behavior: "smooth"
    });
  };

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-b from-pink-50 to-pink-100 px-4 py-12">
      {selectedVideo && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative w-full h-full max-w-6xl flex flex-col items-center justify-center">
            <div className="absolute top-4 right-4 z-50">
              <button
                onClick={handleClose}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Close"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            {isMobile ? (
              <>
                <button
                  onClick={() => navigateFullscreenVideo('prev')}
                  className={`absolute top-4 left-1/2 -translate-x-1/2 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors ${
                    selectedIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  disabled={selectedIndex === 0}
                >
                  <ChevronUp className="w-6 h-6 text-white" />
                </button>
                <button
                  onClick={() => navigateFullscreenVideo('next')}
                  className={`absolute bottom-4 left-1/2 -translate-x-1/2 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors ${
                    selectedIndex === videos.length - 1 ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  disabled={selectedIndex === videos.length - 1}
                >
                  <ChevronDown className="w-6 h-6 text-white" />
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigateFullscreenVideo('prev')}
                  className={`absolute left-4 top-1/2 -translate-y-1/2 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors ${
                    selectedIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  disabled={selectedIndex === 0}
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </button>
                <button
                  onClick={() => navigateFullscreenVideo('next')}
                  className={`absolute right-4 top-1/2 -translate-y-1/2 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors ${
                    selectedIndex === videos.length - 1 ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  disabled={selectedIndex === videos.length - 1}
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </button>
              </>
            )}

            <div className="relative w-full h-full max-h-[85vh] flex items-center justify-center">
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 border-4 border-pink-200 border-t-pink-500 rounded-full animate-spin" />
                </div>
              )}

              {error && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-red-400 bg-red-900/20 px-4 py-2 rounded-lg">{error}</p>
                </div>
              )}

              <video
                src={selectedVideo}
                autoPlay
                muted
                className="max-w-full max-h-full rounded-xl shadow-2xl ring-4 ring-pink-200/20"
                style={{ objectFit: "contain" }}
                onLoadStart={handleVideoLoadStart}
                onLoadedData={handleVideoLoadedData}
                onError={handleVideoError}
              />
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        <SectionHeader title="Top Picks by Influencers" backgroundColor="" flourishColor="#6B1E3C" />
        <div
          className="relative group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="absolute -inset-x-4 top-0 h-full bg-gradient-to-r from-pink-50 via-transparent to-pink-50 pointer-events-none" />

          <div className="relative">
            <button
              onClick={() => scrollTo('left')}
              className={`absolute left-2 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/90 shadow-lg transition-all duration-300 hover:bg-pink-100 ${
                activeIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'
              }`}
              disabled={activeIndex === 0}
            >
              <ChevronLeft className="w-6 h-6 text-pink-600" />
            </button>
            
            <button
              onClick={() => scrollTo('right')}
              className={`absolute right-2 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/90 shadow-lg transition-all duration-300 hover:bg-pink-100 ${
                activeIndex === videos.length - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'
              }`}
              disabled={activeIndex === videos.length - 1}
            >
              <ChevronRight className="w-6 h-6 text-pink-600" />
            </button>

            <div
              ref={scrollRef}
              className="flex gap-6 overflow-x-hidden scroll-smooth px-4 py-6"
            >
              {videos.map((video, index) => (
                <div
                  key={index}
                  className="relative group/video shrink-0 w-[280px] h-[360px] sm:w-[300px] sm:h-[400px] md:w-[320px] md:h-[450px] lg:w-[350px] lg:h-[500px] rounded-2xl overflow-hidden shadow-xl transition-all duration-500 hover:scale-105 hover:shadow-2xl"
                  onClick={() => handleVideoClick(video, index)}
                >
                  <video
                    src={video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover/video:opacity-100 transition-opacity duration-300">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="p-4 rounded-full bg-white/20 backdrop-blur-sm">
                        <Play className="w-12 h-12 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center gap-2 mt-6">
            {videos.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? 'bg-pink-500 w-6'
                    : 'bg-pink-200 hover:bg-pink-300'
                }`}
                onClick={() => {
                  setActiveIndex(index);
                  scrollRef.current?.scrollTo({
                    left: index * 320,
                    behavior: "smooth"
                  });
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoGallery;