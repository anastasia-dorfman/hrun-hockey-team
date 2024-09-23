export const calculateAge = (dob) => {
  const ageDiff = Date.now() - new Date(dob).getTime();
  const ageDate = new Date(ageDiff);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

export const parseAndValidateDate = (dob) => {
  if (dob instanceof Date && !isNaN(dob.getTime())) {
    return dob;
  }

  let date;

  if (dob.includes("/") || dob.includes("-")) {
    const [part1, part2, part3] = dob.includes("/")
      ? dob.split("/")
      : dob.split("-");

    if (part1.length === 4) {
      // yyyy-mm-dd or yyyy-mmm-dd
      const year = part1;
      const month = isNaN(part2)
        ? new Date(`${part2} 1`).getMonth()
        : part2 - 1;
      const day = part3;
      date = new Date(year, month, day);
    } else {
      // DD/MM/YYYY or DD-MM-YYYY
      const day = part1;
      const month = part2 - 1;
      const year = part3;
      date = new Date(year, month, day);
    }
  }

  console.log("dob:", dob);
  console.log("date:", date);

  if (isNaN(date.getTime())) {
    console.error("Invalid date:", date);
    throw new Error(
      "Invalid date format. Please use DD/MM/YYYY, DD-MM-YYYY, YYYY-MM-DD, or YYYY-MMM-DD.\n"
    );
  }

  return date;
};

export const isAdult = (dob) => {
  return calculateAge(dob) >= 18;
};

export const isChild = (dob) => {
  return calculateAge(dob) < 18;
};
