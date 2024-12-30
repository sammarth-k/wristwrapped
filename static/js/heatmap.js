// function to generate heatmap on body parts worked
function heatmap(data) {
  var muscleVolume = {};
  // get muscle groups involved and percentages as form  { lats: 100 };

  // loop and add volume to each group
  for (let i = 0; i < data.length; i++) {
    const muscles = mapMuscleGroup(data[i].exerciseName);
    const volume = data[i].weight * data[i].reps;
    for (let muscle in muscles) {
      if (muscle in muscleVolume) {
        muscleVolume[muscle] += (volume * muscles[muscle]) / 100;
      } else {
        muscleVolume[muscle] = (volume * muscles[muscle]) / 100;
      }
    }
  }

  // sort
  var sortedMuscleVolume = Object.keys(muscleVolume).sort(function (a, b) {
    return muscleVolume[b] - muscleVolume[a];
  });

  // assign each muscle group an alpha level
  var alpha = 1;
  for (let i = 0; i < sortedMuscleVolume.length; i++) {
    const muscle = sortedMuscleVolume[i];
    const muscleElement = document.getElementById(muscle);
    if (muscleElement) {
      // path elements
      const paths = muscleElement.getElementsByTagName("path");
      for (let j = 0; j < paths.length; j++) {
        paths[j].style.fill = "rgba(242, 136, 138, " + alpha + ")";
      }
      alpha -= 1 / sortedMuscleVolume.length;
    }
  }

  // make heatmap visible
  document.getElementById("heatmap").style.display = "block";

  // now work on the igheatmap
  var igMuscleGroups = [
    "igquads",
    "igcalves",
    "igdelts",
    "igpecs",
    "igtris",
    "igbis",
    "igforearm",
    "igabs",
    "igback",
  ];

  // get volume for all
  var igMuscleVolume = {
    igquads: 0,
    igcalves: 0,
    igdelts: 0,
    igpecs: 0,
    igtris: 0,
    igbis: 0,
    igforearm: 0,
    igabs: 0,
    igback: 0,
  };

  // add volumes with exceptions from muscleVolume
  // quads = quads + hamstrings + glutes
  // back = upper_back + lats
  for (let muscle in muscleVolume) {
    if (muscle === "quads") {
      igMuscleVolume.igquads += muscleVolume[muscle];
    } else if (muscle === "hamstrings" || muscle === "glutes") {
      igMuscleVolume.igquads += muscleVolume[muscle];
    } else if (muscle === "upper_back" || muscle === "lats") {
      igMuscleVolume.igback += muscleVolume[muscle];
    } else {
      igMuscleVolume["ig" + muscle] = muscleVolume[muscle];
    }
  }
  // sort descending
  var sortedIgMuscleVolume = Object.keys(igMuscleVolume).sort(function (a, b) {
    return igMuscleVolume[b] - igMuscleVolume[a];
  });

  // assign each muscle group an alpha level
  var alpha = 1;
  for (let i = 0; i < sortedIgMuscleVolume.length; i++) {
    const muscle = sortedIgMuscleVolume[i];
    const muscleElement = document.getElementById(muscle);
    if (muscleElement) {
      // path elements
      const paths = muscleElement.getElementsByTagName("path");
      for (let j = 0; j < paths.length; j++) {
        paths[j].style.fill = "rgba(242, 136, 138, " + alpha + ")";
      }
      alpha -= 1 / sortedIgMuscleVolume.length;
    }
  }
}
