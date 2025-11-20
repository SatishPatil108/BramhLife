import React, { useState, useEffect } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import useFrequentlyAskQue from "./useFrequentlyAskQue";
import CustomButton from "@/components/CustomButton";
import CustomDrawer from "@/components/CustomDrawer";
import { useDispatch } from "react-redux";
import {
  addNewFAQAPI,
  deleteFAQAPI,
  fetchFAQsAPI,
  updateFAQAPI,
} from "@/store/feature/admin";
import usePagination from "@/hooks/usePagination";
import { toast } from 'react-toastify'
import { SquarePen, Trash2 } from "lucide-react";

const FrequentlyAskQue = () => {
  const dispatch = useDispatch();
  const { pageNo, pageSize, nextPage, prevPage } = usePagination(1, 6);
  const { faqsDetails, loading, error } = useFrequentlyAskQue(pageNo, pageSize);

  const faqList = faqsDetails.faqs;

  const [openIndex, setOpenIndex] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [formData, setFormData] = useState({ id: null, question: "", answer: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState(false);

  const toggleFAQ = (index) => setOpenIndex(openIndex === index ? null : index);

  const handleAddFAQ = () => {
    setIsEditing(false);
    setFormData({ question: "", answer: "" });
    setIsDrawerOpen(true);
  };

  const resetForm = () => {
    setIsDrawerOpen(false);
    setIsEditing(false);
    setErrors({});
  }

  const handleEditFAQ = (faq) => {
    setIsEditing(true);
    setErrors({});
    setFormData({ id: faq.id, question: faq.question, answer: faq.answer });
    setIsDrawerOpen(true);
  };

  const handleDeleteFAQ = async (id) => {
    if (window.confirm("Are you sure you want to delete this FAQ?")) {
      const toastId = toast.loading('Deleting a FAQs...');

      await dispatch(deleteFAQAPI(id)).unwrap().then(() => {
        toast.update(toastId, {
          render: "FAQs is Deleted Successfully 🎉",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
        
      }).catch((error) => {
        console.error(error);
        toast.update(toastId, {
          render: "Failed to Delete a FAQs!",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        })
      });
      dispatch(fetchFAQsAPI({ pageNo, pageSize }));
    }
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const validateForm = () => {
    let isValid = true;
    const errors = {};
    if (!formData.question.trim()) {
      errors.question = "Ask the question is required.";
      isValid = false;
    }

    if (!formData.answer) {
      errors.answer = "FAQs answer is required.";
      isValid = false;
    }
    return { errors, isValid };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { errors, isValid } = validateForm();
    setErrors(errors);
    if (!isValid) return;

    try {
      if (isEditing) {
        const toastId = toast.loading('Editing the FAQs....');

        await dispatch(
          updateFAQAPI({
            faqId: formData.id,
            faqData: { question: formData.question, answer: formData.answer },
          })
        ).unwrap().then(() => {
          toast.update(toastId, {
            render: "FAQs is Updated Successfully 🎉",
            type: "success",
            isLoading: false,
            autoClose: 3000,
          });
        }).catch(() => {
          console.error(error);
          toast.update(toastId, {
            render: "Failed to Update a FAQs!!",
            type: "error",
            isLoading: false,
            autoClose: 3000,
          })
        });
      } else {
        const toastId = toast.loading("adding new FAQs............");
        await dispatch(addNewFAQAPI(formData)).unwrap().then(() => {
          toast.update(toastId, {
            render: "New FAQs is added successfully 🎉",
            type: "success",
            isLoading: false,
            autoClose: 3000,
          });
        }).catch((error) => {
          console.error(error);
          toast.update(toastId, {
            render: "Failed to add new FAQs!!",
            type: "error",
            isLoading: false,
            autoClose: 3000,
          });
        });
      }
      setFormData({ id: null, question: "", answer: "" });
      dispatch(fetchFAQsAPI({ pageNo, pageSize }));
      
      setIsDrawerOpen(false);
    } catch (error) {
      console.error("Failed to save FAQ:", error);
    }
  };

  useEffect(() => {
    dispatch(fetchFAQsAPI({ pageNo, pageSize }));
  }, [dispatch, pageNo, pageSize]);

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen p-4 sm:p-8 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 mt-12 gap-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 dark:text-gray-100 tracking-tight text-center sm:text-left">
            Frequently Asked Questions
          </h2>
          <CustomButton
            onClick={handleAddFAQ}
            className="primary"
          >
            Add New FAQ
          </CustomButton>
        </div>

        {/* FAQ List */}
        {loading ? (
          <p className="text-center text-gray-500 dark:text-gray-400 text-lg py-10">
            Loading FAQs...
          </p>
        ) : error ? (
          <p className="text-center text-gray-500 dark:text-gray-400 text-lg py-10">
            {error}
          </p>
        ) : faqList.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400 text-lg py-10">
            No FAQs available. Get started by adding a new one!
          </p>
        ) : (
          <>
            <div className="space-y-6">
              {faqList.map((faq, index) => (
                <div
                  key={faq.id}
                  className="dark:bg-gray-800 rounded-2xl shadow-sm p-5 sm:p-6 transition-all duration-300 hover:shadow-lg"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-3">
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="flex-1 text-left flex items-start"
                    >
                      <span className="font-semibold text-base sm:text-lg text-gray-800 dark:text-gray-100">
                        {faq.question}
                      </span>
                      {openIndex === index ? (
                        <FaChevronUp className="ml-3 text-gray-500 mt-1" />
                      ) : (
                        <FaChevronDown className="ml-3 text-gray-500 mt-1" />
                      )}
                    </button>
                    <div className="flex items-center space-x-3 sm:space-x-4 ml-auto">
                      <button className="p-2 rounded-full bg-blue-100 hover:bg-blue-200
                                 dark:bg-blue-800 dark:hover:bg-blue-700
                                 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <SquarePen
                          className="text-blue-600 dark:text-blue-300 w-5 h-5 sm:w-6 sm:h-6 m-auto cursor-pointer"
                          onClick={() => handleEditFAQ(faq)}
                        />
                      </button>

                      <button className="p-2 rounded-full bg-red-100 hover:bg-red-200
                                 dark:bg-red-800 dark:hover:bg-red-700
                                 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500">
                        <Trash2
                          className="text-red-600 dark:text-red-300 w-5 h-5 sm:w-6 sm:h-6 m-auto cursor-pointer"
                          onClick={() => handleDeleteFAQ(faq.id)}
                        />
                      </button>

                    </div>
                  </div>
                  {openIndex === index && (
                    <p className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
                      {faq.answer}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex flex-wrap justify-center items-center gap-3 mt-10">
              <button
                onClick={prevPage}
                disabled={pageNo === 1}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md disabled:opacity-50 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-200"
              >
                Prev
              </button>
              <span className="text-gray-700 dark:text-gray-300 font-medium px-4">
                Page {pageNo}
              </span>
              <button
                onClick={nextPage}
                disabled={faqList.length < pageSize}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md disabled:opacity-50 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-200"
              >
                Next
              </button>
            </div>
          </>
        )}

        {/* Drawer */}
        {isDrawerOpen && (
          <CustomDrawer
            isOpen={isDrawerOpen}
            onClose={() => resetForm()}
            title={isEditing ? "Edit FAQ" : "Add New FAQ"}
            footer={null}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-base font-medium text-gray-700 dark:text-gray-300">
                  Question
                </label>
                <input
                  type="text"
                  name="question"
                  value={formData.question}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm px-4 py-2 text-base focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  placeholder="Enter FAQ question"
                  
                />
                {errors.question && (
                  <p className="text-red-500 text-base mt-2 px-2">{errors.question}</p>
                )}
              </div>
              <div>
                <label className="block text-base font-medium text-gray-700 dark:text-gray-300">
                  Answer
                </label>
                <textarea
                  name="answer"
                  rows="4"
                  value={formData.answer}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm px-4 py-2 text-base focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  placeholder="Enter FAQ answer"
                  
                />
                {errors.answer && (
                  <p className="text-red-500 text-base mt-2 px-2">{errors.answer}</p>
                )}
              </div>
              <div className="flex justify-end">
                <CustomButton
                  type="submit"
                  className="px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg shadow-md hover:from-green-600 hover:to-green-700 transition duration-300 transform hover:scale-105"
                >
                  {isEditing ? "Update FAQ" : "Save FAQ"}
                </CustomButton>
              </div>
            </form>
          </CustomDrawer>
        )}
      </div>
    </div>
  );
};

export default FrequentlyAskQue;
