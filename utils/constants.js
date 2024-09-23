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
};

export const PRODUCT_CATEGORY = {
  WOMEN: "Women",
  MEN: "Men",
  YOUTH: "Youth",
  KIDS: "Kids",
  ADULTS: "Adults",
  GIRLS: "Girls",
  BOYS: "Boys",
};

export const PRODUCT_TYPE = {
  JERSEY: "Jersey",
  HOODIE: "Hoodie",
  HAT: "Hat",
  TSHIRT: "T-Shirt",
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

export const PRODUCT_SIZES = {
  XS: "X-Small",
  S: "Small",
  M: "Medium",
  L: "Large",
  XL: "X-Large",
  XXL: "XX-Large",
  XXXL: "XXX-Large",
  OS: "One Size",
};

export const PRODUCT_SORT_BY = {
  NAME_ASCENDING: "a-z",
  NAME_DESCENDING: "z-a",
  PRICE_ASCENDING: "price-asc",
  PRICE_DESCENDING: "price-desc",
  NEWEST_FIRST: "newest",
  OLDEST_FIRST: "oldest",
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

export const LANGUAGE_OPTIONS = {
  ENGLISH: "English",
  FRENCH: "French",
};

export const WEEKDAYS_ARRAY = Object.values(WEEKDAYS);
export const languageOptions = Object.values(LANGUAGE_OPTIONS);
export const userStatusOptions = Object.values(USER_STATUSES);
export const userRoleOptions = Object.values(USER_ROLES);
export const userFields = Object.values(USER_FIELDS);
export const validationPatterns = Object.values(VALIDATION_PATTERNS);
export const schemaConstraints = Object.values(SCHEMA_CONSTRAINTS);
export const addressFields = Object.values(ADDRESS_FIELDS);
export const kidFields = Object.values(KID_FIELDS);
export const allowedUpdateFields = Object.values(ALLOWED_UPDATE_FIELDS);
