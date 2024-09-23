import { NavLink } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import Logo from "../shared/Logo";
import { useAccountContext } from "../../pages/Account/AccountLayout";
import links from "../../utils/links";
import Wrapper from "../assets/wrappers/AccountSmallSidebar";

const AccountSmallSidebar = () => {
  const { showSidebar, toggleSidebar } = useAccountContext();
  return (
    <Wrapper>
      <div
        className={
          showSidebar ? "sidebar-container show-sidebar" : "sidebar-container"
        }
      >
        <div className="content">
          <button type="button" className="close-btn" onClick={toggleSidebar}>
            <FaTimes />
          </button>
          {/* <header>
            <Logo />
          </header> */}
          <div className="nav-links">
            {links.map((link) => {
              const { text, path, icon } = link;

              return (
                <NavLink
                  to={path}
                  key={text}
                  className="nav-link"
                  onClick={toggleSidebar}
                  end
                >
                  <span className="icon">{icon}</span>
                  {text}
                </NavLink>
              );
            })}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default AccountSmallSidebar;
