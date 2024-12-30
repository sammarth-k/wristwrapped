// function to extract relevant data from file
function extractData(lines) {
  const data = [];
  for (let i = 0; i < lines.length; i++) {
    const columns = lines[i].split(",");
    if (columns.length === correctHeaders.length) {
      // check for current year from datetime 2023-05-24 19:46:09
      if (columns[0].slice(0, 4) !== currentYear.toString()) {
        continue;
      }

      // read columns "Date", "Exercise Name", "Weight", "Reps" only
      const date = columns[0].slice(0, 10);
      const exerciseName = columns[3].slice(1, -1).toLowerCase();
      const weight = parseInt(columns[5]);
      const reps = parseInt(columns[6]);
      const oneRM = oneRepMax(weight, reps);
      data.push({ date, exerciseName, weight, reps });
    }
  }
  return data;
}
