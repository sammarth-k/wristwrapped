// function to map exercise name to muscle group
function mapMuscleGroup(exerciseName) {
  exerciseName = exerciseName.toLowerCase();

  const exerciseMap = {
    "pull up": { lats: 60, upper_back: 30, bis: 10 },
    "seated wide-grip row (cable)": { lats: 50, upper_back: 50 },
    "lat pulldown (single arm)": { lats: 100 },
    "preacher curl (barbell)": { biceps: 100 },
    "reverse curl (barbell)": { forearm: 100 },
    "face pull (cable)": { delts: 70, upper_back: 30 },
    "hammer curl (cable)": { biceps: 70, forearm: 30 },
    "seated row (machine)": { lats: 50, upper_back: 50 },
    "bench press (barbell)": { pecs: 80, delts: 10, tris: 10 },
    "incline bench press (dumbbell)": { pecs: 70, delts: 20, tris: 10 },
    "skullcrusher (barbell)": { tris: 100 },
    "chest fly (band)": { pecs: 100 },
    "lateral raise (cable)": { delts: 100 },
    "triceps pushdown (cable - straight bar)": { tris: 100 },
    "bench press (dumbbell)": { pecs: 100 },
    "squat (barbell)": { quads: 50, glutes: 30, hamstrings: 20 },
    "seated leg curl (machine)": { hamstrings: 100 },
    "standing calf raise (machine)": { calves: 100 },
    "hanging leg raise": { abs: 100 },
    "standing calf raise (barbell)": { calves: 100 },
    "leg extension (machine)": { quads: 100 },
    "seated overhead press (dumbbell)": { delts: 80, tris: 20 },
    "quarter squat": { quads: 60, glutes: 30, hamstrings: 10 },
    "arnold press (dumbbell)": { delts: 70, tris: 30 },
    "triceps extension (cable)": { tris: 100 },
    "triceps extension": { tris: 100 },
    "strict military press (barbell)": { delts: 80, tris: 20 },
    "decline chest fly cable": { pecs: 100 },
    "overhead press (barbell)": { delts: 80, tris: 20 },
    "bench press - close grip (barbell)": { pecs: 60, tris: 20, delts: 20 },
    "bicep curl (barbell)": { biceps: 100 },
    "single arm lat pulldown (cable)": { lats: 100 },
    "hanging knee raise": { abs: 100 },
    "glute ham raise": { glutes: 50, hamstrings: 50 },
    "reverse grip pulldown": { lats: 70, upper_back: 20, bis: 10 },
    "chest dip": { pecs: 50, tris: 50 },
    "lat pulldown (cable)": { lats: 70, upper_back: 20, bis: 10 },
    "bicep curl (dumbbell)": { biceps: 100 },
    "hanging twists — obliques": { obliques: 100 },
    "bent over row (barbell)": { lats: 60, upper_back: 40 },
    "romanian deadlift (barbell)": {
      hamstrings: 50,
      glutes: 40,
      lower_back: 10,
    },
  };

  for (const key in exerciseMap) {
    if (exerciseName.includes(key)) {
      return exerciseMap[key];
    }
  }

  return {}; // Return an empty object if no match is found
}
