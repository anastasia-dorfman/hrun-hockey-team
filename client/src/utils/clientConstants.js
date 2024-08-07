export const PRODUCT_CATEGORY = {
  WOMEN: "Women",
  MEN: "Men",
  YOUTH: "Youth",
  KIDS: "Kids",
};

export const PRODUCT_TYPE = {
  JERSEY: "Jersey",
  HOODIE: "Hoodie",
  HAT: "Hat",
  NOVELTY: "Novelty",
};

export const PRODUCT_COLORS = {
  BLACK: "Black",
  WHITE: "White",
  RED: "Red",
  BLUE: "Blue",
  BROWN: "Brown",
  GREEN: "Green",
  PINK: "Pink",
  YELLOW: "Yellow",
  PURPLE: "Purple",
  MULTI: "Multicolor",
};

export const WEEKDAYS = {
  MONDAY: "Monday",
  TUESDAY: "Tuesday",
  WEDNESDAY: "Wednesday",
  THURSDAY: "Thursday",
  FRIDAY: "Friday",
  SATURDAY: "Saturday",
  SUNDAY: "Sunday",
};

export const GAME_TYPE = {
  REGULAR: "Regular Season",
  PLAYOFF: "Playoffs",
};

export const FRANCHISES = {
  ALL: "All Franchises",
  ANAHEIM_DUCKS: "Anaheim Ducks",
  BRUINS: "Boston Bruins",
  SABRES: "Buffalo Sabres",
  FLAMES: "Calgary Flames",
};

export const POSITIONS = {
  1: "All Skaters",
  2: "Forward",
  3: "Left Wing",
  4: "Right Wing",
  5: "Center",
  6: "Defenseman",
};

export const REPORTS = {
  1: "Summary",
  2: "Bio info",
};

export const STATS_SHORTCUTS_GENERAL = {
  PLAYER: "Player",
  SEASON: "Season",
};

export const STATS_FULL_NAMES_GENERAL = {
  PLAYER: "Player",
  SEASON: "Season",
};

export const STATS_SHORTCUTS_SKATER = {
  SKATER_SHOOTS: "S/C",
  PLAYER_POSITION: "Pos",
  GAMES_PLAYED: "GP",
  GOALS: "G",
  ASSISTS: "A",
  POINTS: "P",
  PLUS_MINUS: "+/-",
  PENALTY_MINUTES: "PIM",
  POINTS_PER_GAME: "P/GP",
  EVEN_STRENGTH_GOALS: "EVG",
  EVEN_STRENGTH_POINTS: "EVP",
  POWER_PLAY_GOALS: "PPG",
  POWER_PLAY_POINTS: "PPP",
  SHORTHANDED_GOALS: "SHG",
  SHORTHANDED_POINTS: "SHP",
  OVERTIME_GOALS: "OTG",
  GAME_WINNING_GOALS: "GWG",
  SHOTS: "S",
  SHOOTING_PERCENTAGE: "S%",
  TIME_ON_ICE_PER_GAME: "TOI/GP",
  FACEOFF_PERCENTAGE: "FOW%",
  // FACEOFF_WINS: "FOW",
  // FACEOFF_TAKEN: "FOT",
  // HITS: "HIT",
  // BLOCKED_SHOTS: "BLK",
  // TAKEAWAYS: "TK",
  // GIVEAWAYS: "GV",
};

export const STATS_FULL_NAMES_SKATER = {
  SKATER_SHOOTS: "Skater Shoots",
  PLAYER_POSITION: "Position",
  GAMES_PLAYED: "Games Played",
  GOALS: "Goals",
  ASSISTS: "Assists",
  POINTS: "Points",
  PLUS_MINUS: "Plus/Minus",
  PENALTY_MINUTES: "Penalty Minutes",
  POINTS_PER_GAME: "Points per Game Played",
  EVEN_STRENGTH_GOALS: "Even Strength Goals",
  EVEN_STRENGTH_POINTS: "Even Strength Points",
  POWER_PLAY_GOALS: "Power Play Goals",
  POWER_PLAY_POINTS: "Power Play Points",
  SHORTHANDED_GOALS: "Shorthanded Goals",
  SHORTHANDED_POINTS: "Shorthanded Points",
  OVERTIME_GOALS: "Overtime Goals",
  GAME_WINNING_GOALS: "Game-Winning Goals",
  SHOTS: "Shots",
  SHOOTING_PERCENTAGE: "Shooting Percentage",
  TIME_ON_ICE: "Time On Ice per Game Played",
  FACEOFF_PERCENTAGE: "Face-off Win Percentage",
  // FACEOFF_WINS: "Faceoff Wins",
  // FACEOFF_TAKEN: "Faceoffs Taken",
  // HITS: "Hits",
  // BLOCKED_SHOTS: "Blocked Shots",
  // TAKEAWAYS: "Takeaways",
  // GIVEAWAYS: "Giveaways",
};

export const STATS_SHORTCUTS_GOALIE = {
  GOALIE_CATCHES: "S/C",
  GAMES_PLAYED: "GP",
  GAMES_STARTED: "GS",
  WINS: "W",
  LOSSES: "L",
  TIES: "T",
  OVERTIME_LOSSES: "OT",
  SHOTS_AGAINST: "SA",
  SAVES: "Svs",
  GOALS_AGAINST: "GA",
  SAVE_PERCENTAGE: "SV%",
  GOALS_AGAINST_AVERAGE: "GAA",
  TIME_ON_ICE: "TOI",
  SHUTOUTS: "SO",
  GOALS: "G",
  ASSISTS: "A",
  POINTS: "P",
  PENALTY_MINUTES: "PIM",
};

export const STATS_FULL_NAMES_GOALIE = {
  GOALIE_CATCHES: "Goalie Catches",
  GAMES_PLAYED: "Games Played",
  GAMES_STARTED: "Games Started",
  WINS: "Wins",
  LOSSES: "Losses",
  TIES: "Ties",
  OVERTIME_LOSSES: "Overtime Losses",
  SHOTS_AGAINST: "Shots Against",
  SAVES: "Saves",
  GOALS_AGAINST: "Goals Against",
  SAVE_PERCENTAGE: "Save Percentage",
  GOALS_AGAINST_AVERAGE: "Goals Against Average",
  TIME_ON_ICE: "Time On Ice",
  SHUTOUTS: "Shutouts",
  GOALS: "Goals",
  ASSISTS: "Assists",
  POINTS: "Points",
  PENALTY_MINUTES: "Penalty Minutes",
};

export const STATS_MAPPING = {
  PLAYER: (player) => `${player.firstName} ${player.lastName}`,
  SEASON: "season",
  SKATER_SHOOTS: "skaterShoots",
  PLAYER_POSITION: "position",
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
  TIME_ON_ICE_PER_GAME: (player) => player.timeOnIce / player.gamesPlayed,
  FACEOFF_PERCENTAGE: (player) =>
    (player.faceoffsWon / (player.faceoffsWon + player.faceoffsLost)) * 100,
};

export const POSITION_SHORTCUTS = {
  C: "Center",
  L: "Left Wing",
  R: "Right Wing",
  D: "Defenseman",
  G: "Goalie",
};

export const getKeyByValue = (object, value) => {
  return Object.keys(object).find((key) => object[key] === value);
};

export const getFullNameByShortcut = (
  shortcut,
  shortcutObject,
  fullNameObject
) => {
  const key = getKeyByValue(shortcutObject, shortcut);
  return fullNameObject[key];
};

export const statsGeneralShortcuts = Object.values(STATS_SHORTCUTS_GENERAL);
export const statsSkaterShortcuts = Object.values(STATS_SHORTCUTS_SKATER);
export const positionShortcuts = Object.values(POSITION_SHORTCUTS);
export const categories = Object.values(PRODUCT_CATEGORY);
export const types = Object.values(PRODUCT_TYPE);
