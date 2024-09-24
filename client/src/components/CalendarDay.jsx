import React from "react";
import { format, isSameMonth, isSameDay } from "date-fns";
import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/CalendarDay";
import { HOCKEY_TEAMS_LOGOS } from "../utils/clientConstants";

const CalendarDay = ({ day, currentDate, games }) => {
  const getGamesForDay = (day) => {
    return games.filter((game) => isSameDay(new Date(game.dateTime), day));
  };

  const dayGames = getGamesForDay(day);

  return (
    <Wrapper>
      <div
        className={`calendar-day ${
          !isSameMonth(day, currentDate) ? "next-month" : ""
        } ${dayGames.length > 0 ? "has-game" : ""}`}
      >
        <div className="day-info">
          <span className="b3 day-number">{format(day, "d")}</span>
          <span className="b3 weekday-label">{format(day, "EEE")}</span>
        </div>
        {dayGames.map((game) => (
          <Link
            to={`/games/${game.gameId}`}
            key={game.gameId}
            className="game-link"
          >
            <div className="game">
              <div className="b3 game-teams-logo">
                <img
                  src={HOCKEY_TEAMS_LOGOS[game.team1]}
                  alt={game.team1}
                  className="team-logo"
                />
                <span>@</span>
                <img
                  src={HOCKEY_TEAMS_LOGOS[game.team2]}
                  alt={game.team2}
                  className="team-logo"
                />
              </div>
              <div className="b4 game-teams-names">
                {game.team1} @ {game.team2}
              </div>
              <div className="b3 game-time">
                {format(new Date(game.dateTime), "hh:mm a")}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Wrapper>
  );
};

export default CalendarDay;
