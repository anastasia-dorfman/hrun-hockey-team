import Wrapper from "../../assets/wrappers/LanguageSwitcher";
import { useLanguage } from "../../context/LanguageContext";
import { useState } from "react";

export default function LanguageSwitcher() {
  const { language, changeLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleLanguageChange = (lang) => {
    changeLanguage(lang);
    setIsOpen(false);
  };

  return (
    <Wrapper>
      <div className="language-dropdown" onClick={toggleDropdown}>
        <span className="language">{language}</span>
        <span className="arrow">&#x25BE;</span>
      </div>
      {isOpen && (
        <div className="language-dropdown-menu">
          <div onClick={() => handleLanguageChange("Eng")}>Eng</div>
          <div onClick={() => handleLanguageChange("Fr")}>Fr</div>
        </div>
      )}
    </Wrapper>
  );
}
