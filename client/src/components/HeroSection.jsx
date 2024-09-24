import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import Socials from "./shared/Socials";
import Wrapper from "../assets/wrappers/HeroSection";

const HeroSection = () => {
  const { theme } = useTheme();

  return (
    <Wrapper theme={theme}>
      <div className="hero-image" />
      <div className="content-wrapper">
        <div className="home-socials-container">
          <Socials className="column" />
          <div className="socials-text">
            <div>We are available</div>
            <div>on the platform</div>
          </div>
        </div>
        <div className="tickets-section">
          <h3>Stay Ahead of All Events</h3>
          <p className="b1">
            Be the first to know about upcoming events and never miss out on the
            excitement. Click below to buy your tickets today!
          </p>
          <button className="buy-ticket selected b2">
            <Link to="/events">Buy A Ticket</Link>
          </button>
        </div>
      </div>
    </Wrapper>
  );
};

export default HeroSection;
