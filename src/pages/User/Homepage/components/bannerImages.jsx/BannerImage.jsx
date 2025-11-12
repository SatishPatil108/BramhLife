import React, { useEffect, useState } from 'react';
import { assets } from '@/assets/assets';

const BannerImage = () => {
  const images = [assets.bannerimage1, assets.bannerimage3,assets.yogabannerimage1,
  assets.anxityimage, assets.meditation, assets.emotionimage, assets.bethechangeimg, assets.hopeimg, assets.mindimage];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative w-[80%] sm:w-[500px] md:w-[700px] lg:w-[800px] h-[200px] sm:h-[350px] md:h-[450px] mb-6 mt-8 mx-auto overflow-hidden rounded-2xl shadow-lg bg-white transition-all duration-500 hover:shadow-2xl">
      {/* Image */}
      <img
        src={images[currentIndex]}
        alt="banner"
        className="w-full h-full object-cover transition-opacity duration-700 ease-in-out"
      />

      {/* Dots Navigation */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${
              index === currentIndex
                ? 'bg-white scale-125 shadow-md'
                : 'bg-gray-400 hover:bg-gray-300'
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default BannerImage;
