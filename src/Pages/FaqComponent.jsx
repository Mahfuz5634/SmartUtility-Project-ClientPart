import React, { useState } from "react";
import { Slide } from "react-awesome-reveal";

const faqs = [
  {
    question: "How can I pay my bills online?",
    answer: "You can pay your bills by logging into your account, selecting 'My Pay Bills', and choosing the bill you want to pay. Then click 'Pay Now'.",
  },
  {
    question: "Which bill categories are supported?",
    answer: "We currently support Electricity, Gas, Water, and Internet bills.",
  },
  {
    question: "Can I download a report of my paid bills?",
    answer: "Yes! On the 'My Pay Bills' page, you can click the 'Download Report' button to get a PDF of all your paid bills.",
  },
  {
    question: "Is my payment information secure?",
    answer: "Absolutely. We use secure encryption methods to protect your payment data.",
  },
  {
    question: "Can I update my personal information?",
    answer: "Yes, you can update your profile details anytime from the 'Profile' section.",
  },
];

const FAQComponent = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  return (
<Slide direction="up" duration={800} triggerOnce className="max-w-6xl mx-auto mt-8 px-4">
      <div className="max-w-3xl mx-auto p-6">
      <title>SmartUtlity-FAQ</title>
      <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border rounded-lg p-4 shadow-sm">
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full text-left flex justify-between items-center font-semibold text-lg"
            >
              {faq.question}
              <span className="ml-2">{activeIndex === index ? "-" : "+"}</span>
            </button>
            {activeIndex === index && (
              <p className="mt-2 text-gray-700">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
</Slide>
  );
};

export default FAQComponent;
