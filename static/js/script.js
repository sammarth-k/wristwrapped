// function to find the most frequent exercise
function mostFrequentExercise(data) {
  const exerciseCount = {};
  for (let i = 0; i < data.length; i++) {
    const exerciseName = data[i].exerciseName;
    if (exerciseName in exerciseCount) {
      exerciseCount[exerciseName]++;
    } else {
      exerciseCount[exerciseName] = 1;
    }
  }
  let maxCount = 0;
  let mostFrequentExercise = "";
  for (let exercise in exerciseCount) {
    if (exerciseCount[exercise] > maxCount) {
      maxCount = exerciseCount[exercise];
      mostFrequentExercise = exercise;
    }
  }
  document.getElementById("most-freq-ex").innerHTML =
    "<b>Favorite Exercise:</b> " + mostFrequentExercise;
}

// function to get total minutes spent
function totalMinutes(lines) {
  let totalMinutes = 0;
  var currDate = "";
  let totalDays = 0;
  for (let i = 0; i < lines.length; i++) {
    // check if same date
    const columns = lines[i].split(",");
    const date = columns[0].split(" ")[0];
    if (date !== currDate) {
      currDate = date;
      totalDays++;
      if (
        columns.length != correctHeaders.length ||
        columns[2] == "" ||
        date.slice(0, 4) !== currentYear.toString()
      ) {
        continue;
      }
      const duration = columns[2].split(" ");

      if (duration.length === 1) {
        const minutes = parseInt(duration[0].slice(0, -1));
        totalMinutes += minutes;
      } else if (duration.length === 2) {
        const hours = parseInt(duration[0].slice(0, -1));
        const minutes = parseInt(duration[1].slice(0, -1));
        totalMinutes += hours * 60 + minutes;
      }
    }
  }
  document.getElementById("total-minutes").innerHTML =
    "<b>Minutes in the Lab:</b> " + totalMinutes;
  document.getElementById("igminutes").innerHTML = totalMinutes; //update in shareable
  document.getElementById("total-sessions").innerHTML =
    "<b>Logged Sessions:</b> " + totalDays;
  document.getElementById("igsessions").innerHTML = totalDays; //update in shareable
}

// function to get 1RM for 3 main lifts
function bestLift(data) {
  const benchPress = data.filter((d) => d.exerciseName.startsWith("bench"));
  const squat = data.filter((d) => d.exerciseName.startsWith("squat"));
  var deadlift = data.filter((d) => d.exerciseName.startsWith("deadlift"));

  // get 1RM for each
  let benchPressMax = 0;
  let squatMax = 0;
  let deadliftMax = 0;

  for (let i = 0; i < benchPress.length; i++) {
    const oneRM = oneRepMax(benchPress[i].weight, benchPress[i].reps);
    if (oneRM > benchPressMax) {
      benchPressMax = oneRM;
    }
  }

  for (let i = 0; i < squat.length; i++) {
    const oneRM = oneRepMax(squat[i].weight, squat[i].reps);
    if (oneRM > squatMax) {
      squatMax = oneRM;
    }
  }

  // replace deadlift with pullup if it doenst exist
  if (deadlift.length === 0) {
    deadlift = data.filter((d) => d.exerciseName.includes("pull up"));
    for (let i = 0; i < deadlift.length; i++) {
      const oneRM = oneRepMax(deadlift[i].weight, deadlift[i].reps);
      if (oneRM > deadliftMax) {
        deadliftMax = oneRM;
      }
    }
    document.getElementById("best-deadlift").innerHTML =
      "<b>Pullup 1RM:</b> " + parseInt(deadliftMax) + " lbs";
    document.getElementById("igdeadlift").innerHTML =
      parseInt(deadliftMax) + "lbs"; //update in shareable
    document.getElementById("igdlcaption").innerHTML = "Pullup"; //update in shareable
  } else {
    for (let i = 0; i < deadlift.length; i++) {
      const oneRM = oneRepMax(deadlift[i].weight, deadlift[i].reps);
      if (oneRM > deadliftMax) {
        deadliftMax = oneRM;
      }
    }
    document.getElementById("best-deadlift").innerHTML =
      "<b>Deadlift 1RM:</b> " + parseInt(deadliftMax) + " lbs";
    document.getElementById("igdeadlift").innerHTML =
      parseInt(deadliftMax) + "lbs"; //update in shareable
  }

  // display
  document.getElementById("best-bench").innerHTML =
    "<b>Bench Press 1RM:</b> " + parseInt(benchPressMax) + " lbs";
  document.getElementById("igbench").innerHTML =
    parseInt(benchPressMax) + "lbs"; //update in shareable
  document.getElementById("best-squat").innerHTML =
    "<b>Squat 1RM:</b> " + parseInt(squatMax) + " lbs";
  document.getElementById("igsquat").innerHTML = parseInt(squatMax) + "lbs"; //update in shareable
}
// function to get consistency
function consistency(data) {
  // for each date in data, replace date with day of the year
  for (let i = 0; i < data.length; i++) {
    const date = data[i].date;
    const day = getDayOfYear(new Date(date));
    data[i].date = day;
  }

  const consistencyChart = document.getElementById("consistency");
  const igConsistencyChart = document.getElementById("igconsistency");
  const igRectangles = igConsistencyChart.getElementsByTagName("g");
  for (let i = 0; i < 367; i++) {
    // if there is an exercise on a day, fill the rectangle
    if (data.some((d) => d.date === i)) {
      document.getElementById(i).style.fill = "rgba(242, 136, 138, 1)";
      if (igRectangles[i-1]) {
        const igPaths = igRectangles[i-1].getElementsByTagName("path");
        for (let j = 0; j < igPaths.length; j++) {
          igPaths[j].style.fill = "rgba(242, 136, 138, 1)";
        }
      }
    }
  }
}

document
  .getElementById("strongdata")
  .addEventListener("change", function (event) {
    const file = event.target.files[0]; // Get the selected file
    if (file) {
      const reader = new FileReader();
      reader.readAsText(file);

      reader.onload = function (e) {
        const lines = e.target.result.split("\n");

        if (!checkHeaders(lines[0].split(","))) {
          alert("Incorrect headers");
          return;
        }
        lines.shift(); // remove headers

        totalMinutes(lines); // get total minutes spent
        const data = extractData(lines);

        document.getElementById("summarycontent").style.display = "block";
        document.getElementById("summary").innerHTML =
          "<h1><font style='color:#4b4b4b;'>WristWrapped</font> <font style='color:rgba(242, 136, 138, 1);'>" +
          currentYear +
          "</font></h1>";
        document.getElementById("wrapped_year").innerHTML = currentYear;

        mostFrequentExercise(data);
        bestLift(data);
        consistency(data);
        heatmap(data);
        charts(data);
      };
    } else {
      alert("No file selected");
    }

    document.getElementById("inputcontent").style.display = "none";
    document.getElementById("inputs").style.animation = "wipe 1s";
    document.getElementById("inputs").style.height = "0px";
  });
