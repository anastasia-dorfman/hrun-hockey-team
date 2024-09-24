export const USER_ROLES = {
  USER: "user",
  ADMIN: "admin",
};

export const USER_STATUSES = {
  ACTIVE: "active",
  DELETED: "deleted",
};

export const VALIDATION_PATTERNS = {
  PHONE: /^\+?(\d{1,3})?[-.\s]?(\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4})$/,
  // EMAIL: /^\S+@\S+\.\S+$/,
  EMAIL: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  POSTAL_CODE:
    /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$/i,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9])/,
  DATE: /^(?<month>\w+)\s(?<day>\d{1,2})(,?\s?(?<year>\d{4})?)?$/,
};

export const SCHEMA_CONSTRAINTS = {
  NAME: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 50,
  },
  STREET_ADDRESS: {
    MIN_LENGTH: 5,
  },
  CITY: {
    MIN_LENGTH: 2,
  },
};

export const USER_FIELDS = {
  USER_ID: "userId",
  FIRST_NAME: "firstName",
  LAST_NAME: "lastName",
  DOB: "dob",
  PHONE: "phone",
  EMAIL: "email",
  PASSWORD: "password",
  ADDRESS: "address",
  KIDS: "kids",
  IMAGE: "image",
  ROLE: "role",
  STATUS: "status",
  LANGUAGE: "language",
};

export const ALLOWED_UPDATE_FIELDS = {
  FIRST_NAME: "firstName",
  LAST_NAME: "lastName",
  DOB: "dob",
  PHONE: "phone",
  EMAIL: "email",
  PASSWORD: "password",
  ADDRESS: "address",
  KIDS: "kids",
  // IMAGE: "image",
  STATUS: "status",
  LANGUAGE: "language",
};

export const ADDRESS_FIELDS = {
  COUNTRY: "country",
  PROVINCE: "province",
  CITY: "city",
  POSTAL_CODE: "postalCode",
  STREET_ADDRESS: "streetAddress",
  APT: "apt",
};

export const KID_FIELDS = {
  KID_ID: "kidId",
  FIRST_NAME: "firstName",
  LAST_NAME: "lastName",
  DOB: "dob",
};

export const ERROR_MESSAGES = {
  FIELD_REQUIRED: (field) => `${field} is required\n`,
  FIRST_NAME_REQUIRED: "First name is required\n",
  LAST_NAME_REQUIRED: "Last name is required\n",
  NAME_TOO_SHORT: (field) =>
    `${field} must be at least ${SCHEMA_CONSTRAINTS.NAME.MIN_LENGTH} characters long\n`,
  NAME_TOO_LONG: (field) =>
    `${field} must not exceed ${SCHEMA_CONSTRAINTS.MAX_LENGTH} characters\n`,
  INVALID_UPDATE_FIELDS: "Invalid update fields\n",
  ADULT_AGE_REQUIRED: "You must be at least 18 years old\n",
  CHILD_AGE_REQUIRED: "Child must be less than 18 years old.\n",
  INVALID_PHONE_FORMAT:
    "Phone number must be valid and in the format (123) 456-7890\n",
  INVALID_EMAIL_FORMAT: "Invalid email format\n",
  EMAIL_EXISTS: "Email already exists\n",
  STREET_ADDRESS_TOO_SHORT: `Street address must be at least ${SCHEMA_CONSTRAINTS.STREET_ADDRESS.MIN_LENGTH} characters long\n`,
  CITY_TOO_SHORT: `City must be at least ${SCHEMA_CONSTRAINTS.CITY.MIN_LENGTH} characters long\n`,
  PROVINCE_REQUIRED: "Province is required\n",
  INVALID_POSTAL_CODE: "Postal code is not valid\n",
  CHILD_NAME_TOO_SHORT: (field) =>
    `Child's ${field} must be at least ${SCHEMA_CONSTRAINTS.NAME.MIN_LENGTH} characters long\n`,
  INVALID_CHILD_DOB: `Child date of birth is invalid\n`,
  INVALID_LANGUAGE: "Invalid language option\n",
  PASSWORD_OBJECT_REQUIRED: "Password must be an object\n",
  PASSWORD_FIELDS_REQUIRED:
    "Current password, new password, and password confirmation are required\n",
  PASSWORDS_DO_NOT_MATCH: "Passwords do not match\n",
  INVALID_PASSWORD_FORMAT:
    "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character\n",
  INVALID_STATUS: "Invalid status option\n",
  AGREE_WITH_DATA_COLLECTION: "You must agree with data collection\n",
};

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

export const HOCKEY_TEAMS = {
  BB: "Boston Bruins",
  SK: "Saskatoon Blades",
  Kings: "Los Angeles Kings",
  NFL: "Newfoundlands",
  FL: "Florida Panthers",
  DS: "Dallas Stars",
  TBL: "Tampa Bay Lightning",
  TL: "Toronto Maple Leafs",
  NHL: "National Hockey League",
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

export const LANGUAGE_OPTIONS = {
  ENGLISH: "English",
  FRENCH: "French",
};

export const statsGeneralShortcuts = Object.values(STATS_SHORTCUTS_GENERAL);
export const statsSkaterShortcuts = Object.values(STATS_SHORTCUTS_SKATER);
export const positionShortcuts = Object.values(POSITION_SHORTCUTS);
export const categories = Object.values(PRODUCT_CATEGORY);
export const types = Object.values(PRODUCT_TYPE);
export const languageOptions = Object.values(LANGUAGE_OPTIONS);
export const userStatusOptions = Object.values(USER_STATUSES);
export const userRoleOptions = Object.values(USER_ROLES);
export const userFields = Object.values(USER_FIELDS);
export const validationPatterns = Object.values(VALIDATION_PATTERNS);
export const schemaConstraints = Object.values(SCHEMA_CONSTRAINTS);
export const addressFields = Object.values(ADDRESS_FIELDS);
export const kidFields = Object.values(KID_FIELDS);
export const allowedUpdateFields = Object.values(ALLOWED_UPDATE_FIELDS);
