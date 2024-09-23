import { useState, useEffect } from "react";
import { CiLinkedin, CiInstagram, CiFacebook } from "react-icons/ci";

const socials = [
  {
    icon: <CiLinkedin />,
    url: "https://www.linkedin.com",
  },
  {
    icon: <CiInstagram />,
    url: "https://www.instagram.com/",
  },
  {
    icon: <CiFacebook />,
    url: "https://www.facebook.com/CastorsStQ",
  },
];

const Socials = ({ className }) => {
  return (
    <div className={`socials-container ${className}`}>
      {socials.map((s) => (
        <a href={s.url} key={s.url} target="_blank" rel="noopener noreferrer">
          {s.icon}
        </a>
      ))}
    </div>
  );
};

export default Socials;
