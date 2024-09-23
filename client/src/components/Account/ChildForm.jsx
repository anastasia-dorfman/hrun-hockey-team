import React from "react";
import FormRow from "../FormRow";
import { formatDate } from "../../utils/functions";

const ChildForm = ({ child, onChange, errors }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({ ...child, [name]: value });
  };

  const formattedDob = child.dob ? formatDate(new Date(child.dob)) : "";

  return (
    <div className="child-form">
      <input value={child.kidId} hidden readOnly />
      <div className="form-row-inline">
        <FormRow
          type="text"
          name="firstName"
          placeholder="First name"
          value={child.firstName}
          onChange={handleChange}
          error={errors.firstName}
        />
        <FormRow
          type="text"
          name="lastName"
          placeholder="Last name"
          value={child.lastName}
          onChange={handleChange}
          error={errors.lastName}
        />
      </div>
      <h4 className="child-dob">Date of birth:</h4>
      <FormRow
        type="date"
        name="dob"
        placeholder="yyyy-mm-dd"
        value={formattedDob}
        onChange={handleChange}
        min={formatDate(
          new Date(new Date().setFullYear(new Date().getFullYear() - 18))
        )}
        max={formatDate(new Date())}
        error={errors.dob}
      />
    </div>
  );
};

export default ChildForm;
