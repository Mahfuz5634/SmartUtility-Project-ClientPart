import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import img1 from "../assets/household-services-utility-bills-regular-payments-as-gas-water-electricity-heating-saving-resources-concept-modern-flat-cartoon-style-illustration-on-white-background-vector.jpg";
import img2 from "../assets/istockphoto-1311503439-612x612.jpg";
import img3 from "../assets/utility-bills-household-services-online-regular-payments-as-gas-water-electricity-heating-saving-resources-concept-modern-flat-cartoon-style-illustration-on-white-background-vector.jpg";
import { Slide } from "react-awesome-reveal";

const CarouselPart = () => {
  return (
    <section className="relative py-12 lg:py-18 overflow-hidden">
      {/* Background gradient */}
      <div className="pointer-events-none absolute inset-0 -z-10  dark:from-slate-950 dark:via-slate-900 dark:to-slate-950" />
      {/* Soft blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-50">
        <div className="absolute -top-16 right-0 w-52 h-52 rounded-full bg-sky-300/25 blur-3xl" />
        <div className="absolute bottom-0 -left-12 w-60 h-60 rounded-full bg-cyan-400/20 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col lg:flex-row items-center gap-12">
        {/* Left: Text */}
        <div className="flex-1 text-center lg:text-left space-y-5">
          <Slide direction="up" duration={800} triggerOnce>
            <p className="inline-flex items-center gap-2 rounded-full bg-white/80 dark:bg-slate-800/70 backdrop-blur-md px-4 py-1 text-xs sm:text-sm font-medium text-sky-700 dark:text-sky-300 border border-sky-100/70 dark:border-slate-700 shadow-sm">
              ⚡ SmartUtility · All-in-one utility management
            </p>
          </Slide>

          <Slide direction="up" duration={800} triggerOnce>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
              Manage your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-cyan-500 to-blue-600">
                bills smarter
              </span>
              , live stress-free.
            </h1>
          </Slide>

          <Slide direction="up" duration={800} triggerOnce>
            <p className="mt-1 text-gray-600 dark:text-gray-300 text-base sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
              Easily monitor and pay your{" "}
              <span className="font-semibold text-[#023e8a] dark:text-sky-300">
                electricity, water, and gas
              </span>{" "}
              bills in one secure dashboard with real-time insights.
            </p>
          </Slide>

          <Slide direction="up" duration={900} triggerOnce>
            <div className="mt-4 flex flex-wrap justify-center lg:justify-start gap-4">
              <button className="bg-gradient-to-r from-[#0077b6] to-[#00b4d8] hover:shadow-lg hover:scale-[1.02] text-white px-7 py-2.5 rounded-lg shadow-md transition-all text-sm sm:text-base font-semibold">
                Get Started
              </button>
              <button className="border border-blue-600/70 text-blue-700 dark:text-sky-300 dark:border-sky-500 px-7 py-2.5 rounded-lg hover:bg-blue-50/70 dark:hover:bg-slate-800 transition-all text-sm sm:text-base font-semibold">
                Learn More
              </button>
            </div>
          </Slide>

          <Slide direction="up" duration={900} triggerOnce>
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs sm:text-sm mt-3 text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Instant bill overview</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-sky-500" />
                <span>Multi-utility support</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span>Secure encrypted payments</span>
              </div>
            </div>
          </Slide>
        </div>

        {/* Right: Carousel */}
        <div className="flex-1 w-full">
          <div className="relative rounded-2xl bg-white/80 dark:bg-slate-900/70 backdrop-blur-md border border-white/70 dark:border-slate-700 shadow-2xl">
            <div className="pointer-events-none absolute -inset-0.5 rounded-2xl bg-gradient-to-tr from-sky-500/30 via-cyan-400/10 to-blue-600/30 opacity-70 blur-2xl -z-10" />
            <Carousel
              autoPlay
              infiniteLoop
              showThumbs={false}
              showStatus={false}
              interval={3000}
              showIndicators={true}
              swipeable
              emulateTouch
              className="rounded-2xl overflow-hidden"
            >
              <div className="relative">
                <img
                  src={img1}
                  alt="Utility illustration"
                  className="h-[260px] sm:h-[320px] md:h-[360px] lg:h-[380px] w-full object-contain p-4"
                />
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/65 dark:bg-black/75 text-white px-4 py-2 rounded-full text-xs sm:text-sm md:text-base shadow-lg backdrop-blur-md">
                  Use power wisely, save more.
                </div>
              </div>
              <div className="relative">
                <img
                  src={img2}
                  alt="Bill illustration"
                  className="h-[260px] sm:h-[320px] md:h-[360px] lg:h-[380px] w-full object-contain p-4"
                />
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/65 dark:bg-black/75 text-white px-4 py-2 rounded-full text-xs sm:text-sm md:text-base shadow-lg backdrop-blur-md">
                  Light smart, live smarter.
                </div>
              </div>
              <div className="relative">
                <img
                  src={img3}
                  alt="Gas and water utility"
                  className="h-[260px] sm:h-[320px] md:h-[360px] lg:h-[380px] w-full object-contain p-4"
                />
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/65 dark:bg-black/75 text-white px-4 py-2 rounded-full text-xs sm:text-sm md:text-base shadow-lg backdrop-blur-md">
                  Track usage, control costs.
                </div>
              </div>
            </Carousel>
          </div>
        </div>
      </div>

      {/* Feature cards under hero */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10 px-4">
        <Slide direction="up" duration={700} triggerOnce>
          <div className="group relative bg-white/85 dark:bg-slate-900/80 backdrop-blur-lg rounded-2xl p-6 border border-slate-100/80 dark:border-slate-700/80 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-200 text-center">
            {/* gradient glow */}
            <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-sky-500/18 via-cyan-400/12 to-blue-600/18 opacity-0 group-hover:opacity-100 blur-xl -z-10 transition-opacity" />
            {/* icon chip */}
            <div className="mx-auto mb-3 flex items-center justify-center w-11 h-11 rounded-2xl bg-sky-50 dark:bg-sky-900/40 text-xl">
              <span>⚡</span>
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-[#0077b6] mb-2">
              Easy Billing
            </h3>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
              Pay all your bills from a single dashboard in just a few clicks.
            </p>
          </div>
        </Slide>

        <Slide direction="up" duration={800} triggerOnce>
          <div className="group relative bg-white/85 dark:bg-slate-900/80 backdrop-blur-lg rounded-2xl p-6 border border-slate-100/80 dark:border-slate-700/80 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-200 text-center">
            <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-sky-500/18 via-cyan-400/12 to-blue-600/18 opacity-0 group-hover:opacity-100 blur-xl -z-10 transition-opacity" />
            <div className="mx-auto mb-3 flex items-center justify-center w-11 h-11 rounded-2xl bg-sky-50 dark:bg-sky-900/40 text-xl">
              <span>💧</span>
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-[#0077b6] mb-2">
              Utility Tracking
            </h3>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
              Monitor monthly electricity, gas, and water usage with trends.
            </p>
          </div>
        </Slide>

        <Slide direction="up" duration={900} triggerOnce>
          <div className="group relative bg-white/85 dark:bg-slate-900/80 backdrop-blur-lg rounded-2xl p-6 border border-slate-100/80 dark:border-slate-700/80 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-200 text-center">
            <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-sky-500/18 via-cyan-400/12 to-blue-600/18 opacity-0 group-hover:opacity-100 blur-xl -z-10 transition-opacity" />
            <div className="mx-auto mb-3 flex items-center justify-center w-11 h-11 rounded-2xl bg-sky-50 dark:bg-sky-900/40 text-xl">
              <span>🔒</span>
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-[#0077b6] mb-2">
              Secure Payments
            </h3>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
              Bank-grade encryption keeps every transaction safe and private.
            </p>
          </div>
        </Slide>
      </div>
    </section>
  );
};

export default CarouselPart;
