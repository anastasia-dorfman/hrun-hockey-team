import Wrapper from "../assets/wrappers/Footer";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import Logo from "./Logo";
import Socials from "./Socials";
import ThemeSwitcher from "./ThemeSwitcher";
import { useTeam } from "../context/TeamContext";

export default function Footer() {
  const { teamName, address, phone, email } = useTeam();

  return (
    <>
      <Wrapper>
        <div className="footer-content">
          <div className="footer-left">
            <div className="footer-branding">
              <Link className="logo-container" to="/">
                <Logo />
              </Link>
              <Socials className="footer-socials" />
            </div>
            <span className="theme-switcher">
              <ThemeSwitcher />
            </span>
          </div>
          <div className="footer-center">
            <div className="footer-sections">
              <section>
                <h4>{teamName}</h4>
                <div className="b1">
                  <Link to="/team">Team</Link>
                  <Link to="/school">Hockey School</Link>
                  <Link to="/events">Events</Link>
                  <Link to="/schedule">Schedule</Link>
                  {/* <Link to="/#contact-us-section">Contact us</Link> */}
                  <HashLink smooth to="/#contact-us-section">
                    Contact Us
                  </HashLink>
                </div>
              </section>
              <section>
                <h4>Quick links</h4>
                <div className="b1">
                  <Link to="/news">News</Link>
                  <Link to="/shop">Shop</Link>
                  <Link to="/stats">Stats</Link>
                  <Link to="/community">Community</Link>
                </div>
              </section>
              <section>
                <h4>Location</h4>
                <div className="b1">
                  <p>{address}</p>
                  <a href={`mailto:${email}`}>{`Email: ${email}`}</a>
                  <p>{phone}</p>
                </div>
              </section>
            </div>
          </div>
        </div>
        <div className="footer-copyright b4">
          {`© 2024 ${teamName}. All Rights Reserved.`}
        </div>
      </Wrapper>
      {/* <div className="created-by">
        <a href="https://hrun.pro/">Created by HRUN</a>
      </div> */}
    </>
  );
}
