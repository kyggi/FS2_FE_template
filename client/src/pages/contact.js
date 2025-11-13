import React from "react";
import ContactForm from "../components/contactForm"

const Contact = () => {
  return (
    <div id="contact-page">
      <div className="contact-overlay">
        <h1 className="contact-title">Get in Touch </h1>
        <ContactForm />
      </div>
    </div>
  );
};

export default Contact;
