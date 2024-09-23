import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { LuPhone, LuMail, LuPen } from "react-icons/lu";
import { useTeam } from "../../context/TeamContext";
import {
  ERROR_MESSAGES,
  VALIDATION_PATTERNS,
} from "../../utils/clientConstants";
import FormRow from "./FormRow";
import Wrapper from "../../assets/wrappers/HomePageSections";

const ContactFormSection = ({ page = "" }) => {
  const { teamName, address, phone, email } = useTeam();
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
    agreeWithDataCollection: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateForm = () => {
    let newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = ERROR_MESSAGES.FIELD_REQUIRED("Name");
    }

    if (!VALIDATION_PATTERNS.EMAIL.test(formData.email)) {
      newErrors.email = ERROR_MESSAGES.INVALID_EMAIL_FORMAT;
    }

    if (formData.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters long";
    }

    if (!formData.agreeWithDataCollection) {
      newErrors.agreeWithDataCollection =
        ERROR_MESSAGES.AGREE_WITH_DATA_COLLECTION;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            message: formData.message,
          }),
        });

        if (response.ok) {
          setFormData({
            name: "",
            phone: "",
            email: "",
            message: "",
            agreeWithDataCollection: false,
          });
          toast.success("Message sent successfully!");
        } else {
          toast.error("Failed to send message");
        }
      } catch (error) {
        console.error("Error sending email:", error);
        alert("Failed to send message. Please try again later.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <Wrapper>
      <div className={`home-page-section ${page}`}>
        <div className="form-section">
          <div className="form-info">
            <div className="content">
              <h1 className="section-title">How can we help you today?</h1>
              <p className="get-in-touch-message b1">
                Feel free to message us and we will get back to you as soon as
                possible.
              </p>
              <p className="address b1" style={{ whiteSpace: "pre-line" }}>
                {address}
              </p>
              <p className="icons-info b1">
                <LuPhone /> {phone}
              </p>
              <p className="icons-info b1">
                <LuMail /> <a href={`mailto:${email}`}>{email}</a>
              </p>
            </div>
          </div>
          <form className="form" onSubmit={handleSubmit}>
            <FormRow
              type="text"
              name="name"
              value={formData.name}
              isRequired={false}
              onChange={handleInputChange}
              error={errors.name}
            />
            <FormRow
              type="text"
              name="phone"
              value={formData.phone}
              isRequired={false}
              onChange={handleInputChange}
            />
            <FormRow
              type="email"
              name="email"
              value={formData.email}
              isRequired={false}
              onChange={handleInputChange}
              error={errors.email}
            />
            <FormRow
              type="textarea"
              name="message"
              isLabeled={true}
              labelIcon={<LuPen />}
              labelText="How we can help you?"
              isPlaceholder={false}
              value={formData.message}
              isRequired={false}
              onChange={handleInputChange}
              error={errors.message}
            />
            <FormRow
              type="checkbox"
              name="agreeWithDataCollection"
              isLabeled
              labelText="I agree that my data can be collected and stored."
              value={formData.agreeWithDataCollection}
              isRequired={false}
              onChange={handleInputChange}
              error={errors.agreeWithDataCollection}
            />

            <button type="submit" className="selected long b2 contact-us-btn">
              Contact us
            </button>
          </form>
        </div>
      </div>
    </Wrapper>
  );
};

export default ContactFormSection;
