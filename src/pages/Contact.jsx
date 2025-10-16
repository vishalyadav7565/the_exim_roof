import React from "react";
import MainLayout from "../layouts/MainLayout";
import ContactForm from "../components/ContactForm";

const Contact = () => {
  return (
    <MainLayout>
      <ContactForm />   {/* ✅ reuse the same component */}
    </MainLayout>
  );
};

export default Contact;
