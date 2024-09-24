import React from "react";
import Wrapper from "../assets/wrappers/UpdateCard";
import { HOCKEY_TEAMS_LOGOS } from "../utils/clientConstants";

const UpdateCard = ({
  id,
  title,
  team1,
  team2,
  date,
  team1Score,
  team2Score,
}) => {
  return (
    <Wrapper to={`#`}>
      <div className="update-header">
        <h3>{title}</h3>
        <p className="b3">{date}</p>
      </div>
      <div className="update-results">
        <div className="league">
          <img src={HOCKEY_TEAMS_LOGOS[team1]} alt={team1} />
          <h4>{team1}</h4>
        </div>
        <h4>
          {team1Score} - {team2Score}
        </h4>
        <div className="league">
          <img src={HOCKEY_TEAMS_LOGOS[team2]} alt={team2} />
          <h4>{team2}</h4>
        </div>
      </div>
    </Wrapper>
  );
};

export default UpdateCard;
