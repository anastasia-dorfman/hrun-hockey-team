import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/LeadersCard";
import Logo from "./shared/Logo";
import { POSITION_SHORTCUTS } from "../utils/clientConstants";

const LeadersCard = ({ skaterType, players, criteria }) => {
  if (players.length === 0) {
    return (
      <Wrapper>
        <div>There are no players that meet the requirements.</div>
      </Wrapper>
    );
  }

  const [selectedPlayer, setSelectedPlayer] = useState(players[0]);
  const [previousPlayer, setPreviousPlayer] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setSelectedPlayer(players[0]);
    setPreviousPlayer(null);
    setIsTransitioning(false);
  }, [criteria, players]);

  const formatValue = (value, criteriaType) => {
    if (criteriaType === "sv") {
      return `.${(value * 1000).toFixed(0).padStart(3, "0")}`;
    } else if (criteriaType === "gaa") {
      return value.toFixed(2);
    }
    return value;
  };

  const handlePlayerHover = (player) => {
    if (player.playerId !== selectedPlayer.playerId) {
      setPreviousPlayer(selectedPlayer);
      setSelectedPlayer(player);
      setIsTransitioning(true);
    }
  };

  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setPreviousPlayer(null);
      }, 300); //should match the transition duration in the CSS
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  const renderPlayerInfo = (player, isActive) => {
    if (!player) return null;

    return (
      <div className={`player-info ${isActive ? "active" : ""}`}>
        <div className="first-part">
          <img
            src={player.img}
            className="player-image"
            alt={`${player.firstName} ${player.lastName}`}
          />
          <div className="text-info">
            <div className="name">
              <h4>
                {player.firstName} {player.lastName}
              </h4>
            </div>
            <div className="details b2">
              <span className="team-logo">
                <Logo />
              </span>
              <span className="castors-text">CASTORS</span> • #{player.number} •{" "}
              {Object.keys(POSITION_SHORTCUTS).find(
                (key) => POSITION_SHORTCUTS[key] === player.position
              ) || ""}
            </div>
          </div>
        </div>
        <div className="second-part">
          <p className="result-name b2">{criteria.toUpperCase()}</p>
          <h1 className="result-value">
            {formatValue(player[criteria], criteria)}
          </h1>
        </div>
      </div>
    );
  };

  return players.length <= 0 ? (
    <Wrapper>
      <div>There are no players that meet the requirements.</div>
    </Wrapper>
  ) : (
    <Wrapper>
      <div className="player-wrapper">
        <div className="player-container">
          {renderPlayerInfo(selectedPlayer, true)}
          {isTransitioning &&
            previousPlayer &&
            renderPlayerInfo(previousPlayer, false)}
        </div>
        <ol className="b2">
          {players.map((p, index) => (
            <li
              key={p.playerId}
              onMouseEnter={() => handlePlayerHover(p)}
              className={
                p.playerId === selectedPlayer.playerId ? "selected" : ""
              }
            >
              <span className="name">
                {index + 1}. {p.firstName} {p.lastName}
              </span>
              <span className="value">
                {formatValue(p[criteria], criteria)}
              </span>
            </li>
          ))}
        </ol>
      </div>
      <div className="button-container">
        <Link to={`/stats/${skaterType}s`}>
          <button className="b2">Read more</button>
        </Link>
      </div>
    </Wrapper>
  );
};

export default LeadersCard;
