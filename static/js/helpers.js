const correctHeaders = [
  "Date",
  "Workout Name",
  "Duration",
  "Exercise Name",
  "Set Order",
  "Weight",
  "Reps",
  "Distance",
  "Seconds",
  "Notes",
  "Workout Notes",
  "RPE",
];

const currentYear = 2024 //new Date().getFullYear();

// boolean function to check if headers are correct
function checkHeaders(headers) {
  if (headers.length !== correctHeaders.length) {
    return false;
  }
  for (let i = 0; i < headers.length; i++) {
    if (headers[i] !== correctHeaders[i]) {
      return false;
    }
  }
  return true;
}

// function to convert weights and reps to 1RM
function oneRepMax(weight, reps) {
  return weight * (1 + reps / 30); // Epley formula
}
// function to get the day of the year, mapped to 1-366 or 1-365
function getDayOfYear(date) {
  const start = new Date(date.getFullYear(), 0, 1);
  const diff = date - start + (start.getTimezoneOffset() - date.getTimezoneOffset()) * 60 * 1000;
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.ceil(diff / oneDay) + 1;
}
