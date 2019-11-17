export const roots = {
  A: { sign: "A", alternate: null },
  ASharp: { sign: "A♯", alternate: "B♭" },
  B: { sign: "B", alternate: null },
  C: { sign: "C", alternate: null },
  CSharp: { sign: "C♯", alternate: "D♭" },
  D: { sign: "D", alternate: null },
  DSharp: { sign: "D♯", alternate: "E♭" },
  E: { sign: "E", alternate: null },
  F: { sign: "F", alternate: null },
  FSharp: { sign: "F♯", alternate: "G♭" },
  G: { sign: "G", alternate: null },
  GSharp: { sign: "G♯", alternate: "A♭" }
};

export const qualities = {
  MAJOR: {
    sign: "",
    displayName: "Major"
  },
  MINOR: {
    sign: "m",
    displayName: "Minor"
  },
  DIMINISHED: {
    sign: "dim",
    displayName: "Diminished"
  },
  AUGMENTED: {
    sign: "aug",
    displayName: "Augmented"
  },
  SUSPENDED2: {
    sign: "sus2",
    displayName: "Suspended 2"
  },
  SUSPENDED4: {
    sign: "sus4",
    displayName: "Suspended 4"
  },
  FIFTH: {
    sign: "5",
    displayName: "5"
  }
};

// added notes
export const extensions = {
  NONE: {
    sign: "",
    displayName: "None"
  },
  SIX: {
    sign: "6",
    displayName: "6"
  },
  SEVEN: {
    sign: "7",
    displayName: "7"
  },
  MAJOR7: {
    sign: "maj7",
    displayName: "Major 7"
  },
  ADD9: {
    sign: "(9)",
    displayName: "Add 9"
  },
  NINE: {
    sign: "9",
    displayName: "9"
  },
  ELEVEN: {
    sign: "11",
    displayName: "11"
  },
  THIRTEEN: {
    sign: "13",
    displayName: "13"
  }
};

export const majorMinor = {
  minor: 0,
  major: 1,
  diminished: 2
};

export const majorMinorQuality = {
  flat: -1,
  perfect: 0,
  sharp: 1
};

export const step = {
  half: 1,
  whole: 2
};

const { whole, half } = step;
const { major, minor, diminished } = majorMinor;
const { perfect, sharp, flat } = majorMinorQuality;
export const scales = {
  major: {
    name: "Major",
    formula: [whole, whole, half, whole, whole, whole, half],
    majorMinor: [major, minor, minor, major, major, minor, diminished],
    majorMinorQuality: [
      perfect,
      perfect,
      perfect,
      perfect,
      perfect,
      perfect,
      perfect
    ]
  },
  dorian: {
    name: "Dorian",
    formula: [whole, half, whole, whole, whole, half, whole],
    majorMinor: [minor, minor, major, major, minor, diminished, major],
    majorMinorQuality: [perfect, perfect, flat, perfect, perfect, perfect, flat]
  },
  phrygian: {
    name: "Phrygian",
    formula: [half, whole, whole, whole, half, whole, whole],
    majorMinor: [minor, major, major, minor, diminished, major, minor],
    majorMinorQuality: [perfect, flat, flat, perfect, perfect, flat, flat]
  },
  lydian: {
    name: "Lydian",
    formula: [whole, whole, whole, half, whole, whole, half],
    majorMinor: [major, major, minor, diminished, major, minor, minor],
    majorMinorQuality: [
      perfect,
      perfect,
      perfect,
      sharp,
      perfect,
      perfect,
      perfect
    ]
  },
  mixolydian: {
    name: "Mixolydian",
    formula: [whole, whole, half, whole, whole, half, whole],
    majorMinor: [major, minor, diminished, major, minor, minor, major],
    majorMinorQuality: [
      perfect,
      perfect,
      perfect,
      perfect,
      perfect,
      perfect,
      flat
    ]
  },
  minor: {
    name: "Minor",
    formula: [whole, half, whole, whole, half, whole, whole],
    majorMinor: [minor, diminished, major, minor, minor, major, major],
    majorMinorQuality: [perfect, perfect, flat, perfect, perfect, flat, flat]
  },
  locrian: {
    name: "Locrian",
    formula: [half, whole, whole, half, whole, whole, whole],
    majorMinor: [diminished, major, minor, minor, major, major, minor],
    majorMinorQuality: [perfect, flat, flat, perfect, flat, flat, flat]
  }
};
