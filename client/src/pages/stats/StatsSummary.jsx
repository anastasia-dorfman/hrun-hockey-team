import { useMemo, useState } from "react";
import { useOutletContext } from "react-router-dom";
import Wrapper from "../../assets/wrappers/StatsSummary";
import {
  STATS_SHORTCUTS_GENERAL,
  statsGeneralShortcuts,
  STATS_FULL_NAMES_GENERAL,
  STATS_SHORTCUTS_SKATER,
  statsSkaterShortcuts,
  STATS_FULL_NAMES_SKATER,
  STATS_SHORTCUTS_GOALIE,
  STATS_FULL_NAMES_GOALIE,
  POSITION_SHORTCUTS,
  REPORTS,
  POSITIONS,
  getKeyByValue,
  getFullNameByShortcut,
} from "../../utils/clientConstants";

const STATS_MAPPING = {
  PLAYER: (player, index) =>
    `${index + 1}. ${player.firstName} ${player.lastName}`,
  SEASON: "season",
  SKATER_SHOOTS: "skaterShoots",
  PLAYER_POSITION: (player) =>
    getKeyByValue(POSITION_SHORTCUTS, player.position) || player.position,
  GAMES_PLAYED: "gamesPlayed",
  GOALS: "goals",
  ASSISTS: "assists",
  POINTS: "points",
  PLUS_MINUS: "plusMinus",
  PENALTY_MINUTES: "penaltyMinutes",
  POINTS_PER_GAME: (player) => player.points / player.gamesPlayed,
  EVEN_STRENGTH_GOALS: "evenStrengthGoals",
  EVEN_STRENGTH_POINTS: "evenStrengthPoints",
  POWER_PLAY_GOALS: "powerPlayGoals",
  POWER_PLAY_POINTS: "powerPlayPoints",
  SHORTHANDED_GOALS: "shorthandedGoals",
  SHORTHANDED_POINTS: "shorthandedPoints",
  OVERTIME_GOALS: "overtimeGoals",
  GAME_WINNING_GOALS: "gameWinningGoals",
  SHOTS: "shots",
  SHOOTING_PERCENTAGE: (player) => (player.goals / player.shots) * 100,
  // TODO convert to hours and minutes
  TIME_ON_ICE_PER_GAME: (player) => player.timeOnIce / player.gamesPlayed,
  FACEOFF_PERCENTAGE: (player) =>
    (player.faceoffsWon / (player.faceoffsWon + player.faceoffsLost)) * 100,
};

const StatsSummary = ({ playerType }) => {
  const { filters, stats, rangeType } = useOutletContext();
  const [sortConfig, setSortConfig] = useState([]);

  const STATS_SHORTCUTS =
    playerType === "skater" ? STATS_SHORTCUTS_SKATER : STATS_SHORTCUTS_GOALIE;
  const STATS_FULL_NAMES =
    playerType === "skater" ? STATS_FULL_NAMES_SKATER : STATS_FULL_NAMES_GOALIE;
  const statsShortcuts =
    playerType === "skater"
      ? statsSkaterShortcuts
      : Object.values(STATS_SHORTCUTS_GOALIE);

  const filteredStats = useMemo(() => {
    let newStats = stats;

    if (rangeType === "By game") {
      newStats = newStats.filter(
        (s) =>
          s.date >= new Date(filters.startDate) &&
          s.date <= new Date(filters.endDate)
      );
    } else if (rangeType === "By season") {
      newStats = newStats.filter(
        (s) => s.season >= filters.startSeason && s.season <= filters.endSeason
      );
    }

    return newStats.filter(
      (s) =>
        s.gameType === filters.gameType &&
        s.playerType === playerType &&
        (filters.position === "1" ||
          (filters.position === "2" && s.position !== POSITIONS["6"]) ||
          s.position === POSITIONS[filters.position])
    );
  }, [stats, filters, playerType]);

  const sumPlayerStats = (players) => {
    return players.reduce((acc, player) => {
      const key = `${player.firstName} ${player.lastName}`;
      if (!acc[key]) {
        acc[key] = { ...player };
        Object.keys(STATS_SHORTCUTS).forEach((stat) => {
          if (typeof player[stat] === "number") {
            acc[key][stat] = 0;
          }
        });
      }
      Object.keys(STATS_SHORTCUTS).forEach((stat) => {
        if (typeof player[stat] === "number") {
          acc[key][stat] += player[stat];
        }
      });
      return acc;
    }, {});
  };

  const players = useMemo(() => {
    const summedPlayers = Object.values(sumPlayerStats(filteredStats));
    return summedPlayers.map((player) => ({ ...player }));
  }, [filteredStats]);

  const sortedPlayers = useMemo(() => {
    const sortablePlayers = [...players];
    if (sortConfig.length === 0) return sortablePlayers;

    return sortablePlayers.sort((a, b) => {
      for (const { key, direction } of sortConfig) {
        const aValue = STATS_MAPPING[key]
          ? typeof STATS_MAPPING[key] === "function"
            ? STATS_MAPPING[key](a)
            : a[STATS_MAPPING[key]]
          : a[key];
        const bValue = STATS_MAPPING[key]
          ? typeof STATS_MAPPING[key] === "function"
            ? STATS_MAPPING[key](b)
            : b[STATS_MAPPING[key]]
          : b[key];

        if (aValue < bValue) {
          return direction === "ascending" ? -1 : 1;
        }
        if (aValue > bValue) {
          return direction === "ascending" ? 1 : -1;
        }
      }
      return 0;
    });
  }, [players, sortConfig]);

  const isSorted = (key) => {
    return sortConfig.some((config) => config.key === key);
  };

  const requestSort = (key) => {
    let newSortConfig = [...sortConfig];
    const configIndex = newSortConfig.findIndex((item) => item.key === key);

    if (configIndex !== -1) {
      if (newSortConfig[configIndex].direction === "ascending") {
        newSortConfig[configIndex].direction = "descending";
      } else {
        newSortConfig.splice(configIndex, 1);
      }
    } else {
      newSortConfig.push({ key, direction: "ascending" });
    }

    setSortConfig(newSortConfig);
  };

  const getSortDirection = (key) => {
    const config = sortConfig.find((item) => item.key === key);
    if (config) {
      return config.direction === "ascending" ? "↑" : "↓";
    }
    return "";
  };

  const renderCell = (player, stat, index) => {
    const value = STATS_MAPPING[stat];
    let cellValue;

    if (typeof value === "function") {
      cellValue = value(player, index);
    } else {
      cellValue = player[value];
    }

    if (
      isNaN(cellValue) &&
      ![
        "PLAYER",
        "SEASON",
        "SKATER_SHOOTS",
        "GOALIE_CATCHES",
        "PLAYER_POSITION",
      ].includes(stat)
    ) {
      return "-";
    }

    if (
      [
        "POINTS_PER_GAME",
        "SHOOTING_PERCENTAGE",
        "FACEOFF_PERCENTAGE",
        "SAVE_PERCENTAGE",
      ].includes(stat)
    )
      return cellValue.toFixed(2);

    if (stat === "PLAYER_POSITION") return cellValue;

    return cellValue;
  };

  return (
    <Wrapper>
      <h2>{REPORTS[filters.report]}</h2>
      {REPORTS[filters.report] === "Summary" && (
        <div className="table-container">
          <table className="players-table">
            <thead>
              <tr>
                {players.length === 0 ? (
                  <th className="no-data b3"></th>
                ) : (
                  <>
                    {statsGeneralShortcuts.map((sg) => {
                      const key = getKeyByValue(STATS_SHORTCUTS_GENERAL, sg);
                      return (
                        <th
                          key={sg}
                          className={`b3 ${
                            isSorted(key) ? "sorted-column" : ""
                          }`}
                          title={getFullNameByShortcut(
                            sg,
                            STATS_SHORTCUTS_GENERAL,
                            STATS_FULL_NAMES_GENERAL
                          )}
                          onClick={() => requestSort(key)}
                        >
                          {sg} {getSortDirection(key)}
                        </th>
                      );
                    })}
                    {statsShortcuts.map((ss) => {
                      const key = getKeyByValue(STATS_SHORTCUTS, ss);
                      return (
                        <th
                          key={ss}
                          className={`b3 ${
                            isSorted(key) ? "sorted-column" : ""
                          }`}
                          title={getFullNameByShortcut(
                            ss,
                            STATS_SHORTCUTS,
                            STATS_FULL_NAMES
                          )}
                          onClick={() => requestSort(key)}
                        >
                          {ss} {getSortDirection(key)}
                        </th>
                      );
                    })}
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {players.length === 0 ? (
                <tr>
                  <td className="no-data">There is no data to display.</td>
                </tr>
              ) : (
                sortedPlayers.map((player, index) => (
                  <tr key={index}>
                    {Object.keys(STATS_SHORTCUTS_GENERAL).map((sg) => (
                      <td
                        key={sg}
                        className={`b2 ${isSorted(sg) ? "sorted-column" : ""}`}
                      >
                        {renderCell(player, sg, index)}
                      </td>
                    ))}
                    {Object.keys(STATS_SHORTCUTS).map((ss) => {
                      const cellValue = renderCell(player, ss, index);
                      return (
                        <td
                          key={ss}
                          className={`b2 ${
                            isSorted(ss) ? "sorted-column" : ""
                          }`}
                          title={
                            ss === "PLAYER_POSITION"
                              ? POSITION_SHORTCUTS[cellValue] || player.position
                              : undefined
                          }
                        >
                          {cellValue}
                        </td>
                      );
                    })}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </Wrapper>
  );
};

export default StatsSummary;
