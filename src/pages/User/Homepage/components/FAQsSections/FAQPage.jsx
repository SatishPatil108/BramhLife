import React, { useState } from 'react'
import useHomepage from '../../useHomepage';
import { LucideChevronDown } from 'lucide-react'
import { assets } from '@/assets/assets';

const FAQPage = () => {
    const [openIndex, setOpenIndex] = useState(null);
    const { loading, error, FAQsDetails } = useHomepage();
    const FAQs = FAQsDetails.faqs;
     
    return (
        <>
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-start justify-center  gap-8 px-4 md:px-0 mb-18 my-20">
                <img
                    className="max-w-sm w-full rounded-xl h-auto"
                    src={assets.music_thumbnail}
                    alt=""
                />
                <div>
                    <p className="text-indigo-600 text-sm font-medium">FAQ's</p>
                    <h1 className="text-3xl font-semibold">Looking for answer?</h1>
                    <p className="text-sm text-slate-500 mt-2 pb-4">
                       Find answers to common questions about our courses and coaches.
                    </p>
                    {FAQs.map((faq, index) => (
                        <div className="border-b border-slate-200 py-4 cursor-pointer" key={index} onClick={() => setOpenIndex(openIndex === index ? null : index)}>
                            <div className="flex items-center justify-between">
                                <h3 className="text-base font-medium">
                                    {faq.question}
                                </h3>

                                <LucideChevronDown className={`${openIndex === index ? "rotate-180" : ""} transition-all duration-500 ease-in-out w-5 h-5 text-gray-500`}/>
    
                            </div>
                            <p className={`text-sm text-slate-500 transition-all duration-500 ease-in-out max-w-md ${openIndex === index ? "opacity-100 max-h-[300px] translate-y-0 pt-4" : "opacity-0 max-h-0 -translate-y-2"}`} >
                                {faq.answer}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );

}

export default FAQPage;