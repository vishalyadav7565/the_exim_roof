// components/WhatsappButton.jsx
import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const WhatsappButton = () => {
  return (
    <a
      href="https://wa.me/919876543210?text=Hello, I want to enquire about your services. Can you please provide me more details?"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-16 right-6 text-green-500 text-5xl animate-bounce hover:text-green-600 z-50"
    >
      <FaWhatsapp />
    </a>
  );
};

export default WhatsappButton;
