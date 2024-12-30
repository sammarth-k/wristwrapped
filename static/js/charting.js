// function to generate charts
function charts(data) {
  // make div visible
  document.getElementById("charts").style.visibility = "visible";

  // get unique exercises
  const exercises = [...new Set(data.map((d) => d.exerciseName))];

  // create dropdown
  const dropdown = document.getElementById("dropdown-select");
  dropdown.innerHTML = '<option value="0">Select a chart</option>';
  exercises.forEach((exercise) => {
    const option = document.createElement("option");
    option.text = exercise;
    option.value = exercise;
    dropdown.add(option);
  });

  // declare global variable for chart
  window.myChart = null;

  // default chart
  document.getElementById("dropdown-select").value = exercises[0];
  const defaultExercise = exercises[0];
  const defaultData = data.filter((d) => d.exerciseName === defaultExercise);
  const defaultDates = defaultData.map((d) => d.date);
  const defaultOneRMs = defaultData.map((d) => oneRepMax(d.weight, d.reps));
  const defaultOneRMsMax = defaultDates.reduce((acc, date, i) => {
    acc[date] = Math.max(acc[date] || 0, defaultOneRMs[i]);
    return acc;
  }, {});
  const defaultChartData = {
    labels: Object.keys(defaultOneRMsMax),
    datasets: [
      {
        label: defaultExercise,
        data: Object.values(defaultOneRMsMax),
        backgroundColor: "rgba(242, 136, 138, 0.2)",
        borderColor: "rgba(242, 136, 138, 1)",
        borderWidth: 1,
      },
    ],
  };
  const defaultCtx = document.getElementById("myChart").getContext("2d");
  window.myChart = new Chart(defaultCtx, {
    type: "line",
    data: defaultChartData,
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });

  // display the chart
  document.getElementById("charts").style.display = "block";

  // listen for change
  dropdown.addEventListener("change", function () {
    const selectedExercise = dropdown.value;
    if (selectedExercise === "0") return;

    // destroy previous chart if exists
    if (window.myChart) window.myChart.destroy();

    const exerciseData = data.filter(
      (d) => d.exerciseName === selectedExercise
    );

    // get dates and 1RM
    const dates = exerciseData.map((d) => d.date);
    const oneRMs = exerciseData.map((d) => oneRepMax(d.weight, d.reps));

    // select max for each date
    const oneRMsMax = dates.reduce((acc, date, i) => {
      acc[date] = Math.max(acc[date] || 0, oneRMs[i]);
      return acc;
    }, {});

    // get chart data
    const chartData = {
      labels: Object.keys(oneRMsMax),
      datasets: [
        {
          label: selectedExercise,
          data: Object.values(oneRMsMax),
          backgroundColor: "rgba(242, 136, 138, 0.2)",
          borderColor: "rgba(242, 136, 138, 1)",
          borderWidth: 1,
        },
      ],
    };

    // create chart
    const ctx = document.getElementById("myChart").getContext("2d");
    window.myChart = new Chart(ctx, {
      type: "line",
      data: chartData,
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  });
}
