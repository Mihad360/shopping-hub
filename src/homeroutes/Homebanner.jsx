import { useEffect, useState } from "react";
import { FaCircleArrowLeft, FaCircleArrowRight } from "react-icons/fa6";

const Homebanner = ({ slides, autoplayInterval = 4000 }) => {
  const [current, setCurrent] = useState(0);

  const previousSlide = () => {
    setCurrent(current === 0 ? slides.length - 1 : current - 1);
  };

  const nextSlide = () => {
    setCurrent(current === slides.length - 1 ? 0 : current + 1);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, autoplayInterval);

    return () => clearInterval(interval);
  }, [current, autoplayInterval]);

  if (slides.length === 0) {
    return (
      <div className="flex justify-center h-screen">
        <p>No carousel data available.</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[600px] mb-10 overflow-hidden container mx-auto">
      {/* Slide images with overlay */}
      <div
                className="flex transition-transform ease-out duration-300"
                style={{
                    transform: `translateX(-${current * 100}%)`,
                  }}
            >
                {slides.map((slide, index) => (
                    <img
                        key={index}
                        className=""
                        src={slide}
                        alt={`Slide ${index + 1}`}
                    />
                ))}
            </div>

      {/* Carousel dot indicators */}
      <div className="absolute bottom-5 w-full flex justify-center space-x-3">
        {slides.map((_, i) => (
          <span
            key={`circle-${i}`}
            onClick={() => setCurrent(i)}
            className={`cursor-pointer h-3 w-3 rounded-full transition-all duration-300 ${
              i === current ? "bg-fuchsia-600 scale-125" : "bg-gray-400"
            }`}
          />
        ))}
      </div>

      {/* Navigation arrows */}
      <div className="absolute flex justify-between items-center w-full h-full px-5 md:px-10">
        <button
          onClick={previousSlide}
          className="text-white text-2xl bg-gray-100 p-2 rounded-full bg-opacity-40 hover:scale-110 transition-all duration-300 ease-in-out"
        >
          <FaCircleArrowLeft />
        </button>
        <button
          onClick={nextSlide}
          className="text-white text-2xl bg-gray-100 p-2 rounded-full bg-opacity-40 hover:scale-110 transition-all duration-300 ease-in-out"
        >
          <FaCircleArrowRight />
        </button>
      </div>
    </div>
  );
};

export default Homebanner;
