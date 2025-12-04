import React, { useState } from 'react'
import useHomepage from '../../useHomepage';
import { LucideChevronDown } from 'lucide-react'
import { assets } from '@/assets/assets';
import { motion } from "framer-motion";

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const { loading, error, FAQsDetails } = useHomepage();
  const FAQs = FAQsDetails.faqs;

  return (
    <div
      className="max-w-4xl bg-white lg:max-h-[450px] md:max-h-[550px] mx-auto flex flex-col md:flex-row items-start justify-center gap-8 px-6 mb-10"
    >
      {/* Left Image */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="hidden md:flex w-full justify-center items-center"
      >
        <motion.img
          className="max-w-sm w-full rounded-xl h-auto"
          src={assets.music_thumbnail}
          alt=""
          transition={{ type: "spring", stiffness: 200 }}
        />
      </motion.div>

      {/* Right FAQ Section */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full"
      >
        <p className="text-indigo-600 text-sm font-medium">FAQ's</p>
        <h1 className="text-3xl font-semibold">Looking for answer?</h1>
        <p className="text-sm text-slate-500 mt-2 pb-4">
          Find answers to common questions about our courses and coaches.
        </p>

        {FAQs.map((faq, index) => (
          <div
            key={index}
            onClick={() => setOpenIndex(openIndex === index ? null : index)}             
            className="border-b border-slate-200 py-4 cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-base font-medium">
                {faq.question}
              </h3>
              <LucideChevronDown
                className={`${openIndex === index ? "rotate-180" : ""} 
                  transition-all duration-500 ease-in-out w-5 h-5 text-gray-500`}
              />
            </div>

            <p className={`text-sm text-slate-500 overflow-hidden grid transition-all duration-500 ease-in-out 
              ${openIndex === index ? "grid-rows-[1fr] pt-4" : "grid-rows-[0fr]"}`}>
              <span className="overflow-hidden">{faq.answer}</span>
            </p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default FAQPage;
