import React, { useState, useEffect } from "react";
import { useAccountContext } from "./AccountLayout";
import { useUser } from "../../context/UserContext";
import ProfileCard from "../../components/Account/ProfileCard";
import Wrapper from "../../assets/wrappers/Account/Profile";
import { formatDate } from "../../utils/functions";
import customFetch from "../../utils/customFetch";
import { toast } from "react-hot-toast";

const Profile = () => {
  // const { user, updateUser } = useAccountContext();
  const { user, updateUser } = useUser();

  // useEffect(() => {
  //   console.log("Current user in Profile:", user);
  // }, [user]);

  if (!user) {
    return <div>Loading user data...</div>;
  }

  const [showChildForm, setShowChildForm] = useState(false);
  const [isAddingChild, setIsAddingChild] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    dob: user.dob ? formatDate(new Date(user.dob)) : "",
    email: user.email,
    phone: user.phone || "",
    address: user.address || {
      country: "Canada",
      streetAddress: "",
      apt: "",
      city: "",
      province: "New Brunswick",
      postalCode: "",
    },
    kids: user.kids || [],
  });

  const handleEditSubmit = async (name, value) => {
    try {
      let updatedData = { ...profileData };

      if (name === "fullName") {
        updatedData.firstName = value.firstName;
        updatedData.lastName = value.lastName;
      } else if (name === "addChild") {
        updatedData.kids = [...updatedData.kids, value];
      } else if (name === "kids") {
        updatedData.kids = value;
      } else {
        updatedData[name] = value;
      }

      if (name !== "address") {
        updatedData.address = {
          country: user.address.country || "",
          streetAddress: user.address.streetAddress || "",
          apt: user.address.apt || "",
          city: user.address.city || "",
          province: user.address.province || "",
          postalCode: user.address.postalCode || "",
        };
      }

      // Convert date strings to Date objects before sending to the server
      if (updatedData.dob) {
        updatedData.dob = formatDate(updatedData.dob);
      }
      updatedData.kids = updatedData.kids.map((kid) => ({
        ...kid,
        dob: formatDate(kid.dob),
      }));

      const response = await customFetch.patch("/user", updatedData);
      const updatedUser = response.data.user;

      updateUser(updatedUser);

      setProfileData((prevData) => ({
        ...prevData,
        ...updatedUser,
        dob: updatedUser.dob ? formatDate(new Date(updatedUser.dob)) : "",
        kids: updatedUser.kids.map((kid) => ({
          ...kid,
          dob: formatDate(new Date(kid.dob)),
        })),
      }));

      toast.success("Profile updated successfully");

      if (name === "addChild") {
        setShowChildForm(false);
        setIsAddingChild(false);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(error.response?.data?.msg || "Error updating profile");
    }
  };

  const handleDeleteChild = async (childId) => {
    try {
      let updatedKids = profileData.kids.filter((kid) => kid.kidId !== childId);
      updatedKids = updatedKids.map((kid) => ({
        ...kid,
        dob: formatDate(kid.dob),
      }));

      const updatedData = {
        ...profileData,
        kids: updatedKids,
      };

      const response = await customFetch.patch("/user", updatedData);
      const updatedUser = response.data.user;

      updateUser(updatedUser);
      setProfileData((prevData) => ({
        ...prevData,
        kids: updatedUser.kids.map((kid) => ({
          ...kid,
          dob: formatDate(new Date(kid.dob)),
        })),
      }));

      toast.success("Child profile deleted successfully");
    } catch (error) {
      console.error("Error deleting child profile:", error);
      toast.error(error.response?.data?.msg || "Error deleting child profile");
    }
  };

  const showAddChildForm = () => {
    setShowChildForm(true);
    setIsAddingChild(true);
  };

  const profileSections = [
    {
      title: "First and last name:",
      name: "fullName",
      value: {
        firstName: profileData.firstName,
        lastName: profileData.lastName,
      },
    },
    {
      title: "Date of birth:",
      name: "dob",
      value: profileData.dob,
      inputType: "date",
    },
    {
      title: "Email:",
      name: "email",
      value: profileData.email,
      inputType: "email",
    },
    {
      title: "Phone number:",
      name: "phone",
      value: profileData.phone,
      inputType: "tel",
    },
    { title: "Address:", name: "address", value: profileData.address },
    {
      title: "Child name and last name:",
      name: "kids",
      value: profileData.kids,
    },
    {
      title: "Add new child:",
      name: "addChild",
      value: { firstName: "", lastName: "", dob: "" },
      showCard: showChildForm,
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
          isEmptyValue={
            ps.name === "address" ? !ps.value.streetAddress : !ps.value
          }
          handleEditSubmit={handleEditSubmit}
          handleDeleteAction={handleDeleteChild}
          inputType={ps.inputType}
          showCard={ps.showCard}
        />
      ))}
      <div
        className={`info-card add-kids ${isAddingChild ? "disabled" : ""}`}
        onClick={!isAddingChild ? showAddChildForm : null}
      >
        <h4>+ Add kids to your account</h4>
      </div>
    </Wrapper>
  );
};

export default Profile;
