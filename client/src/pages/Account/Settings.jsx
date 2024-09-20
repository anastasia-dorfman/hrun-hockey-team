import React, { useState, useEffect } from "react";
import { useAccountContext } from "./AccountLayout";
import { useUser } from "../../context/UserContext";
import ProfileCard from "../../components/Account/ProfileCard";
import Wrapper from "../../assets/wrappers/Account/Settings";
import { formatDate } from "../../utils/functions";
import customFetch from "../../utils/customFetch";
import { languageOptions } from "../../utils/clientConstants";
import { toast } from "react-hot-toast";

const Settings = () => {
  const { user, updateUser, logoutUser } = useUser();

  if (!user) {
    return <div>Loading user data...</div>;
  }

  const [profileData, setProfileData] = useState({
    password: {
      currentPassword: "",
      password: "",
      passwordConfirmation: "",
    },
    language: user.language,
    status: user.status,
  });

  const handleEditSubmit = async (name, value) => {
    try {
      let updatedData = {};
      if (name === "password") {
        updatedData = { password: value };
      } else {
        updatedData[name] = value;
      }

      console.log("Updating user data:", updatedData);

      const response = await customFetch.patch("/user", updatedData);
      const updatedUser = response.data.user;

      console.log("Server response:", response.data);

      updateUser(updatedUser);

      setProfileData((prevData) => ({
        ...prevData,
        // ...updatedUser,
        [name]: value,
      }));

      toast.success("Settings updated successfully");
    } catch (error) {
      console.error("Error updating settings:", error);
      toast.error(error.response?.data?.msg || "Error updating settings");
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const response = await customFetch.patch("/user", {
        status: "Deleted",
      });

      if (response.data.user.status === "Deleted") {
        toast.success("Your account has been marked as deleted.");
        logoutUser();
      } else {
        throw new Error("Failed to delete account");
      }
    } catch (error) {
      console.error("Error deleting account:", error);
      toast.error(error.response?.data?.msg || "Error deleting account");
    }
  };

  const profileSections = [
    {
      title: "Password:",
      name: "password",
      value: profileData.password,
    },
    {
      title: "Language:",
      name: "language",
      value: profileData.language,
      inputType: "select",
      options: languageOptions,
    },
    {
      title: "Account:",
      name: "deleteAccount",
      value: `${user.firstName} ${user.lastName}`,
    },
  ];

  return (
    <Wrapper>
      {profileSections.map((ps) => (
        <ProfileCard
          key={ps.name}
          title={ps.title}
          name={ps.name}
          value={ps.value}
          inputType={ps.inputType}
          options={ps.options}
          handleEditSubmit={handleEditSubmit}
          handleDeleteAction={handleDeleteAccount}
        />
      ))}
    </Wrapper>
  );
};

export default Settings;
