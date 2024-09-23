import { createContext, useContext, useState } from "react";
import { Outlet } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import AccountBigSidebar from "../../components/account/AccountBigSidebar";
import AccountTopbar from "../../components/account/AccountTopbar";
import Wrapper from "../../assets/wrappers/account/AccountLayout";

const AccountContext = createContext();

const AccountLayout = () => {
  const { user, updateUser, logoutUser } = useUser();
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <AccountContext.Provider
      value={{
        user,
        showSidebar,
        toggleSidebar,
        logoutUser,
        updateUser,
      }}
    >
      <Wrapper>
        <AccountBigSidebar />
        <div className="account-container">
          <AccountTopbar />
          <div className="account-page">
            <Outlet context={{ user }} />
          </div>
        </div>
      </Wrapper>
    </AccountContext.Provider>
  );
};

export const useAccountContext = () => useContext(AccountContext);
export default AccountLayout;
