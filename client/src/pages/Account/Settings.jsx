import React, { useState } from "react";
import { useUser } from "../../context/UserContext";
import ProfileCard from "../../components/Account/ProfileCard";
import Wrapper from "../../assets/wrappers/Account/Settings";
import customFetch from "../../utils/customFetch";
import { languageOptions, USER_STATUSES } from "../../utils/clientConstants";
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
  });

  const handleEditSubmit = async (name, value) => {
    try {
      let updatedData = {};
      if (name === "password") {
        updatedData = { password: value };
      } else {
        updatedData[name] = value;
      }

      const response = await customFetch.patch("/user", updatedData);
      const updatedUser = response.data.user;

      updateUser(updatedUser);

      setProfileData((prevData) => ({
        ...prevData,
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
        status: USER_STATUSES.DELETED,
      });

      if (response.data.user.status === USER_STATUSES.DELETED) {
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
