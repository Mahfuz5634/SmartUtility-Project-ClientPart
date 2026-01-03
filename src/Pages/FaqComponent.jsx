import React, { useState } from "react";
import { Slide } from "react-awesome-reveal";

const faqs = [
  {
    question: "How can I pay my bills online?",
    answer:
      "You can pay your bills by logging into your account, selecting 'My Pay Bills', and choosing the bill you want to pay. Then click 'Pay Now'.",
  },
  {
    question: "Which bill categories are supported?",
    answer:
      "We currently support Electricity, Gas, Water, and Internet bills.",
  },
  {
    question: "Can I download a report of my paid bills?",
    answer:
      "Yes! On the 'My Pay Bills' page, you can click the 'Download Report' button to get a PDF of all your paid bills.",
  },
  {
    question: "Is my payment information secure?",
    answer:
      "Absolutely. We use secure encryption methods to protect your payment data.",
  },
  {
    question: "Can I update my personal information?",
    answer:
      "Yes, you can update your profile details anytime from the 'Profile' section.",
  },
];

const FAQComponent = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <Slide
      direction="up"
      duration={800}
      triggerOnce
      className="max-w-6xl mx-auto mt-10 px-4"
    >
      <section className="relative rounded-3xl bg-gradient-to-b from-sky-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 px-4 sm:px-8 py-10 shadow-lg border border-slate-100/80 dark:border-slate-700/80">
        {/* soft decoration */}
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-40">
          <div className="absolute -top-10 right-10 w-40 h-40 rounded-full bg-sky-300/20 blur-3xl" />
          <div className="absolute bottom-0 -left-10 w-48 h-48 rounded-full bg-cyan-400/20 blur-3xl" />
        </div>

        <title>SmartUtility - FAQ</title>

        {/* Header */}
        <div className="text-center mb-8">
          <p className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/80 dark:bg-slate-900/80 border border-sky-100/70 dark:border-slate-700 text-xs sm:text-sm font-medium text-sky-700 dark:text-sky-300 shadow-sm">
            ❓ Need help with SmartUtility?
          </p>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Frequently Asked{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-cyan-500 to-blue-600">
              Questions
            </span>
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm sm:text-base max-w-2xl mx-auto">
            Find quick answers to the most common questions about managing and
            paying your utility bills with SmartUtility.
          </p>
        </div>

        {/* FAQ list */}
        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, index) => {
            const isActive = activeIndex === index;
            return (
              <div
                key={index}
                className={`rounded-2xl border ${
                  isActive
                    ? "border-sky-400 bg-white dark:bg-slate-900"
                    : "border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80"
                } shadow-sm transition-all duration-200`}
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between gap-3 px-4 sm:px-5 py-3 sm:py-4 text-left"
                >
                  <span className="font-semibold text-sm sm:text-base text-slate-900 dark:text-white">
                    {faq.question}
                  </span>
                  <span
                    className={`flex h-7 w-7 items-center justify-center rounded-full text-sm font-bold border transition-all ${
                      isActive
                        ? "bg-sky-500 text-white border-sky-500"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-200 border-slate-200 dark:border-slate-700"
                    }`}
                  >
                    {isActive ? "−" : "+"}
                  </span>
                </button>

                <div
                  className={`px-4 sm:px-5 pb-3 sm:pb-4 text-sm text-gray-700 dark:text-gray-300 transition-[max-height,opacity] duration-200 ease-out ${
                    isActive ? "max-h-40 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
                  }`}
                >
                  {faq.answer}
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-8 text-center text-xs sm:text-sm text-gray-500 dark:text-gray-400">
          Didn’t find your answer?{" "}
          <span className="font-semibold text-sky-600 dark:text-sky-300">
            Contact support from your dashboard for more help.
          </span>
        </div>
      </section>
    </Slide>
  );
};

export default FAQComponent;
