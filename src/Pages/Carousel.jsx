import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import img1 from "../assets/household-services-utility-bills-regular-payments-as-gas-water-electricity-heating-saving-resources-concept-modern-flat-cartoon-style-illustration-on-white-background-vector.jpg";
import img2 from "../assets/istockphoto-1311503439-612x612.jpg";
import img3 from "../assets/utility-bills-household-services-online-regular-payments-as-gas-water-electricity-heating-saving-resources-concept-modern-flat-cartoon-style-illustration-on-white-background-vector.jpg";
import { Slide} from "react-awesome-reveal";

const CarouselPart = () => {
  return (
    <div className="py-7">
      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-10">
        {/* Left Side: Text Section */}
        <div className="flex-1 text-center lg:text-left">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 dark:text-white">
            <Slide direction="up" duration={800} triggerOnce>
              SmartUtility — Manage Your Bills Smarter ⚡
            </Slide>
          </h1>
           <Slide direction="up" duration={800} triggerOnce>
              <p className="mt-4 text-gray-600 text-lg leading-relaxed dark:text-white">
            Easily monitor and pay your{" "}
            <span className="font-semibold text-[#023e8a]">
              electricity, water, and gas
            </span>{" "}
            bills in one place. Simple. Secure. Smart.
          </p>
            </Slide>

          {/* Buttons */}
          <div className="mt-6 flex justify-center lg:justify-start gap-4">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition">
              Get Started
            </button>
            <button className="border border-blue-600 text-blue-600 px-6 py-2 rounded-lg hover:bg-blue-50 transition">
              Learn More
            </button>
          </div>
        </div>

        {/* Right Side: Carousel */}
        <div className="flex-1">
          <Carousel
            autoPlay
            infiniteLoop
            showThumbs={false}
            showStatus={false}
            interval={3000}
            className="rounded-xl overflow-hidden"
          >
            <div>
              <img
                src={img1}
                alt="Utility illustration"
                className="rounded-md h-[300px] sm:h-[340px] md:h-[380px] lg:h-[400px] w-full object-contain p-4"
              />
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-black/60 text-white px-4 py-2 rounded-lg text-center shadow-lg backdrop-blur-sm">
                <p className="text-lg font-semibold">Use Power Wisely</p>
              </div>
            </div>
            <div>
              <img
                src={img2}
                alt="Bill illustration"
                className="rounded-xl h-[300px] sm:h-[340px] md:h-[380px] lg:h-[400px] w-full object-contain p-4"
              />
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-black/60 text-white px-4 py-2 rounded-lg text-center shadow-lg backdrop-blur-sm">
                <p className="text-lg font-semibold">Light Smart, Live Smart</p>
              </div>
            </div>
            <div>
              <img
                src={img3}
                alt="Gas and water utility"
                className="rounded-xl h-[300px] sm:h-[340px] md:h-[380px] lg:h-[400px] w-full object-contain  p-4"
              />
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-black/60 text-white px-4 py-2 rounded-lg text-center shadow-lg backdrop-blur-sm">
                <p className="text-lg font-semibold">Switch Off. Save Power.</p>
              </div>
            </div>
          </Carousel>
        </div>
      </div>

      {/* Bottom Features */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8 text-gray-700 px-4">
        <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition text-center">
          <h3 className="text-xl font-semibold text-[#0077b6] mb-1">
            ⚡ Easy Billing
          </h3>
          <p>Pay all your bills from one dashboard within seconds.</p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition text-center">
          <h3 className="text-xl font-semibold text-[#0077b6]  mb-1">
            💧 Utility Tracking
          </h3>
          <p>Track your monthly usage for electricity, gas, and water.</p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition text-center">
          <h3 className="text-xl font-semibold text-[#0077b6]  mb-1">
            🔒 Secure Payment
          </h3>
          <p>Your transactions are encrypted and 100% safe.</p>
        </div>
      </div>
    </div>
  );
};

export default CarouselPart;
