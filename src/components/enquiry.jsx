import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Enquiry = () => {
  const formRef = useRef();
  const [isSending, setIsSending] = useState(false);
  const [success, setSuccess] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSending(true);

    const formData = new FormData(formRef.current);
    const user_name = formData.get("user_name");
    const user_email = formData.get("user_email");
    const user_phone = formData.get("user_phone");
    const message = formData.get("message");

    const htmlMessage = `
      <p>You have a new enquiry from the website:</p>
      <ul>
        <li><strong>Name:</strong> ${user_name}</li>
        <li><strong>Email:</strong> ${user_email}</li>
        <li><strong>Phone:</strong> ${user_phone}</li>
        <li><strong>Message:</strong> ${message}</li>
      </ul>
    `;

    emailjs
      .send(
        "service_3swn01n",
        "template_ddrby9w",
        { user_name, user_email, user_phone, message: htmlMessage },
        "aYqQVDIMze9diW4pS"
      )
      .then(
        () => {
          setSuccess("✅ Enquiry sent successfully!");
          setIsSending(false);
          formRef.current.reset();
        },
        (error) => {
          console.error("FAILED...", error.text);
          setSuccess("❌ Something went wrong. Try again.");
          setIsSending(false);
        }
      );
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <Navbar />

      <div className="flex-grow flex items-center justify-center px-6 py-12 pt-24 mt-7">
        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Enquiry Form Card */}
          <div className="bg-gray-900/70 backdrop-blur-md rounded-2xl shadow-lg p-8 space-y-5">
            <h2 className="text-3xl font-bold text-center mb-6">
              Enquiry <span className="text-blue-400">Now</span>
            </h2>
            <form ref={formRef} onSubmit={sendEmail} className="space-y-4">
              <input
                type="text"
                name="user_name"
                placeholder="Your Name"
                required
                className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <input
                type="email"
                name="user_email"
                placeholder="Your Email"
                required
                className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <input
                type="text"
                name="user_phone"
                placeholder="Phone Number"
                className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <textarea
                name="message"
                rows="4"
                placeholder="Your Enquiry"
                required
                className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              ></textarea>
              <button
                type="submit"
                disabled={isSending}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition duration-300"
              >
                {isSending ? "Sending..." : "Send Enquiry"}
              </button>
            </form>
            {success && (
              <p className="mt-4 text-sm font-medium text-green-400 text-center">{success}</p>
            )}
          </div>

          {/* Contact Info & Map Card */}
          <div className="bg-gray-900/70 backdrop-blur-md rounded-2xl shadow-lg p-8 space-y-6">
            <h2 className="text-2xl font-bold text-center mb-6">Contact Information</h2>
            
            <div className="space-y-4 text-center text-gray-300">
              {/* Phone */}
              <a
                href="tel:+919876543210"
                className="inline-flex items-center gap-3 text-lg font-medium text-green-400 hover:text-green-300 transition"
              >
                <FaPhoneAlt className="text-xl" />
                +91 98765 43210
              </a>

              {/* Email */}
              <a
                href="mailto:support@yourdomain.com"
                className="inline-flex items-center gap-3 text-lg font-medium text-blue-400 hover:text-blue-300 transition"
              >
                <FaEnvelope className="text-xl" />
                support@yourdomain.com
              </a>

              {/* Location */}
              <div className="inline-flex items-center gap-3 text-lg font-medium text-red-400">
                <FaMapMarkerAlt className="text-xl" />
                Noida, Uttar Pradesh
              </div>
            </div>

            {/* Google Map */}
            <div className="w-full mt-4 aspect-[16/9] rounded-lg overflow-hidden shadow-lg">
              <iframe
                title="Google Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14014.408110024454!2d77.3910298!3d28.6273923!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ceff407b22f2b%3A0xbbb54adf84c9d70!2sNoida%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1694454444444!5m2!1sen!2sin"
                className="w-full h-full border-0"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            {/* WhatsApp Link */}
            <a
              href="https://wa.me/919876543210?text=Hello, I want to enquire about your services."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-full mt-4 px-6 py-3 bg-green-500 hover:bg-green-600 rounded-lg font-semibold transition duration-300 text-center"
            >
              📱 Enquiry on WhatsApp
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Enquiry;
