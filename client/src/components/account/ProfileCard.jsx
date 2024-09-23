import React, { useState, useEffect } from "react";
import FormRow from "../shared/FormRow";
import AddressForm from "./AddressForm";
import ChildForm from "./ChildForm";
import NameForm from "./NameForm";
import PasswordForm from "./PasswordForm";
import {
  parseAndValidateDate,
  isAdult,
  isChild,
  getDateString,
} from "../../utils/functions";
import {
  VALIDATION_PATTERNS,
  ERROR_MESSAGES,
  SCHEMA_CONSTRAINTS,
} from "../../utils/clientConstants";
import showToast from "../shared/CustomToast";

const ProfileCard = ({
  title,
  name,
  value,
  inputType = "text",
  options = [],
  isEmptyValue = false,
  showCard = true,
  handleEditSubmit,
  handleDeleteAction,
  isEditingMode = false,
}) => {
  const [isEditing, setIsEditing] = useState(isEditingMode);
  const [isFormDataValid, setIsFormDataValid] = useState(false);
  const [editedValue, setEditedValue] = useState(
    name === "kids" || name === "password" ? {} : value
  );
  const [errors, setErrors] = useState({});

  const validateFormData = (newValue) => {
    const emailRegex = VALIDATION_PATTERNS.EMAIL;
    const phoneRegex = VALIDATION_PATTERNS.PHONE;
    const passwordRegex = VALIDATION_PATTERNS.PASSWORD;
    const newErrors = {};

    switch (name) {
      case "address":
        if (
          newValue.streetAddress.length <
          SCHEMA_CONSTRAINTS.STREET_ADDRESS.MIN_LENGTH
        ) {
          newErrors.streetAddress = ERROR_MESSAGES.STREET_ADDRESS_TOO_SHORT;
        }
        if (newValue.city.length < SCHEMA_CONSTRAINTS.CITY.MIN_LENGTH) {
          newErrors.city = ERROR_MESSAGES.CITY_TOO_SHORT;
        }
        if (!newValue.province) {
          newErrors.province = ERROR_MESSAGES.PROVINCE_REQUIRED;
        }
        if (
          !newValue.postalCode ||
          !VALIDATION_PATTERNS.POSTAL_CODE.test(newValue.postalCode)
        ) {
          newErrors.postalCode = ERROR_MESSAGES.INVALID_POSTAL_CODE;
        }
        break;
      case "addChild":
      case "kids":
        if (newValue.firstName.length < SCHEMA_CONSTRAINTS.NAME.MIN_LENGTH) {
          newErrors.firstName =
            ERROR_MESSAGES.CHILD_NAME_TOO_SHORT("first name");
        }
        if (newValue.lastName.length < SCHEMA_CONSTRAINTS.NAME.MIN_LENGTH) {
          newErrors.lastName = ERROR_MESSAGES.CHILD_NAME_TOO_SHORT("last name");
        }
        if (!newValue.dob || !isChild(newValue.dob)) {
          newErrors.dob = ERROR_MESSAGES.CHILD_AGE_REQUIRED;
        }
        break;
      case "fullName":
        if (newValue.firstName.length < SCHEMA_CONSTRAINTS.NAME.MIN_LENGTH) {
          newErrors.firstName = ERROR_MESSAGES.NAME_TOO_SHORT("First name");
        }
        if (newValue.lastName.length < SCHEMA_CONSTRAINTS.NAME.MIN_LENGTH) {
          newErrors.lastName = ERROR_MESSAGES.NAME_TOO_SHORT("Last name");
        }
        break;
      case "dob":
        if (!isAdult(newValue)) {
          newErrors.dob = ERROR_MESSAGES.ADULT_AGE_REQUIRED;
        }
        break;
      case "email":
        if (!emailRegex.test(newValue)) {
          newErrors.email = ERROR_MESSAGES.INVALID_EMAIL_FORMAT;
        }
        break;
      case "phone":
        if (
          !phoneRegex.test(
            newValue
              .replace(/\s/g, "")
              .replace(/-/g, "")
              .replace(/\(/g, "")
              .replace(/\)/g, "")
          )
        ) {
          newErrors.phone = ERROR_MESSAGES.INVALID_PHONE_FORMAT;
        }
        break;
      case "password":
        if (!passwordRegex.test(newValue.password)) {
          newErrors.password = ERROR_MESSAGES.INVALID_PASSWORD_FORMAT;
        }
        if (newValue.password !== newValue.passwordConfirmation) {
          newErrors.passwordConfirmation =
            ERROR_MESSAGES.PASSWORDS_DO_NOT_MATCH;
        }
        break;
      case "language":
        if (newValue === "") {
          newErrors.language = ERROR_MESSAGES.INVALID_LANGUAGE;
        }
        break;
    }

    setErrors(newErrors);
    const isValid = Object.keys(newErrors).length === 0;
    setIsFormDataValid(isValid);
    return isValid;
  };

  const handleEdit = (childId = null) => {
    if (name === "kids") {
      setIsEditing((prev) => ({
        ...prev,
        [childId]: !prev[childId],
      }));

      if (!isEditing[childId]) {
        const childToEdit = value.find((kid) => kid.kidId === childId);
        setEditedValue((prev) => ({
          ...prev,
          [childId]: childToEdit,
        }));
      } else {
        if (validateFormData(editedValue[childId])) {
          const updatedKids = value.map((kid) =>
            kid.kidId === childId ? editedValue[childId] : kid
          );
          handleEditSubmit(name, updatedKids);
        }
      }
    } else {
      if (isEditing) {
        if (validateFormData(editedValue)) {
          handleEditSubmit(name, editedValue);

          if (name === "addChild") {
            setEditedValue({
              firstName: "",
              lastName: "",
              dob: "",
            });
          }
        } else {
          setEditedValue(value);
        }
      }
      setIsEditing(!isEditing);
      validateFormData(editedValue);
    }
  };

  const handleChange = (e) => {
    const newValue = e.target.value;
    setEditedValue(newValue);
    validateFormData(newValue);
  };

  const handleFormChange = (newFormData, kidId = null) => {
    if (name === "kids") {
      setEditedValue((prev) => ({
        ...prev,
        [kidId]: newFormData,
      }));
      validateFormData(newFormData);
    } else {
      setEditedValue(newFormData);
      validateFormData(newFormData);
    }
  };

  const handleDelete = (childId, childFirstName, childLastName) => {
    if (name === "deleteAccount") {
      showToast({
        title: `Are you sure you want to delete the account?`,
        onConfirm: () => handleDeleteAction(),
        onConfirmBtnText: "Delete",
      });
    } else if (childId) {
      showToast({
        title: `Are you sure you want to delete profile of ${childFirstName} ${childLastName}?`,
        onConfirm: () => handleDeleteAction(childId),
        onConfirmBtnText: "Delete",
      });
    }
  };

  const renderEditContent = (kid = null) => {
    if (name === "address")
      return (
        <AddressForm
          address={editedValue}
          onChange={handleFormChange}
          errors={errors}
        />
      );

    if (name === "kids" && kid) {
      return (
        <ChildForm
          child={editedValue[kid.kidId] || kid}
          onChange={(data) => handleFormChange(data, kid.kidId)}
          errors={errors}
        />
      );
    }

    if (name === "addChild")
      return (
        <ChildForm
          child={editedValue}
          onChange={handleFormChange}
          errors={errors}
        />
      );

    if (name === "fullName")
      return (
        <NameForm
          fullName={editedValue}
          onChange={handleFormChange}
          errors={errors}
        />
      );

    if (name === "password")
      return (
        <PasswordForm
          passwordObject={editedValue}
          onChange={handleFormChange}
          errors={errors}
        />
      );

    return (
      <FormRow
        type={inputType}
        name={name}
        value={name === "dob" ? parseAndValidateDate(editedValue) : editedValue}
        options={options.map((o) => ({ value: o, label: o }))}
        onChange={handleChange}
        isLabeled={false}
        max={parseAndValidateDate(
          new Date(
            new Date().setFullYear(new Date().getFullYear() - 18) - 86400000
          )
        )}
        error={errors[name]}
      />
    );
  };

  const renderViewContent = (kid = null) => {
    if (name === "address") {
      return (
        <span className="b1 value">
          {editedValue.streetAddress},{" "}
          {editedValue.apt && `${editedValue.apt}, `}
          {editedValue.city}, {editedValue.province},{" "}
          {editedValue.postalCode && `${editedValue.postalCode}, `}
          {editedValue.country}
        </span>
      );
    }

    if (name === "kids" && kid) {
      return (
        <div>
          <span className="b1 value">
            {kid.firstName} {kid.lastName}
          </span>
          <h4 className="child-dob">Date of birth:</h4>
          <span className="b1 value">{getDateString(kid.dob, false)}</span>
        </div>
      );
    }

    if (name === "fullName") {
      return (
        <span className="b1 value">
          {editedValue.firstName} {editedValue.lastName}
        </span>
      );
    }

    if (name === "password") {
      return <span className="b1 value">********</span>;
    }

    // TODO Remove when back-end implemented
    if (typeof value === "object" && value !== null) {
      return <span className="b1 value">{JSON.stringify(value)}</span>;
    }

    return (
      <span
        className={`b1 value ${isEmptyValue ? "empty" : ""} ${
          value === "yyyy-mm-dd" ? "placeholder" : ""
        }`}
      >
        {value}
      </span>
    );
  };

  return (
    <>
      {name !== "kids" && (
        <form
          className={`profile-card info-card ${!showCard ? "hide" : ""}`}
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="info">
            <h4>{title}</h4>
            {isEditing ? renderEditContent() : renderViewContent()}
          </div>
          <div className="actions">
            <button
              type="button"
              className="text-button"
              onClick={name === "deleteAccount" ? handleDelete : handleEdit}
              disabled={isEditing && !isFormDataValid}
            >
              <span className="b1 edit">
                {isEditing
                  ? "Save"
                  : name === "deleteAccount"
                  ? "Delete"
                  : "Edit"}
              </span>
            </button>
          </div>
        </form>
      )}

      {name === "kids" &&
        value.map((kid) => (
          <form
            key={`child ${kid.kidId}`}
            className={`profile-card info-card ${!showCard ? "hide" : ""}`}
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              hidden
              value={kid.kidId}
              name="childId"
              id="childId"
              readOnly
            />
            <div className="info">
              <h4>{title}</h4>
              {isEditing[kid.kidId]
                ? renderEditContent(kid)
                : renderViewContent(kid)}
            </div>
            <div className="actions">
              <button
                type="button"
                className="text-button"
                onClick={() =>
                  handleDelete(kid.kidId, kid.firstName, kid.lastName)
                }
              >
                <span className="b1 delete">Delete</span>
              </button>
              <button
                type="button"
                className="text-button"
                onClick={() => handleEdit(kid.kidId)}
                disabled={isEditing[kid.kidId] && !isFormDataValid}
              >
                <span className="b1 edit">
                  {isEditing[kid.kidId] ? "Save" : "Edit"}
                </span>
              </button>
            </div>
          </form>
        ))}
    </>
  );
};
export default ProfileCard;
