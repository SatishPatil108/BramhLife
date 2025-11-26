import React, { useState } from "react";
import { LucideMail, UserCircle2, MessageCircle } from 'lucide-react'

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thanks for contacting us!");
    setForm({ name: "", email: "", message: "" });
    console.log(form);
  };

  return (
    <div className="min-h-screen bg-purple-50 p-8 py-10 flex items-center justify-center">
      <section className="px-4 md:px-16 lg:px-24 xl:px-32 w-full">

        <h1 className="text-4xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-pink-600 via-purple-600 to-pink-600 text-center mx-auto mt-4">
          Reach out to us
        </h1>

        <p className="text-gray-700 text-center mt-2 max-w-md mx-auto">
          We'd love to hear from you. Whether you're a coach or a student, drop  us a message below.
        </p>

        <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-3 sm:gap-5 max-w-2xl mx-auto text-gray-700 mt-16 w-full mb-10">

          {/* Name */}
          <div>
            <p className="mb-2 font-medium">Your name</p>
            <div className="flex items-center pl-3 rounded-lg overflow-hidden border border-gray-300 focus-within:border-pink-500 bg-white">
              <UserCircle2 className="text-gray-400" />
              <input
                placeholder="Enter your name"
                className="w-full p-3 bg-transparent outline-none"
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                tabIndex={1}
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <p className="mb-2 font-medium">Email id</p>
            <div className="flex items-center pl-3 rounded-lg overflow-hidden border border-gray-300 focus-within:border-pink-500 bg-white gap-2">
              <LucideMail className="text-gray-400" />
              <input
                placeholder="Enter your email"
                className="w-full p-3 bg-transparent outline-none"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                tabIndex={2}
              />
            </div>
          </div>

          {/* Message */}
          <div className="sm:col-span-2 relative">
            <p className="mb-2 font-medium">Message</p>
            <MessageCircle className="text-gray-400 absolute m-3" />
            <textarea
              name="message"
              rows="8"
              placeholder="Enter your message"
              className="focus:border-pink-500 resize-none w-full px-12 p-3 bg-white outline-none rounded-lg overflow-hidden border border-gray-300"
              value={form.message}
              onChange={handleChange}
              required
              tabIndex={3}
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="w-full flex justify-center items-center mb-8">
            <button
              type="submit"
              className="text-lg gap-2 w-full mt-4 cursor-pointer font-bold bg-purple-600 hover:opacity-80 text-white px-10 py-3 rounded-full"
              tabIndex={4}
            >
              Submit
            </button>
          </div>

        </form>
      </section>
    </div>
  );
}

export default Contact;
