import { useState } from "react";
import { Link } from "react-router-dom";
import { LuPhone, LuMail, LuPen } from "react-icons/lu";
import Wrapper from "../../assets/wrappers/HomePageSections";
import { useTeam } from "../../context/TeamContext";
import FormRow from "./FormRow";

const ContactFormSection = ({ page = "" }) => {
  const { teamName, address, phone, email } = useTeam();
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
          <form className="form">
            <FormRow
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
            <FormRow
              type="text"
              name="phone"
              isRequired={false}
              value={formData.phone}
              onChange={handleInputChange}
            />
            <FormRow
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <FormRow
              type="textarea"
              name="message"
              isLabeled={true}
              labelIcon={<LuPen />}
              // labelText="How can our team help you?"
              labelText="How we can help you?"
              isPlaceholder={false}
              value={formData.message}
              onChange={handleInputChange}
            />
            <FormRow
              type="checkbox"
              name="agreeWithDataCollection"
              isLabeled
              labelText="I agree that my data can be collected and stored."
              value={formData.agreeWithDataCollection}
              onChange={handleInputChange}
            />

            <button type="submit" className="selected long b2 contact-us-btn">
              Contact us
              {/* Get in touch */}
            </button>
          </form>
        </div>
      </div>
    </Wrapper>
  );
};

export default ContactFormSection;
