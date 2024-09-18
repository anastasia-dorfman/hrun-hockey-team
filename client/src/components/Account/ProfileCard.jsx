import React, { useState, useEffect } from "react";
import FormRow from "../FormRow";
import AddressForm from "./AddressForm";
import ChildForm from "./ChildForm";
import {
  formatDate,
  isAdult,
  isChild,
  parseAndValidateDate,
} from "../../utils/functions";
import NameForm from "./NameForm";
import showToast from "../CustomToast";

const ProfileCard = ({
  title,
  value,
  isEmptyValue = false,
  handleEditSubmit,
  handleDeleteChild,
  inputType = "text",
  name,
  showCard = true,
}) => {
  const [isEditing, setIsEditing] = useState(name === "kids" ? {} : false);
  const [isFormDataValid, setIsFormDataValid] = useState(false);
  const [editedValue, setEditedValue] = useState(name === "kids" ? {} : value);

  useEffect(() => {
    if ((name === "address" && isAddressEmpty(value)) || name === "addChild") {
      setIsEditing(true);
    }
  }, [name, value]);

  const isAddressEmpty = (address) => {
    return !address.streetAddress || !address.city;
  };

  const isAddressValid = (address) => {
    const postalCodeRegex =
      /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$/i;
    return (
      address.streetAddress.length >= 5 &&
      address.city.length >= 3 &&
      address.province &&
      address.postalCode &&
      postalCodeRegex.test(address.postalCode)
    );
  };

  const validateFormData = (newValue) => {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const phoneRegex =
      /^\+?(\d{1,3})?[-.\s]?(\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4})$/;

    const isValid =
      (name === "address" && isAddressValid(newValue)) ||
      (name === "addChild" &&
        newValue.firstName.length >= 2 &&
        newValue.lastName.length >= 2 &&
        newValue.dob &&
        isChild(newValue.dob)) ||
      (name === "kids" &&
        newValue.firstName.length >= 2 &&
        newValue.lastName.length >= 2 &&
        newValue.dob &&
        isChild(newValue.dob)) ||
      (name === "fullName" &&
        newValue.firstName.length >= 2 &&
        newValue.lastName.length >= 2) ||
      (name === "dob" && isAdult(newValue)) ||
      (name === "email" && emailRegex.test(newValue)) ||
      (name === "phone" &&
        phoneRegex.test(
          newValue
            .replace(/\s/g, "")
            .replace(/-/g, "")
            .replace(/\(/g, "")
            .replace(/\)/g, "")
        ));

    setIsFormDataValid(isValid);
    return isValid;
  };

  const handleEdit = (childId = null) => {
    if (name === "kids") {
      // setIsEditing((prev) => {
      //   const newState = { ...prev, [childId]: !prev[childId] };
      //   console.log("New isEditing state:", newState);
      //   return newState;
      // });
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
    showToast({
      title: `Are you sure you want to delete profile of ${childFirstName} ${childLastName}?`,
      onConfirm: () => handleDeleteChild(childId),
      onConfirmBtnText: "Delete",
    });
  };

  const renderEditContent = (kid = null) => {
    if (name === "address")
      return <AddressForm address={editedValue} onChange={handleFormChange} />;

    if (name === "kids" && kid) {
      return (
        <ChildForm
          child={editedValue[kid.kidId] || kid}
          onChange={(data) => handleFormChange(data, kid.kidId)}
        />
      );
    }

    if (name === "addChild")
      return <ChildForm child={editedValue} onChange={handleFormChange} />;

    if (name === "fullName")
      return <NameForm fullName={editedValue} onChange={handleFormChange} />;

    return (
      <FormRow
        type={inputType}
        name={name}
        value={editedValue}
        onChange={handleChange}
        isLabeled={false}
        //TODO minus day doesnt work, bug in valudating day
        max={formatDate(
          new Date(
            new Date().setFullYear(new Date().getFullYear() - 18) - 86400000
          )
        )}
      />
    );
  };

  const renderViewContent = (kid = null) => {
    if (name === "address") {
      if (isAddressEmpty(editedValue)) {
        return <span className="b1 value empty">No address provided</span>;
      }
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
          <span className="b1 value">{formatDate(new Date(kid.dob))}</span>
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
            {isEditing || (name === "address" && isAddressEmpty(editedValue))
              ? renderEditContent()
              : renderViewContent()}
          </div>
          <div className="actions">
            <button
              type="button"
              className="text-button"
              onClick={handleEdit}
              disabled={isEditing && !isFormDataValid}
            >
              <span className="b1 edit">{isEditing ? "Save" : "Edit"}</span>
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
