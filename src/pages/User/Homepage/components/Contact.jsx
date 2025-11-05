import React, { useState } from "react";

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thanks for contacting us!");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-[url(/gradientBackground.png)] bg-cover bg-no-repeat  p-8 py-10 flex items-center justify-center">
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-[420px] bg-white  p-6 sm:p-8 md:p-10 lg:p-6 rounded-2xl shadow-2xl lg:shadow-[0_0_25px_rgba(0,0,0,0.3)]">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-center mb-4 sm:mb-6 ">
          Contact Us
        </h1>

        <p className="text-gray-600 text-sm sm:text-base text-center mb-6 sm:mb-8">
          We'd love to hear from you. Whether you're a coach or a student, drop
          us a message below.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            className="w-full border border-gray-300 bg-white text-black p-2 sm:p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm sm:text-base"
            value={form.name}
            onChange={handleChange}
            required
            tabIndex={1}
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            className="w-full border border-gray-300 bg-white text-black p-2 sm:p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm sm:text-base"
            value={form.email}
            onChange={handleChange}
            required
            tabIndex={2}
          />

          <textarea
            name="message"
            placeholder="Your Message"
            className="w-full border border-gray-300 bg-white text-black p-2 sm:p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm sm:text-base h-24 sm:h-28 resize-none"
            value={form.message}
            onChange={handleChange}
            required
            tabIndex={3}
          ></textarea>

          <button
            tabIndex={4}
            type="submit"
            className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:opacity-50 transition-all duration-300 text-white font-bold py-2 sm:py-3 rounded-lg shadow-lg text-sm sm:text-base hover:shadow-sm cursor-pointer"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
