import { useState, useEffect, useContext } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { LiaShoppingCartSolid } from "react-icons/lia";
import { FaBars, FaTimes, FaRegUser } from "react-icons/fa";
import { CartContext } from "../../context/CartContext";
import Logo from "./Logo";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeSwitcher from "./ThemeSwitcher";
import TeamDropdown from "../TeamDropdown ";
import Wrapper from "../../assets/wrappers/Header";

const Header = ({ isHomePage }) => {
  const { cart } = useContext(CartContext);
  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  const location = useLocation();
  const isContactActive = location.hash === "#contact-us-section";

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <Wrapper className="b3" $isHomePage={isHomePage}>
      <div className="left-side">
        <Link className="logo-container" to="/">
          <Logo />
        </Link>
        <button className="menu-toggle b3" onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
      <nav className={`nav-center ${isMenuOpen ? "show-menu" : ""}`}>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "active-link" : "")}
          onClick={closeMenu}
        >
          Home
        </NavLink>
        <NavLink
          to="/news"
          className={({ isActive }) => (isActive ? "active-link" : "")}
          onClick={closeMenu}
        >
          News
        </NavLink>
        {/* <NavLink
          to="/team"
          className={({ isActive }) => (isActive ? "active-link" : "")}
          onClick={closeMenu}
        >
          Team
        </NavLink> */}
        <TeamDropdown closeMenu={closeMenu} isMobile={isMobile} />
        <NavLink
          to="/shop"
          className={({ isActive }) => (isActive ? "active-link" : "")}
          onClick={closeMenu}
        >
          Shop
        </NavLink>
        <NavLink
          to="/schedule"
          className={({ isActive }) => (isActive ? "active-link" : "")}
          onClick={closeMenu}
        >
          Schedule
        </NavLink>
        <NavLink
          to="/community"
          className={({ isActive }) => (isActive ? "active-link" : "")}
          onClick={closeMenu}
        >
          Community
        </NavLink>
        <NavLink
          to="/school"
          className={({ isActive }) => (isActive ? "active-link" : "")}
          onClick={closeMenu}
        >
          Hockey School
        </NavLink>
        <NavLink
          to="/events"
          className={({ isActive }) => (isActive ? "active-link" : "")}
          onClick={closeMenu}
        >
          Events
        </NavLink>
        <HashLink
          smooth
          to="/#contact-us-section"
          className={isContactActive ? "active-link" : ""}
          onClick={closeMenu}
        >
          Contact Us
        </HashLink>
      </nav>
      <div className="right-side">
        <LanguageSwitcher className="lang-switcher" />
        <div className="icons-section">
          <Link to="/account" className="user-btn">
            <div className="user-btn-wrapper">
              <FaRegUser />
            </div>
          </Link>
          <Link to="/cart" className="cart-btn">
            <div className="cart-icon-wrapper">
              <LiaShoppingCartSolid />
              {cartItemsCount > 0 && (
                <span className="cart-item-count">{cartItemsCount}</span>
              )}
            </div>
          </Link>
        </div>
        <ThemeSwitcher />
      </div>
    </Wrapper>
  );
};

export default Header;
