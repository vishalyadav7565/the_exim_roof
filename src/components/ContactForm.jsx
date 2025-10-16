import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

const ContactForm = () => {
  const form = useRef();
  const [status, setStatus] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        'service_3swn01n', 'template_ddrby9w',
        form.current,
        'aYqQVDIMze9diW4pS' 
      )
      .then(
        () => {
          setStatus("✅ Message sent successfully!");
          form.current.reset(); // reset form fields
        },
        (error) => {
          console.log(error.text);
          setStatus("❌ Something went wrong, please try again.");
        }
      );
  };

  return (
    <section className="relative from-blue-600 via-indigo-600 to-purple-600 py-15 px-6 text-center text-white overflow-hidden">
      {/* Glow Background Effect */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>

      {/* Content Card */}
      <div className="relative max-w-3xl mx-auto bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-10 border border-white/20">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-pink-400">
          Contact Us
        </h2>
        <p className="mb-8 text-lg md:text-xl text-gray-200">
          Have questions? Get in touch with our experts and grow your business
          with <span className="font-semibold text-yellow-300">The Exim Roof</span>.
        </p>

        {/* Contact Form */}
        <form ref={form} onSubmit={sendEmail} className="space-y-6 text-left">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-200">Name</label>
            <input
              type="text"
              name="user_name"
              placeholder="Enter your name"
              className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-200">Email</label>
            <input
              type="email"
              name="user_email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-200">Message</label>
            <textarea
              rows="4"
              name="message"
              placeholder="Write your message..."
              className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full py-3 text-lg font-semibold rounded-full bg-gradient-to-r from-yellow-400 via-pink-500 to-red-500 text-white shadow-lg transform transition hover:scale-105 hover:shadow-2xl"
          >
            Send Message
          </button>
        </form>

        {/* Status Message */}
        {status && <p className="mt-4 text-sm">{status}</p>}
      </div>
    </section>
  );
};

export default ContactForm;
