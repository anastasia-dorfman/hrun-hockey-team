import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getDateString } from "../utils/functions";
import { HOCKEY_TEAMS } from "../utils/clientConstants";
import UpdateCard from "./UpdateCard";
import Wrapper from "../assets/wrappers/HomePageSections";

const UpdatesSection = ({ latestUpdates, upcomingGame }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const matchDateTime = new Date(upcomingGame.dateTime);
      const timeDiff = matchDateTime - now;

      if (timeDiff > 0) {
        setTimeLeft({
          days: Math.floor(timeDiff / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((timeDiff % (1000 * 60)) / 1000),
        });
      } else {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [upcomingGame]);

  return (
    <Wrapper>
      <div className="home-page-section">
        <div className="section-title-container updates">
          <h1 className="section-title">Hockey info and updates</h1>
          {upcomingGame && (
            <div className="upcoming-match">
              <div className="teams">
                <h4>Upcoming match</h4>
                <p className="b4">
                  {HOCKEY_TEAMS[upcomingGame.team1]} VS{" "}
                  {HOCKEY_TEAMS[upcomingGame.team2]}
                </p>
              </div>
              <div className="time-left-container">
                <div className="time-left right-border">
                  <h4>{timeLeft.days}</h4>
                  <p className="b4">Days</p>
                </div>
                <div className="time-left right-border">
                  <h4>{timeLeft.hours}</h4>
                  <p className="b4">Hours</p>
                </div>
                <div className="time-left right-border">
                  <h4>{timeLeft.minutes}</h4>
                  <p className="b4">Minutes</p>
                </div>
                <div className="time-left">
                  <h4>{timeLeft.seconds}</h4>
                  <p className="b4">Seconds</p>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="home-page-section-container update-cards">
          {latestUpdates.map((u) => (
            <UpdateCard
              key={u.id}
              id={u.gameId}
              title={u.league}
              team1={u.team1}
              team2={u.team2}
              team1Logo={u.team1Logo}
              team2Logo={u.team2Logo}
              date={getDateString(u.dateTime, false)}
              team1Score={u.team1Score}
              team2Score={u.team2Score}
            />
          ))}
        </div>
      </div>
    </Wrapper>
  );
};

export default UpdatesSection;
