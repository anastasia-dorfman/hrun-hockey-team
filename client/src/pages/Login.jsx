import { useEffect, useState } from "react";
import {
  Form,
  Link,
  redirect,
  useActionData,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import toast from "react-hot-toast";
import customFetch from "../utils/customFetch";
import { VALIDATION_PATTERNS, ERROR_MESSAGES } from "../utils/clientConstants";
import { useUser } from "../context/UserContext";
import FormRow from "../components/FormRow";
import Wrapper from "../assets/wrappers/CreateAccountAndLogin";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const loginData = Object.fromEntries(formData);
  const errors = {};

  // Validation
  if (!loginData.email.trim()) {
    errors.email = ERROR_MESSAGES.FIELD_REQUIRED("Email");
  } else if (!VALIDATION_PATTERNS.EMAIL.test(loginData.email.trim())) {
    errors.email = ERROR_MESSAGES.INVALID_EMAIL_FORMAT;
  }

  if (!loginData.password) {
    errors.password = ERROR_MESSAGES.FIELD_REQUIRED("Password");
  }

  if (Object.keys(errors).length > 0) {
    return errors;
  }

  try {
    const loginResponse = await customFetch.post("/auth/login", loginData);

    if (loginResponse.data.isDeleted) {
      return {
        success: false,
        isDeleted: true,
        message: loginResponse.data.msg,
        email: loginData.email,
      };
    }

    const userData = await customFetch.get("/user");
    return { success: true, user: userData.data.user };
  } catch (error) {
    let errorMessage = "";

    if (error?.response?.data?.errors) {
      errorMessage = error.response.data.errors
        .map((err) => err.msg)
        .join("\n");
    } else if (error?.response?.data?.msg) {
      errorMessage = error.response.data.msg;
      if (typeof errorMessage === "string") {
        errorMessage = errorMessage
          .split("\n")
          .filter((line) => line.trim() !== "")
          .map((line, index) => {
            const cleanedLine = line.replace(/^\s*,\s*/, "");
            return <div key={index}>{cleanedLine}</div>;
          });
      }
    } else {
      errorMessage = error.message || "An error occurred during login.";
    }

    return { success: false, serverError: errorMessage };
  }
};

const Login = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const navigate = useNavigate();
  const { updateUser } = useUser();
  const actionData = useActionData();
  const [showRestoreOption, setShowRestoreOption] = useState(false);

  useEffect(() => {
    if (actionData?.success && actionData?.user) {
      updateUser(actionData.user);
      navigate("/account");
    } else if (actionData?.isDeleted) {
      setShowRestoreOption(true);
      toast.error(actionData.serverError);
    } else if (actionData?.serverError) {
      toast.error(
        <div className="custom-toast">{actionData.serverError}</div>,
        {
          duration: 2000,
          style: {
            maxWidth: "95%",
            width: "600px",
          },
        }
      );
    }
  }, [actionData, updateUser, navigate]);

  const handleRestoreAccount = async () => {
    try {
      await customFetch.post("/auth/restore-account", {
        email: actionData.email,
      });
      toast.success(
        "Account restored successfully. Please try logging in again."
      );
      setShowRestoreOption(false);
    } catch (error) {
      toast.error("Failed to restore account. Please contact support.");
    }
  };

  return (
    <Wrapper>
      <Form method="post" className="form login">
        <h1>Sign in</h1>
        <FormRow
          type="email"
          name="email"
          className={actionData?.name ? "error" : ""}
          isRequired={false}
          error={actionData?.email}
        />
        <FormRow
          type="password"
          name="password"
          className={actionData?.name ? "error" : ""}
          isRequired={false}
          error={actionData?.password}
        />
        <div className="forgot-password b5">
          {/* TODO */}
          <Link to="/restore-password">Forgot password?</Link>
        </div>
        <button type="submit" className="selected long" disabled={isSubmitting}>
          {isSubmitting ? "Signing in..." : "Sign in"}
        </button>
        {showRestoreOption && (
          <button
            type="button"
            onClick={handleRestoreAccount}
            className="restore-account"
          >
            Restore Account
          </button>
        )}
        <div className="create-account b5">
          <span className="b5">Don't have an account yet?</span>
          <Link to="/register">
            <h5>Sign up</h5>
          </Link>
        </div>
      </Form>
    </Wrapper>
  );
};

export default Login;
