import NavLinks from "./AccountNavLinks";
import Logo from "../shared/Logo";
import Wrapper from "../../assets/wrappers/account/AccountBigSidebar";
import { useAccountContext } from "../../pages/account/AccountLayout";

const AccountBigSidebar = () => {
  const { showSidebar } = useAccountContext();
  return (
    <Wrapper>
      <div
        className={
          showSidebar ? "sidebar-container " : "sidebar-container show-sidebar"
        }
      >
        <div className="logo-container">
          <Logo />
        </div>
        <NavLinks isBigSidebar />
      </div>
    </Wrapper>
  );
};

export default AccountBigSidebar;
