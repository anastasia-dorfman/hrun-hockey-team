import { useState, useEffect, useMemo } from "react";
import {
  NavLink,
  Outlet,
  useSearchParams,
  useLocation,
} from "react-router-dom";
import Wrapper from "../../assets/wrappers/StatsLayout";
import Dropdown from "../../components/Dropdown";
import DatePicker from "../../components/DatePicker";
import Breadcrumb from "../../components/shared/Breadcrumb";
import {
  GAME_TYPE,
  FRANCHISES,
  POSITIONS,
  REPORTS,
} from "../../utils/clientConstants";
import { mockTeamStats } from "../../data/mockData";
import { parseAndValidateDate } from "../../utils/functions";

const stats = mockTeamStats;

export default function StatsLayout() {
  function getCurrentHockeySeason() {
    const today = new Date();
    const currentYear = today.getFullYear();

    const april30CurrentYear = new Date(currentYear, 3, 30);
    const october1CurrentYear = new Date(currentYear, 9, 1);
    const october1PreviousYear = new Date(currentYear - 1, 9, 1);
    const april30NextYear = new Date(currentYear + 1, 3, 30);

    let seasonStart;
    let seasonEnd;

    if (today < october1CurrentYear) {
      seasonStart = october1PreviousYear;
      seasonEnd = april30CurrentYear;
    } else {
      seasonStart = october1CurrentYear;
      seasonEnd = april30NextYear;
    }

    return {
      seasonStart: parseAndValidateDate(seasonStart),
      seasonEnd: parseAndValidateDate(seasonEnd),
    };
  }

  const currentSeason = getCurrentHockeySeason();

  const seasons = [...new Set(stats.map((s) => s.season))];
  const gameRangeTypes = ["By season", "By game", "All time"];

  const reportRoutes = ["/stats/skaters", "/stats/goalies", "/stats/teams"];
  const location = useLocation();
  const isReportRoutes = reportRoutes.includes(location.pathname);

  const [searchParams, setSearchParams] = useSearchParams();

  const [rangeType, setRangeType] = useState(gameRangeTypes[0]);

  const getInitialFilters = (pathname, searchParams, rangeType) => {
    const initialFilters = {
      gameType: searchParams.get("gameType") || GAME_TYPE.REGULAR,
      franchise: searchParams.get("franchise") || Object.keys(FRANCHISES)[0],
      position: searchParams.get("position") || Object.keys(POSITIONS)[0],
      report: searchParams.get("report") || Object.keys(REPORTS)[0],
    };

    if (pathname === "/stats") {
      initialFilters.season = searchParams.get("season") || seasons[0];
    }

    if (reportRoutes.includes(pathname)) {
      if (rangeType === "By season") {
        initialFilters.startSeason =
          searchParams.get("startSeason") || seasons[0];
        initialFilters.endSeason = searchParams.get("endSeason") || seasons[0];
      } else if (rangeType === "By game") {
        initialFilters.startDate =
          searchParams.get("startDate") || currentSeason.seasonStart;
        initialFilters.endDate =
          searchParams.get("endDate") || currentSeason.seasonEnd;
      }
    }
    return initialFilters;
  };

  const [filters, setFilters] = useState(() =>
    getInitialFilters(location.pathname, searchParams, rangeType)
  );

  const contextValue = { filters, stats, rangeType };

  const filterOptions = useMemo(() => {
    const baseOptions = [
      {
        name: "gameType",
        label: "Game type",
        options: Object.entries(GAME_TYPE).map(([key, value]) => ({
          // value: key,
          value: value,
          label: value,
        })),
      },
      {
        name: "franchise",
        label: "Franchise",
        options: Object.entries(FRANCHISES).map(([key, value]) => ({
          value: key,
          label: value,
        })),
      },
    ];

    const seasonOption = {
      name: "season",
      label: "Seasons",
      options: seasons.map((s) => ({ value: s, label: s })),
    };

    const seasonRangeOptions = [
      {
        name: "startSeason",
        label: "Start Season",
        options: seasons.map((s) => ({ value: s, label: s })),
      },
      {
        name: "endSeason",
        label: "End Season",
        options: seasons.map((s) => ({ value: s, label: s })),
      },
    ];

    const dateRangeOptions = [
      {
        name: "startDate",
        label: "Start Date",
        type: "date",
      },
      {
        name: "endDate",
        label: "End Date",
        type: "date",
      },
    ];

    const positionOption = {
      name: "position",
      label: "Position",
      options: Object.entries(POSITIONS).map(([key, value]) => ({
        value: key,
        label: value,
      })),
    };

    const reportOption = {
      name: "report",
      label: "Report",
      options: Object.entries(REPORTS).map(([key, value]) => ({
        value: key,
        label: value,
      })),
    };

    if (location.pathname === "/stats/glossary") return [];

    let options = [...baseOptions];

    if (location.pathname === "/stats") return [seasonOption, ...options];

    if (isReportRoutes) {
      if (rangeType === "By season") {
        options = [...seasonRangeOptions, ...options];
      } else if (rangeType === "By game") {
        options = [...dateRangeOptions, ...options];
      }

      if (location.pathname === "/stats/skaters")
        options = [...options, positionOption];

      return [...options, reportOption];
    }

    return options;
  }, [location.pathname, rangeType, seasons]);

  const handleFilterChange = (name, value) => {
    // TODO add validation/handling for start-end season/dates
    setFilters((prev) => {
      const newFilters = { ...prev, [name]: value };

      if (
        name === "startSeason" &&
        new Date(value) > new Date(prev.endSeason)
      ) {
        newFilters.endSeason = value;
      }
      if (name === "startDate" && new Date(value) > new Date(prev.endDate)) {
        newFilters.endDate = value;
      }

      return newFilters;
    });
  };

  function handleRangeTypeChange(rangeTypeValue) {
    setRangeType(rangeTypeValue);
    setFilters(
      getInitialFilters(
        location.pathname,
        new URLSearchParams(),
        rangeTypeValue
      )
    );
  }

  useEffect(() => {
    setRangeType(gameRangeTypes[0]);

    setFilters(
      getInitialFilters(
        location.pathname,
        new URLSearchParams(),
        gameRangeTypes[0]
      )
    );
  }, [location.pathname]);

  useEffect(() => {
    const newSearchParams = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        if (
          rangeType === "By game" &&
          (key === "startDate" || key === "endDate")
        ) {
          newSearchParams.set(key, value);
        } else if (
          rangeType === "By season" &&
          (key === "startSeason" || key === "endSeason")
        ) {
          newSearchParams.set(key, value);
        } else if (
          rangeType === "All time" &&
          key !== "season" &&
          key !== "startSeason" &&
          key !== "endSeason" &&
          key !== "startDate" &&
          key !== "endDate"
        ) {
          newSearchParams.set(key, value);
        } else if (
          key !== "startSeason" &&
          key !== "endSeason" &&
          key !== "startDate" &&
          key !== "endDate"
        ) {
          newSearchParams.set(key, value);
        }
      }
    });
    setSearchParams(newSearchParams);
  }, [filters]);

  const breadcrumbLinks = [
    { address: "team", linkText: "Team" },
    { address: "", linkText: `Statistics` },
  ];

  return (
    <Wrapper>
      <Breadcrumb links={breadcrumbLinks} />
      <h1>Statistics</h1>
      <nav className="stats-layout-nav">
        <NavLink
          to="."
          end
          className={({ isActive }) => `${isActive ? "active-link" : ""} b2`}
        >
          Home
        </NavLink>
        <NavLink
          to="skaters"
          className={({ isActive }) => `${isActive ? "active-link" : ""} b2`}
        >
          Skaters
        </NavLink>
        <NavLink
          to="goalies"
          className={({ isActive }) => `${isActive ? "active-link" : ""} b2`}
        >
          Goalies
        </NavLink>
        <NavLink
          to="teams"
          className={({ isActive }) => `${isActive ? "active-link" : ""} b2`}
        >
          Teams
        </NavLink>
        <NavLink
          to="glossary"
          className={({ isActive }) => `b2 ${isActive ? "active-link" : ""}`}
        >
          Glossary
        </NavLink>
      </nav>
      {isReportRoutes && (
        <div className="game-range">
          {gameRangeTypes.map((t) => (
            <button
              key={t}
              className={`b2 range-type btn-ocean ${
                rangeType === t ? "selected" : ""
              }`}
              onClick={() => handleRangeTypeChange(t)}
            >
              {t}
            </button>
          ))}
        </div>
      )}
      {filterOptions.length > 0 && (
        <div className="filters-container">
          {filterOptions.map((f) =>
            f.type === "date" ? (
              <DatePicker
                key={f.name}
                name={f.name}
                labelText={f.label}
                value={filters[f.name]}
                onChange={(value) => handleFilterChange(f.name, value)}
                isFilter={true}
              />
            ) : (
              <Dropdown
                key={f.name}
                name={f.name}
                labelText={f.label}
                options={f.options}
                defaultValue={filters[f.name]}
                isRequired={false}
                isFilter={true}
                onChange={(value) => handleFilterChange(f.name, value)}
              />
            )
          )}
        </div>
      )}
      <Outlet context={contextValue} />
    </Wrapper>
  );
}
