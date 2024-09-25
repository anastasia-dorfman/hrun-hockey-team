import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useUser } from "../../context/UserContext";
import ProfileCard from "../../components/account/ProfileCard";
import Wrapper from "../../assets/wrappers/account/Profile";
import { getDateString, parseAndValidateDate } from "../../utils/functions";
import customFetch from "../../utils/customFetch";

const Profile = () => {
  const { user, updateUser } = useUser();
  const [profileData, setProfileData] = useState(null);
  const [showChildForm, setShowChildForm] = useState(false);
  const [isAddingChild, setIsAddingChild] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      setProfileData({
        firstName: user.firstName,
        lastName: user.lastName,
        dob: user.dob ? getDateString(new Date(user.dob), false) : "",
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
    }
  }, [user]);

  if (!user || !profileData) {
    return <div>Loading user data...</div>;
  }

  const handleEditSubmit = async (name, value) => {
    try {
      setIsSubmitting(true);
      let updatedData = {};

      if (name === "fullName") {
        updatedData.firstName = value.firstName;
        updatedData.lastName = value.lastName;
      } else if (name === "addChild") {
        updatedData.kids = user.kids ? [...user.kids, value] : [value];
      } else if (name === "kids") {
        updatedData.kids = value;
      } else {
        updatedData[name] = value;
      }

      if (updatedData.dob)
        updatedData.dob = parseAndValidateDate(updatedData.dob);

      if (updatedData.kids) {
        updatedData.kids = updatedData.kids.map((kid) => ({
          ...kid,
          dob: parseAndValidateDate(kid.dob),
        }));
      }

      const response = await customFetch.patch("/user", updatedData);
      const updatedUser = response.data.user;

      updateUser(updatedUser);

      toast.success("Profile updated successfully");

      if (name === "addChild") {
        setShowChildForm(false);
        setIsAddingChild(false);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(error.response?.data?.msg || "Error updating profile");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteChild = async (childId) => {
    try {
      let updatedKids = profileData.kids.filter((kid) => kid.kidId !== childId);
      updatedKids = updatedKids.map((kid) => ({
        ...kid,
        dob: parseAndValidateDate(kid.dob),
      }));

      const updatedData = {
        ...profileData,
        dob: parseAndValidateDate(profileData.dob),
        kids: updatedKids,
      };

      const response = await customFetch.patch("/user", updatedData);
      const updatedUser = response.data.user;

      updateUser(updatedUser);
      setProfileData((prevData) => ({
        ...prevData,
        kids: updatedUser.kids.map((kid) => ({
          ...kid,
          dob: parseAndValidateDate(new Date(kid.dob)),
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

  const isAddressEmpty =
    !profileData.address.streetAddress || !profileData.address.city;

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
    {
      title: "Address:",
      name: "address",
      value: profileData.address,
      isEditingMode: isAddressEmpty,
    },
    {
      title: "Child name and last name:",
      name: "kids",
      value: profileData.kids,
    },
    {
      title: "Add new child:",
      name: "addChild",
      value: { firstName: "", lastName: "", dob: "" },
      showCard: showChildForm && !isSubmitting,
      isEditingMode: true,
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
          isEmptyValue={ps.name === "address" ? ps.isEditingMode : !ps.value}
          handleEditSubmit={handleEditSubmit}
          handleDeleteAction={handleDeleteChild}
          inputType={ps.inputType}
          showCard={ps.showCard}
          isEditingMode={
            ps.isEditingMode !== undefined ? ps.isEditingMode : false
          }
        />
      ))}
      <div
        className={`info-card add-kids ${isAddingChild ? "disabled" : ""}`}
        onClick={!isAddingChild && !isSubmitting ? showAddChildForm : null}
      >
        <h4>+ Add kids to your account</h4>
      </div>
    </Wrapper>
  );
};

export default Profile;
