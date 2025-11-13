import React, { useState } from "react";
import axios from "axios";

const ContactForm = () => {
  // 🧩 Form state
  const [formData, setFormData] = useState({
    First_name: "",
    Last_name: "",
    Email: "",
    message: "",
  });

  // 🧩 Handle input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // 🧩 Submit handler
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL || "http://localhost:3001"}/submit-form`,
        formData
      );

      console.log("✅ Form submitted:", response.data);
      alert("Form submitted successfully!");

      // Reset form after submit
      setFormData({
        First_name: "",
        Last_name: "",
        Email: "",
        message: "",
      });
    } catch (error) {
      console.error("❌ Error submitting form:", error);
      alert("Failed to submit form. Please try again later.");
    }
  };

  // 🧩 Render form UI
  return (
    <div id="contact">
      <form onSubmit={handleSubmit}>
        {/* First Name */}
        <label htmlFor="fname">First Name</label>
        <input
          type="text"
          id="fname"
          name="First_name"
          placeholder="Your name..."
          value={formData.First_name}
          onChange={handleInputChange}
          required
        />

        {/* Last Name */}
        <label htmlFor="lname">Last Name</label>
        <input
          type="text"
          id="lname"
          name="Last_name"
          placeholder="Your last name..."
          value={formData.Last_name}
          onChange={handleInputChange}
          required
        />

        {/* Email */}
        <label htmlFor="email">Email Address</label>
        <input
          type="email"
          id="email"
          name="Email"
          placeholder="Please leave an email address where we can reach you"
          value={formData.Email}
          onChange={handleInputChange}
          required
        />

        {/* Message */}
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          placeholder="Write something..."
          value={formData.message}
          onChange={handleInputChange}
          required
        />

        {/* Submit Button */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ContactForm;
