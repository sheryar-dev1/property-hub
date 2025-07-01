"use client";
import { useState } from "react";

export default function FaqAccordion({ faqs }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      {faqs.map((faq, idx) => (
        <div key={idx} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden transition-all">
          <button
            className="w-full p-4 text-left bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex justify-between items-center focus:outline-none"
            onClick={() => toggle(idx)}
            aria-expanded={openIndex === idx}
          >
            <span className="font-medium text-gray-900 dark:text-white">{faq.question}</span>
            <svg
              className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${openIndex === idx ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div
            className={`transition-all duration-300 bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 px-4 overflow-hidden ${openIndex === idx ? 'max-h-40 py-4' : 'max-h-0 py-0'}`}
            style={{
              maxHeight: openIndex === idx ? '200px' : '0',
              opacity: openIndex === idx ? 1 : 0,
            }}
          >
            {openIndex === idx && <div>{faq.answer}</div>}
          </div>
        </div>
      ))}
    </div>
  );
} 