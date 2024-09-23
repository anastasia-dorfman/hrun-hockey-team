import { useState, useMemo } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";
import Wrapper from "../../assets/wrappers/Dashboard";
import LeadersCard from "../../components/LeadersCard";
import CriteriaSwitcher from "../../components/CriteriaSwitcher.jsx";

const Dashboard = () => {
  const { filters, stats } = useOutletContext();

  const seasons = [...new Set(stats.map((s) => s.season))];

  const [skaterCriteria, setSkaterCriteria] = useState("points");
  const [goalieCriteria, setGoalieCriteria] = useState("gaa");

  const filteredStats = useMemo(() => {
    return stats.filter(
      (s) => s.season === filters.season && s.gameType === filters.gameType
      // && s.franchise === filters.franchise
    );
  }, [stats, filters]);

  const sumSkaterStats = (players) => {
    return players.reduce((acc, player) => {
      const key = `${player.firstName} ${player.lastName}`;
      if (!acc[key]) {
        acc[key] = {
          ...player,
          gamesPlayed: 0,
          points: 0,
          goals: 0,
          assists: 0,
        };
      }
      acc[key].gamesPlayed += player.gamesPlayed;
      acc[key].points += player.points;
      acc[key].goals += player.goals;
      acc[key].assists += player.assists;
      return acc;
    }, {});
  };

  const sumGoalieStats = (players) => {
    return players.reduce((acc, player) => {
      const key = `${player.firstName} ${player.lastName}`;
      if (!acc[key]) {
        acc[key] = {
          ...player,
          gamesPlayed: 0,
          saves: 0,
          shotsAgainst: 0,
          goalsAgainst: 0,
          shutouts: 0,
        };
      }
      acc[key].gamesPlayed += player.gamesPlayed;
      acc[key].saves += player.saves;
      acc[key].shotsAgainst += player.shotsAgainst;
      acc[key].goalsAgainst += player.goalsAgainst;
      acc[key].shutouts += player.shutouts;
      return acc;
    }, {});
  };

  const skaters = useMemo(() => {
    const skatersData = filteredStats.filter(
      (player) => player.playerType === "skater"
    );

    const summedSkaters = Object.values(sumSkaterStats(skatersData));
    return summedSkaters
      .map((player) => ({ ...player }))
      .sort((a, b) => b[skaterCriteria] - a[skaterCriteria])
      .slice(0, 6);
  }, [filteredStats, skaterCriteria]);

  const goalies = useMemo(() => {
    const goaliesData = filteredStats.filter(
      (player) => player.playerType === "goalie"
    );

    const summedGoalies = Object.values(sumGoalieStats(goaliesData));
    return summedGoalies
      .map((player) => ({
        ...player,
        sv: player.shotsAgainst ? player.saves / player.shotsAgainst : 0,
        gaa: player.timeOnIce
          ? // ? Math.round((player.goalsAgainst / (player.timeOnIce / 60)) * 100)
            player.goalsAgainst / (player.timeOnIce / 60)
          : 0,
      }))
      .sort((a, b) => {
        if (goalieCriteria === "sv" || goalieCriteria === "gaa") {
          return a[goalieCriteria] - b[goalieCriteria];
        }
        return b[goalieCriteria] - a[goalieCriteria];
      })
      .slice(0, 6);
  }, [filteredStats, goalieCriteria]);

  return (
    <Wrapper>
      <div className="players-container">
        <div className="skaters-container">
          <Link to="/stats/skaters" className="custom-link">
            <h2 className="link-text">Skaters</h2>
            <span className="link-icon">
              <MdKeyboardArrowRight />
            </span>
          </Link>
          <CriteriaSwitcher
            criteria={skaterCriteria}
            setCriteria={setSkaterCriteria}
            options={["points", "goals", "assists"]}
          />
          {skaters.length > 0 ? (
            <LeadersCard
              skaterType="skater"
              players={skaters}
              criteria={skaterCriteria}
            />
          ) : (
            <div>No skaters data available</div>
          )}
        </div>
        <div className="goalies-container">
          <Link to="/stats/goalies" className="custom-link">
            <h2 className="link-text">Goalies</h2>
            <span className="link-icon">
              <MdKeyboardArrowRight />
            </span>
          </Link>
          <CriteriaSwitcher
            criteria={goalieCriteria}
            setCriteria={setGoalieCriteria}
            options={["gaa", "sv", "shutouts"]}
          />
          {goalies.length > 0 ? (
            <LeadersCard
              skaterType="goalie"
              players={goalies}
              criteria={goalieCriteria}
            />
          ) : (
            <div>No goalies data available</div>
          )}
        </div>
      </div>
    </Wrapper>
  );
};

export default Dashboard;
