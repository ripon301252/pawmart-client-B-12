import React from "react";
import { useNavigate } from "react-router";

const SlideBanner = () => {

   const navigate = useNavigate();

  // handle slide
  const handleSlide = (e, id) => {
    e.preventDefault();
    document.querySelector(id)?.scrollIntoView({
      behavior: "smooth", 
      inline: "center",
      block: "nearest",
    });
  };

  return (
    <div className="relative pt-8 pb-12 mt-8 rounded-2xl border border-gray-700 dark:bg-gray-700">
      <section className="max-w-6xl mx-auto mt-6 px-4 md:px-0 relative">
        <div className="carousel w-full rounded-2xl overflow-hidden relative">

          {/* Slide 1 */}
          <div id="slide1" className="carousel-item relative w-full">
            <img
              src="https://i.ibb.co/k2hrLXz2/slide1.jpg"
              className="w-full h-60 sm:h-80 md:h-[450px] object-cover rounded-2xl"
              alt="Slide 1"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent flex flex-col justify-center items-center text-center px-4 sm:px-6 md:px-16">
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-3 drop-shadow-md">
                Find Your Furry Friend Today! 🐾
              </h2>
              <p className="text-white/90 text-sm sm:text-lg md:text-xl max-w-2xl mb-5">
                Adopt adorable pets and shop premium pet products in one place!
              </p>
              <button className="bg-[#644aca] hover:bg-[#482db4] text-white font-semibold px-6 sm:px-8 py-2 sm:py-3 rounded-full shadow-md transition duration-300 text-sm sm:text-base">
                Adopt Now
              </button>
            </div>

            {/* Navigation Arrows */}
            <div className="absolute flex justify-between transform -translate-y-1/2 top-1/2 left-3 right-3">
              <a
                href="#slide3"
                onClick={(e) => handleSlide(e, "#slide3")}
                className="btn btn-circle bg-white/20 hover:bg-[#644aca] text-white border-none"
              >
                ❮
              </a>
              <a
                href="#slide2"
                onClick={(e) => handleSlide(e, "#slide2")}
                className="btn btn-circle bg-white/20 hover:bg-[#644aca] text-white border-none"
              >
                ❯
              </a>
            </div>
          </div>

          {/* Slide 2 */}
          <div id="slide2" className="carousel-item relative w-full">
            <img
              src="https://i.ibb.co/zHJrKQbP/slide2.jpg"
              className="w-full h-60 sm:h-80 md:h-[450px] object-cover rounded-2xl"
              alt="Slide 2"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent flex flex-col justify-center items-center text-center px-4 sm:px-6 md:px-16">
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-3 drop-shadow-md">
                Adopt, Don’t Shop — Give a Pet a Home. 🐕
              </h2>
              <p className="text-white/90 text-sm sm:text-lg md:text-xl max-w-2xl mb-5">
                Find premium food, toys, and care products for your pets.
              </p>
              <button className="bg-[#644aca] hover:bg-[#482db4] text-white font-semibold px-6 sm:px-8 py-2 sm:py-3 rounded-full shadow-md transition duration-300 text-sm sm:text-base">
                Shop Now
              </button>
            </div>

            <div className="absolute flex justify-between transform -translate-y-1/2 top-1/2 left-3 right-3">
              <a
                href="#slide1"
                onClick={(e) => handleSlide(e, "#slide1")}
                className="btn btn-circle bg-white/20 hover:bg-[#644aca] text-white border-none"
              >
                ❮
              </a>
              <a
                href="#slide3"
                onClick={(e) => handleSlide(e, "#slide3")}
                className="btn btn-circle bg-white/20 hover:bg-[#644aca] text-white border-none"
              >
                ❯
              </a>
            </div>
          </div>

          {/* Slide 3 */}
          <div id="slide3" className="carousel-item relative w-full">
            <img
              src="https://i.ibb.co/S47SGFvJ/slide3.jpg"
              className="w-full h-60 sm:h-80 md:h-[450px] object-cover rounded-2xl"
              alt="Slide 3"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent flex flex-col justify-center items-center text-center px-4 sm:px-6 md:px-16">
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-3 drop-shadow-md">
                Because Every Pet Deserves Love and Care. ❤️
              </h2>
              <p className="text-white/90 text-sm sm:text-lg md:text-xl max-w-2xl mb-5">
                Keep your pets happy and healthy with PawMart’s expert tips.
              </p>
              <button className="bg-[#644aca] hover:bg-[#482db4] text-white font-semibold px-6 sm:px-8 py-2 sm:py-3 rounded-full shadow-md transition duration-300 text-sm sm:text-base">
                Learn More
              </button>
            </div>

            <div className="absolute flex justify-between transform -translate-y-1/2 top-1/2 left-3 right-3">
              <a
                href="#slide2"
                onClick={(e) => handleSlide(e, "#slide2")}
                className="btn btn-circle bg-white/20 hover:bg-[#644aca] text-white border-none"
              >
                ❮
              </a>
              <a
                href="#slide1"
                onClick={(e) => handleSlide(e, "#slide1")}
                className="btn btn-circle bg-white/20 hover:bg-[#644aca] text-white border-none"
              >
                ❯
              </a>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default SlideBanner;
