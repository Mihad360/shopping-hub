import { useState, useEffect } from "react";
import { FaCircleArrowLeft, FaCircleArrowRight } from "react-icons/fa6";

const Homebanner = ({ slides, autoplayInterval = 3000 }) => {
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

    return (
        <div className="overflow-hidden relative lg:h-[750px] md:h-[500px] sm:h-[400px] h-[300px]">
            <div
                className="flex transition-transform ease-out duration-300"
                style={{
                    transform: `translateX(-${current * 100}%)`,
                }}
            >
                {slides.map((slide, index) => (
                    <img
                        key={index}
                        className="w-full h-full object-cover"
                        src={slide}
                        alt={`Slide ${index + 1}`}
                    />
                ))}
            </div>

            <div className="absolute flex justify-between items-center w-full h-full px-5 md:px-10">
                <button
                    onClick={previousSlide}
                    className="text-white text-2xl lg:text-3xl bg-gray-100 p-2 rounded-full bg-opacity-40 hover:scale-110 transition-all duration-300 ease-in-out"
                >
                    <FaCircleArrowLeft />
                </button>
                <button
                    onClick={nextSlide}
                    className="text-white text-2xl lg:text-3xl bg-gray-100 p-2 rounded-full bg-opacity-40 hover:scale-110 transition-all duration-300 ease-in-out"
                >
                    <FaCircleArrowRight />
                </button>
            </div>

            <div className="absolute bottom-8 flex justify-center w-full gap-3">
                {slides.map((_, i) => (
                    <div
                        key={`circle-${i}`}
                        onClick={() => setCurrent(i)}
                        className={`rounded-full w-2 h-2 md:w-3 md:h-3 cursor-pointer ${
                            i === current ? "bg-white" : "bg-gray-500"
                        }`}
                    ></div>
                ))}
            </div>
        </div>
    );
};

export default Homebanner;
