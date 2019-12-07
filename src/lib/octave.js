import { octaveNotes } from "./notes";

const getNotesInChord = chord => {
  let result = [];
  if (chord.notes) {
    result = chord.notes.map((chordNote, index) => {
      let resultOctave = "4";

      if (index > 0) {
        const root = chord.notes[0];
        const startFromRoot = octaveNotes.indexOf(root);
        const noteIndex = octaveNotes.indexOf(chordNote, startFromRoot);
        if (noteIndex >= 12) {
          resultOctave = "5";
        }
      }

      return chordNote + resultOctave;
    });

    if (chord.bass) {
      result.push(chord.bass.sign + "3");
    }
  }
  return result;
};

export default getNotesInChord;
