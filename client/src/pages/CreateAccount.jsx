import React from "react";
import { Form, useActionData, useNavigation, Link } from "react-router-dom";
import toast from "react-hot-toast";
import customFetch from "../utils/customFetch";
import {
  ERROR_MESSAGES,
  SCHEMA_CONSTRAINTS,
  VALIDATION_PATTERNS,
} from "../utils/clientConstants";
import { isAdult, parseAndValidateDate } from "../utils/functions";
import showToast from "../components/shared/CustomToast";
import FormRow from "../components/shared/FormRow";
import Wrapper from "../assets/wrappers/CreateAccountAndLogin";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const errors = {};

  // Validation
  if (!data.firstName.trim()) {
    errors.firstName = ERROR_MESSAGES.FIRST_NAME_REQUIRED;
  } else if (
    data.firstName.trim().length < SCHEMA_CONSTRAINTS.NAME.MIN_LENGTH
  ) {
    errors.firstName = ERROR_MESSAGES.NAME_TOO_SHORT("First name");
  }

  if (!data.lastName.trim()) {
    errors.lastName = ERROR_MESSAGES.LAST_NAME_REQUIRED;
  } else if (data.lastName.trim().length < SCHEMA_CONSTRAINTS.NAME.MIN_LENGTH) {
    errors.lastName = ERROR_MESSAGES.NAME_TOO_SHORT("Last name");
  }

  if (data.dob) {
    if (!isAdult(data.dob)) {
      errors.dob = ERROR_MESSAGES.ADULT_AGE_REQUIRED;
    }
  }

  if (!VALIDATION_PATTERNS.PHONE.test(data.phone.trim())) {
    errors.phone = ERROR_MESSAGES.INVALID_PHONE_FORMAT;
  }

  if (!data.email.trim()) {
    errors.email = ERROR_MESSAGES.FIELD_REQUIRED("Email");
  } else if (!VALIDATION_PATTERNS.EMAIL.test(data.email.trim())) {
    errors.email = ERROR_MESSAGES.INVALID_EMAIL_FORMAT;
  }

  if (!data.password.trim()) {
    errors.password = ERROR_MESSAGES.FIELD_REQUIRED("Password");
  } else if (!VALIDATION_PATTERNS.PASSWORD.test(data.password)) {
    errors.password = ERROR_MESSAGES.INVALID_PASSWORD_FORMAT;
  }

  if (data.password !== data.confirmPassword) {
    errors.confirmPassword = ERROR_MESSAGES.PASSWORDS_DO_NOT_MATCH;
  }

  if (data.agreeWithDataCollection !== "on") {
    errors.agreeWithDataCollection = ERROR_MESSAGES.AGREE_WITH_DATA_COLLECTION;
  }

  if (Object.keys(errors).length > 0) {
    return errors;
  }

  try {
    await customFetch.post("/auth/register", data);
    showToast({
      type: "success",
      title: "You created account successfully!",
      message: "A Confirmation has been sent to your email.",
      linkText: "Go to login page",
      link: "/login",
    });
    return { success: true };
  } catch (error) {
    let errorMessage = "";

    if (error?.response?.data?.errors) {
      errorMessage = error.response.data.errors
        .map((err) => err.msg)
        .join("\n");
    } else if (error?.response?.data?.msg) {
      errorMessage = error.response.data.msg[0];
      errorMessage = errorMessage
        .split("\n")
        .filter((line) => line.trim() !== "")
        .map((line, index) => {
          const cleanedLine = line.replace(/^\s*,\s*/, "");
          return <div key={index}>{cleanedLine}</div>;
        });
    } else {
      errorMessage = error.message || "An error occurred during registration.";
    }

    toast.error(<div className="custom-toast">{errorMessage}</div>, {
      duration: 5000,
      style: {
        maxWidth: "95%",
        width: "600px",
      },
    });
    return { serverError: errorMessage };
  }
};

const CreateAccount = () => {
  const actionData = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <Wrapper>
      <Form method="post" className="form">
        <h1>Create your account</h1>
        <div className="form-row-inline">
          <FormRow
            type="text"
            name="firstName"
            placeholder="First Name"
            className={actionData?.firstName ? "error" : ""}
            isRequired={false}
            error={actionData?.firstName}
          />
          <FormRow
            type="text"
            name="lastName"
            placeholder="Last Name"
            className={actionData?.lastName ? "error" : ""}
            isRequired={false}
            error={actionData?.lastName}
          />
        </div>
        <FormRow
          type="date"
          name="dob"
          placeholder="Birthday (DD-MM-YYYY)"
          className={actionData?.dob ? "error" : ""}
          isRequired={false}
          error={actionData?.dob}
        />
        <hr />
        <FormRow
          type="text"
          name="phone"
          placeholder="Phone number (+1506 469 5289)"
          className={actionData?.phone ? "error" : ""}
          isRequired={false}
          error={actionData?.phone}
        />
        <FormRow
          type="email"
          name="email"
          className={actionData?.email ? "error" : ""}
          isRequired={false}
          error={actionData?.email}
        />
        <FormRow
          type="checkbox"
          name="agreeWithDataCollection"
          isLabeled
          labelText="I agree that my data is collected and stored."
          className={actionData?.agreeWithDataCollection ? "error" : ""}
          isRequired={false}
          error={actionData?.agreeWithDataCollection}
        />
        <hr />
        <FormRow
          type="password"
          name="password"
          className={actionData?.password ? "error" : ""}
          isRequired={false}
          error={actionData?.password}
        />
        <FormRow
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          className={actionData?.confirmPassword ? "error" : ""}
          isRequired={false}
          error={actionData?.confirmPassword}
        />
        <button type="submit" className="selected" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Continue"}
        </button>
        <div className="sign-in b5">
          <span className="b5">Already have an account?</span>
          <Link to="/login">
            <h5>Sign in</h5>
          </Link>
        </div>
      </Form>
    </Wrapper>
  );
};

export default CreateAccount;
