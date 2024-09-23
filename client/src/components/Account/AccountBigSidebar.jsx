import NavLinks from "./AccountNavLinks";
import Logo from "../../components/shared/Logo";
import Wrapper from "../../assets/wrappers/Account/AccountBigSidebar";
import { useAccountContext } from "../../pages/Account/AccountLayout";

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
