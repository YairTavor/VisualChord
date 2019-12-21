import {
  roots,
  scales,
  majorMinorQuality,
  majorMinor,
  notations
} from "./enums";
import { octaveNotes } from "../lib/notes";

const chordFormulaSigns = ["i", "ii", "iii", "iv", "v", "vi", "vii"];

export default {
  scaleNotes(root = roots.C, scale = scales.major) {
    let notes = [];
    if (root && scale) {
      const rootIndex = octaveNotes.indexOf(root.sign);
      let index = rootIndex;
      let octave = "4";
      notes.push(octaveNotes[rootIndex] + octave);
      scale.formula.forEach(step => {
        index = index + step;
        if (index > 11) {
          octave = "5";
        }
        notes.push(octaveNotes[index] + octave);
      });
    }
    return notes;
  },
  scaleNotesFormula(scale = scales.major) {
    if (!scale || !scale.majorMinor) {
      return result;
    }
    return (
      "Root > " +
      scale.formula
        .map(step => (step === 1 ? "half step" : "whole step"))
        .join(" > ")
    );
  },
  scaleChordsFormula(scale = scales.major) {
    const result = [];
    if (!scale || !scale.majorMinor) {
      return result;
    }
    scale.majorMinor.forEach((item, index) => {
      const quality = scale.majorMinorQuality[index];
      let sign = chordFormulaSigns[index];
      if (item === majorMinor.major) {
        sign = sign.toUpperCase();
      }
      if (item === majorMinor.diminished) {
        sign += notations.diminished;
      }
      if (quality === majorMinorQuality.flat) {
        sign += notations.flat;
      }
      if (quality === majorMinorQuality.sharp) {
        sign += notations.sharp;
      }
      result.push(sign);
    });
    return result;
  },
  scaleChords(root = roots.C, scale = scales.major) {
    const notes = this.scaleNotes(root, scale);
    const result = [];
    if (!scale || !scale.majorMinor) {
      return result;
    }
    scale.majorMinor.forEach((item, index) => {
      let note = notes[index];
      note = note.substring(0, note.length - 1);
      const quality = scale.majorMinorQuality[index];

      /* if (quality === majorMinorQuality.flat) {
            note = octaveNotes[octaveNotes.indexOf(note) - 1];
            if (!note) {
              note = "B";
            }
          }
          if (quality === majorMinorQuality.sharp) {
            note = octaveNotes[octaveNotes.indexOf(note) + 1];
            if (!note) {
              note = "C";
            }
          } */

      if (item === majorMinor.minor) {
        note += "m";
      }
      if (item === majorMinor.diminished) {
        note += "dim";
      }

      result.push(note);
    });

    return result;
  }
};
