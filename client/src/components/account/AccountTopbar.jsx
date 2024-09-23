import React from "react";
import { useLocation } from "react-router-dom";
import Wrapper from "../../assets/wrappers/account/AccountTopbar";
import { useAccountContext } from "../../pages/account/AccountLayout";

const AccountTopbar = () => {
  const { user } = useAccountContext();
  const location = useLocation();

  const avatarUrl = `https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}&background=cde5ea&rounded=true`;

  const getHeading = () => {
    switch (location.pathname) {
      case "/account":
        return `Nice to see you here, ${user.firstName}`;
      case "/account/register":
        return "Choose suitable class for Hockey team";
      case "/account/orders":
        return "Here you can see your latest orders";
      case "/account/settings":
        return "Your profile settings";
      default:
        return `Nice to see you here, ${user.firstName}`;
    }
  };

  return (
    <Wrapper>
      <div className="welcome-message-container">
        <h3>{getHeading()}</h3>
      </div>
      <div className="image-container">
        <span className="username b2">
          {user.firstName} {user.lastName}
        </span>
        <img
          className="avatar"
          src={`${user.image && user.image !== "" ? user.image : avatarUrl}`}
          alt={`${user.firstName} ${user.lastName}`}
        />
      </div>
    </Wrapper>
  );
};

export default AccountTopbar;
