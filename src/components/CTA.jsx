import React, { useState } from "react";
import styles from "../style";
import Button from "./Button";

const ContactForm = () => {
  const [userType, setUserType] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    countryCode: "",
    phoneNumber: "",
    email: "",
    // Music Creator fields
    countryOfResidence: "",
    socialMediaHandles: "",
    referralCode: "",
    // Investor fields
    positionTitle: "",
    companyName: "",
    countryOfIncorporation: "",
    websiteURL: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleUserTypeChange = (type) => {
    setUserType(type);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    let subject = userType === "creator" 
      ? "Music Creator Contact Form Submission" 
      : "Investor Contact Form Submission";
      
    let body = `
Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Phone: ${formData.countryCode} ${formData.phoneNumber}
`;

    if (userType === "creator") {
      body += `
Country of Residence: ${formData.countryOfResidence}
Social Media Handles: ${formData.socialMediaHandles}
Referral Code: ${formData.referralCode}
`;
    } else {
      body += `
Position/Title: ${formData.positionTitle}
Company Name: ${formData.companyName}
Country of Incorporation: ${formData.countryOfIncorporation}
Website URL: ${formData.websiteURL}
`;
    }

    // Encode for mailto
    const mailtoLink = `mailto:abpandey0515@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  };

  return (
    <section id="aboutus" className={`${styles.flexCenter} ${styles.marginY} ${styles.padding} sm:flex-row flex-col bg-black-gradient-2 rounded-[20px] box-shadow`}>
      <div className="w-full">
        <h2 className={styles.heading2}>Contact Us</h2>
        <p className={`${styles.paragraph} max-w-[670px] mt-5 mb-10`}>
          Please fill out the form below and we'll get back to you as soon as possible.
        </p>

        <div className="flex flex-row gap-4 mb-8">
          <button
            className={`py-4 px-6 rounded-lg ${userType === "creator" ? "bg-blue-gradient text-primary font-bold" : "bg-gray-300"}`}
            onClick={() => handleUserTypeChange("creator")}
          >
            Music Creator
          </button>
          <button
            className={`py-4 px-6 rounded-lg ${userType === "investor" ? "bg-blue-gradient text-primary font-bold" : "bg-gray-300"}`}
            onClick={() => handleUserTypeChange("investor")}
          >
            Investor
          </button>
        </div>

        {userType && (
          <form onSubmit={handleSubmit} className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Common Fields */}
              <div>
                <label className={`${styles.paragraph} block mb-2`}>First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-lg bg-dimWhite text-black outline-none"
                  required
                />
              </div>
              <div>
                <label className={`${styles.paragraph} block mb-2`}>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-lg bg-dimWhite text-black outline-none"
                  required
                />
              </div>
              <div>
                <label className={`${styles.paragraph} block mb-2`}>Country Code</label>
                <input
                  type="text"
                  name="countryCode"
                  value={formData.countryCode}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-lg bg-dimWhite text-black outline-none"
                  placeholder="+1"
                  required
                />
              </div>
              <div>
                <label className={`${styles.paragraph} block mb-2`}>Phone Number</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-lg bg-dimWhite text-black outline-none"
                  required
                />
              </div>
              
              {/* Music Creator Fields */}
              {userType === "creator" && (
                <>
                  <div>
                    <label className={`${styles.paragraph} block mb-2`}>Country of Residence</label>
                    <input
                      type="text"
                      name="countryOfResidence"
                      value={formData.countryOfResidence}
                      onChange={handleInputChange}
                      className="w-full p-3 rounded-lg bg-dimWhite text-black outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className={`${styles.paragraph} block mb-2`}>Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full p-3 rounded-lg bg-dimWhite text-black outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className={`${styles.paragraph} block mb-2`}>Social Media Handles (optional)</label>
                    <input
                      type="text"
                      name="socialMediaHandles"
                      value={formData.socialMediaHandles}
                      onChange={handleInputChange}
                      className="w-full p-3 rounded-lg bg-dimWhite text-black outline-none"
                    />
                  </div>
                  <div>
                    <label className={`${styles.paragraph} block mb-2`}>Referral Code (if applicable)</label>
                    <input
                      type="text"
                      name="referralCode"
                      value={formData.referralCode}
                      onChange={handleInputChange}
                      className="w-full p-3 rounded-lg bg-dimWhite text-black outline-none"
                    />
                  </div>
                </>
              )}

              {/* Investor Fields */}
              {userType === "investor" && (
                <>
                  <div>
                    <label className={`${styles.paragraph} block mb-2`}>Position/Title</label>
                    <input
                      type="text"
                      name="positionTitle"
                      value={formData.positionTitle}
                      onChange={handleInputChange}
                      className="w-full p-3 rounded-lg bg-dimWhite text-black outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className={`${styles.paragraph} block mb-2`}>Name of Company</label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      className="w-full p-3 rounded-lg bg-dimWhite text-black outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className={`${styles.paragraph} block mb-2`}>Country of Incorporation</label>
                    <input
                      type="text"
                      name="countryOfIncorporation"
                      value={formData.countryOfIncorporation}
                      onChange={handleInputChange}
                      className="w-full p-3 rounded-lg bg-dimWhite text-black outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className={`${styles.paragraph} block mb-2`}>Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full p-3 rounded-lg bg-dimWhite text-black outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className={`${styles.paragraph} block mb-2`}>Website URL</label>
                    <input
                      type="url"
                      name="websiteURL"
                      value={formData.websiteURL}
                      onChange={handleInputChange}
                      className="w-full p-3 rounded-lg bg-dimWhite text-black outline-none"
                      required
                    />
                  </div>
                </>
              )}
            </div>

            <div className="mt-10">
              <button 
                type="submit" 
                className="py-4 px-6 bg-blue-gradient font-poppins font-medium text-[18px] text-primary outline-none rounded-[10px]"
              >
                Submit
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};

export default ContactForm;