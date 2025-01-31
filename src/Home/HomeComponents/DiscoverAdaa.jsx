import React from "react";

export default function DiscoverAdaa() {
  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      {/* Left section with image */}
      <div className="relative h-[300px] w-full lg:h-screen lg:w-1/2">
        <img
          src="http://adaajaipur.com/cdn/shop/files/Dicover.jpg?v=1707156739&width=1500"
          alt="Adaa Jaipur - Traditional Indian Fashion"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Right section with text */}
      <div className="flex w-full items-center bg-pink-50 p-8 lg:w-1/2 lg:p-16">
        <div className="max-w-2xl">
          <h1 className="mb-6 text-4xl font-bold text-[#1A2B34] lg:text-5xl">Discover Adaa Jaipur</h1>
          <div className="space-y-6 text-[#2D3B44]">
            <p>
              Adaa, with its in-house exclusive feminine brand, has earned a strong reputation in the fashion industry.
              With an impressive range of collections, including Kurtis, Palazzos, Gowns, Shararas, and more, Adaa
              caters to the diverse fashion needs of its customers. Whether you're looking for traditional Indian
              wear or contemporary outfits, Adaa strives to provide a wide selection to suit every taste and occasion.
            </p>
            <p>
              Adaa has established itself as a go-to destination for Indian women seeking stylish and high-quality
              clothing options. It is widely recognized for offering a comprehensive range of collections that cater to
              the diverse fashion needs of Indian women. It continues to uphold its reputation for delivering on-trend
              and sophisticated designs that capture the essence of Indian fashion while ensuring comfort and quality.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}