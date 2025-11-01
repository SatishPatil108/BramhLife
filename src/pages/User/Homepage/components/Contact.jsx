// src/pages/Contact.jsx
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
    <div className="min-h-screen bg-[url(/gradientBackground.png)] bg-cover bg-no-repeat text-white px-6 py-12 flex items-center justify-center">
      <div className="bg-gradient-to-t from-[#ecb99e] to-[#02656b] p-10 rounded-2xl shadow-2xl max-w-lg">
        <h1 className="text-4xl font-extrabold text-center mb-8">
          Contact Us
        </h1>
        <p className="text-gray-900 text-2xl text-center mb-10">
          We'd love to hear from you. Whether you're a coach or a student, drop
          us a message.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6 ">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            className="w-full border border-gray-700 bg-white text-black p-3 rounded-lg  focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={form.name}
            onChange={handleChange}
            required
            tabIndex={1}
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            className="w-full border border-gray-700 bg-white text-black p-3 rounded-lg  focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={form.email}
            onChange={handleChange}
            required
            tabIndex={2}
          />
          <textarea
            name="message"
            placeholder="Your Message"
            className="w-full border border-gray-700 bg-white text-black p-3 rounded-lg  focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={form.message}
            onChange={handleChange}
            required
            tabIndex={3}
          ></textarea>

          <button
            tabIndex={4}
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-blue-600 hover:to-indigo-600 transition-colors text-white font-bold py-3 rounded-lg shadow-md"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
