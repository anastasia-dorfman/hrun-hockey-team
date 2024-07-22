import React, { useState, useEffect } from "react";
import Wrapper from "../assets/wrappers/LeadersCard";
import { Link } from "react-router-dom";

const LeadersCard = ({ skaterType, players, criteria }) => {
  if (players.length === 0) {
    console.log("No players available in LeadersCard");
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
              <h2>{player.firstName}</h2>
              <h2>{player.lastName}</h2>
            </div>
            <div className="details">
              <img src={player.img} className="team-logo" alt="Castors' Logo" />
              CASTORS • #{player.number} • {player.position}
            </div>
          </div>
        </div>
        <div className="second-part">
          <h4 className="result-name">{criteria.toUpperCase()}</h4>
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
      <div className="player-container">
        {renderPlayerInfo(selectedPlayer, true)}
        {isTransitioning &&
          previousPlayer &&
          renderPlayerInfo(previousPlayer, false)}
      </div>
      <div className="players-list">
        <ol>
          {players.map((p) => (
            <li
              key={p.playerId}
              onMouseEnter={() => handlePlayerHover(p)}
              className={
                p.playerId === selectedPlayer.playerId ? "selected" : ""
              }
            >
              <div className="name">
                {p.firstName} {p.lastName}
              </div>
              {formatValue(p[criteria], criteria)}
            </li>
          ))}
        </ol>
        <div className="button-container">
          <Link to={`/stats/${skaterType}s`}>
            <button>See more</button>
          </Link>
        </div>
      </div>
    </Wrapper>
  );
};

export default LeadersCard;