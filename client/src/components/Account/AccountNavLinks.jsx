import { NavLink } from "react-router-dom";
import { accountPrimaryLinks, accountSecondaryLinks } from "../../utils/links";
import { useUser } from "../../context/UserContext";
import { useAccountContext } from "../../pages/Account/AccountLayout";
import showToast from "../shared/CustomToast";

const NavLinks = ({ isBigSidebar }) => {
  const { toggleSidebar } = useAccountContext();
  const { logoutUser } = useUser();

  const handleLogout = () => {
    showToast({
      title: "Are you sure you want to log out?",
      onConfirm: logoutUser,
      onConfirmBtnText: "Sign out",
    });
  };

  return (
    <div className="nav-links">
      <div className="primary">
        {accountPrimaryLinks.map((link) => {
          const { text, path, icon } = link;
          return (
            <NavLink
              to={path}
              key={text}
              onClick={isBigSidebar ? null : toggleSidebar}
              className="nav-link b2"
              end
            >
              <span className="icon">{icon}</span>
              {text}
            </NavLink>
          );
        })}
      </div>
      <div className="secondary">
        {accountSecondaryLinks.map((link) => {
          const { text, path, icon } = link;
          return (
            <NavLink
              to={path}
              key={text}
              onClick={(e) => {
                if (text === "Sign out") {
                  e.preventDefault();
                  handleLogout();
                } else {
                  isBigSidebar ? null : toggleSidebar();
                }
              }}
              className="nav-link b2"
              end
            >
              <span className="icon">{icon}</span>
              {text}
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default NavLinks;
