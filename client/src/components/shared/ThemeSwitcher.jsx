import { useLocation } from "react-router-dom";
import Wrapper from "../../assets/wrappers/ThemeSwitcher";
import { useTheme } from "../../context/ThemeContext";

export default function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <Wrapper>
      <label className={`switch ${isHomePage ? "home-page-switch" : ""}`}>
        <input
          type="checkbox"
          checked={theme === "light"}
          onChange={toggleTheme}
        />
        {/* <span className="slider round" /> */}
        <span className="slider round">
          <span className="switch-text">
            {theme === "light" ? "Away" : "Home"}
          </span>
        </span>
      </label>
    </Wrapper>
  );
}
