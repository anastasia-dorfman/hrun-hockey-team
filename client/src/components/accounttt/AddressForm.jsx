import React, { useState } from "react";
import FormRow from "../shared/FormRow";

const canadianProvinces = [
  "Alberta",
  "British Columbia",
  "Manitoba",
  "New Brunswick",
  "Newfoundland and Labrador",
  "Nova Scotia",
  "Ontario",
  "Prince Edward Island",
  "Quebec",
  "Saskatchewan",
  "Northwest Territories",
  "Nunavut",
  "Yukon",
];

const countries = [
  { value: "Canada", label: "Canada" },
  { value: "United States", label: "United States" },
];

const AddressForm = ({ address, onChange, errors }) => {
  const [selectedCountry, setSelectedCountry] = useState(address.country || "");

  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({ ...address, [name]: value });
  };

  const handleCountryChange = (e) => {
    const country = e.target.value;
    setSelectedCountry(country);
    onChange({ ...address, country });
  };

  return (
    <div className="address-form">
      <FormRow
        type="select"
        name="country"
        labelText="Country"
        value={selectedCountry}
        onChange={handleCountryChange}
        options={countries}
        isPlaceholder={true}
        placeholder="Country/Region"
        error={errors.country}
      />
      <div className="form-row-inline">
        <FormRow
          type="text"
          name="streetAddress"
          placeholder="Street Address"
          value={address.streetAddress}
          onChange={handleChange}
          error={errors.streetAddress}
        />
        <FormRow
          type="text"
          name="apt"
          placeholder="Apartment, suite, etc. (optional)"
          value={address.apt}
          onChange={handleChange}
          isRequired={false}
        />
      </div>
      <div className="form-row-inline">
        <FormRow
          type="text"
          name="city"
          labelText="City"
          value={address.city}
          onChange={handleChange}
          error={errors.city}
        />
        <FormRow
          type="select"
          name="province"
          labelText="Province"
          value={address.province || "New Brunswick"}
          onChange={handleChange}
          options={canadianProvinces.map((province) => ({
            value: province,
            label: province,
          }))}
          error={errors.province}
        />
        <FormRow
          type="text"
          name="postalCode"
          placeholder="Postal Code"
          value={address.postalCode}
          onChange={handleChange}
          error={errors.postalCode}
        />
      </div>
    </div>
  );
};

export default AddressForm;
