import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useUser } from "../context/UserContext";
import CustomWelcomeToast from "../components/shared/CustomWelcomeToast";
import Wrapper from "../assets/wrappers/GroupCard";

const GroupCard = ({ id, name, minAge, maxAge, decription, img }) => {
  const navigate = useNavigate();
  const { user } = useUser();

  const handleRegistrationClick = () => {
    if (user) {
      navigate("/account/register");
    } else {
      toast.custom(
        (t) => (
          <CustomWelcomeToast
            onClose={() => toast.dismiss(t.id)}
            onSignUp={() => {
              toast.dismiss(t.id);
              navigate("/register");
            }}
            onSignIn={() => {
              toast.dismiss(t.id);
              navigate("/login");
            }}
          />
        ),
        {
          duration: Infinity,
          position: "top-center",
        }
      );
    }
  };

  return (
    <Wrapper>
      <img src={img} alt={name} />
      <div className="info">
        <h3 className="name">{name}</h3>
        <h4 className="age">
          {minAge} - {maxAge} years
        </h4>
        <p className="b2 desc">{decription}</p>
        <button
          className="b2 selected registration"
          onClick={handleRegistrationClick}
        >
          Register here
        </button>
      </div>
    </Wrapper>
  );
};

export default GroupCard;
