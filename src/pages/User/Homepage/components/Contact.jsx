import React, { useEffect, useState } from "react";
import { LucideMail, UserCircle2, MessageCircle } from 'lucide-react'
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { contactAPI } from "@/store/feature/user";
import { motion } from "framer-motion";

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      setForm({ name: user.name, email: user.email, message: "" });
    }
  }, [user]);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const toastId = toast.loading("Submitting message...");

    dispatch(contactAPI(form))
      .then(() => {
        toast.update(toastId, {
          render: "Message sent successfully 🎉",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
      })
      .catch(() => {
        toast.update(toastId, {
          render: "Failed to submit the message!",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      });

    setForm({ name: user?.name || "", email: user?.email || "", message: "" });
  };

  return (
    <div className="min-h-screen bg-white p-6 md:p-10 flex items-center justify-center">
      <motion.section
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="px-4 md:px-12 lg:px-24 xl:px-32 w-full"
      >
        <motion.h1
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="text-3xl mb-8 sm:text-4xl lg:text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-600 via-purple-600 to-pink-600"
        >
          Reach out to us
        </motion.h1>

        <p className="text-gray-600 text-center mt-3 max-w-md mx-auto text-sm sm:text-base">
          We'd love to hear from you! Whether you're a coach or a student, drop us a message below.
        </p>

        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-2xl mx-auto text-gray-700 mt-14 mb-12"
        >
          {/* Name */}
          <div>
            <p className="mb-2 font-medium">Your name</p>
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden pl-3 bg-white focus-within:border-purple-600 transition">
              <UserCircle2 className="text-gray-400" />
              <input
                placeholder="Enter your name"
                className={`w-full p-3 bg-transparent outline-none ${user?.name ? "cursor-not-allowed bg-gray-100" : "cursor-text"}`}
                type="text"
                name="name"
                value={form.name}
                onChange={!user?.name ? handleChange : undefined}
                disabled={!!user?.name}
                required
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <p className="mb-2 font-medium">Email id</p>
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden pl-3 bg-white focus-within:border-purple-600 transition gap-2">
              <LucideMail className="text-gray-400" />
              <input
                placeholder="Enter your email"
                className={`w-full p-3 bg-transparent outline-none ${user?.email ? "cursor-not-allowed bg-gray-100" : "cursor-text"}`}
                type="email"
                name="email"
                value={form.email}
                onChange={!user?.email ? handleChange : undefined}
                disabled={!!user?.email}
                required
              />
            </div>
          </div>

          {/* Message */}
          <div className="sm:col-span-2 relative">
            <p className="mb-2 font-medium">Message</p>
            <MessageCircle className="text-gray-400 absolute left-3 top-4 mt-7" />
            <textarea
              name="message"
              rows="6"
              placeholder="Enter your message"
              className="w-full pl-10 p-3 bg-white outline-none rounded-lg border border-gray-300 focus:border-purple-600 transition resize-none"
              value={form.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          {/* Submit */}
          <div className="sm:col-span-2 flex justify-center">
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="text-lg w-full md:w-1/2 mt-4 font-bold bg-purple-600 hover:bg-purple-700 text-white px-10 py-3 rounded-full transition-all shadow-md"
            >
              Submit
            </motion.button>
          </div>
        </motion.form>
      </motion.section>
    </div>
  );
}

export default Contact;