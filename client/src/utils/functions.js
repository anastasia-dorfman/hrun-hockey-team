import { format, parse } from "date-fns";
import { VALIDATION_PATTERNS } from "./clientConstants";

export const getDateString = (date, short = true) => {
  const validDate = date instanceof Date ? date : new Date(date);
  if (isNaN(validDate)) {
    throw new Error("Invalid date");
  }
  const options = short
    ? { month: "short", day: "numeric" }
    : { month: "long", day: "numeric", year: "numeric" };
  return validDate.toLocaleDateString("en-US", options);
};

export const parseAndValidateDate = (date) => {
  const parsedDate = date instanceof Date ? date : new Date(date);

  if (!isNaN(parsedDate)) {
    return parsedDate.toISOString().split("T")[0]; // ISO format (YYYY-MM-DD)
  }

  const dateRegex = VALIDATION_PATTERNS.DATE;

  const match = date.match(dateRegex);
  if (match && match.groups) {
    const { month, day, year } = match.groups;

    const monthIndex = new Date(Date.parse(month + " 1")).getMonth();
    const currentYear = new Date().getFullYear(); // Fallback to the current year if year is not provided

    const formattedDate = new Date(
      year || currentYear, // fallback to current year if not provided
      monthIndex,
      day
    );

    if (!isNaN(formattedDate)) {
      return formattedDate.toISOString().split("T")[0];
    }
  }

  console.error("Invalid date:", date);
  return "Invalid Date";
};

export const formatTime = (timeString) => {
  const date = parse(timeString, "HH:mm:ss", new Date());
  return format(date, "h:mm a");
};

export const calculateAge = (dob) => {
  const today = new Date();
  const birthDate = new Date(dob);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  const dayDiff = today.getDate() - birthDate.getDate();

  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
  }

  return age;
};

// export const parseAndValidateDate = (dob) => {
//   dob = dob.trim();

//   if (!/^\d{1,2}[\/-]\d{1,2}[\/-]\d{4}$/.test(dob)) {
//     console.log("Invalid date format:", dob);
//     return null;
//   }

//   const [day, month, year] = dob.includes("/")
//     ? dob.split("/")
//     : dob.split("-");

//   if (isNaN(day) || isNaN(month) || isNaN(year)) {
//     console.log("Invalid date components:", day, month, year);
//     return null;
//   }

//   const date = new Date(year, month - 1, day);

//   if (
//     date.getDate() !== parseInt(day, 10) ||
//     date.getMonth() !== parseInt(month, 10) - 1 ||
//     date.getFullYear() !== parseInt(year, 10)
//   ) {
//     console.log("Invalid date after parsing:", date);
//     return null;
//   }

//   console.log("Valid date:", date);
//   return date;
// };

export const isAdult = (dob) => {
  return calculateAge(dob) >= 18;
};

export const isChild = (dob) => {
  return calculateAge(dob) < 18;
};
