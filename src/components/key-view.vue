<template>
  <div>
    <p>key view shows the Available chords and notes in a key.</p>
    <div>
      <select class="key-view__dropdown" v-model="selectedRoot">
        <option
          v-for="key in Object.keys(roots)"
          :key="key"
          :value="roots[key]"
        >{{ roots[key].sign }} {{roots[key].alternate ? `(${roots[key].alternate})` : ''}}</option>
      </select>
      <select class="key-view__dropdown" v-model="selectedScale">
        <option
          v-for="key in Object.keys(scales)"
          :key="key"
          :value="scales[key]"
        >{{ scales[key].name }}</option>
      </select>
    </div>

    <div v-if="selectedScale && selectedRoot">
      <div class="key-view__subtitle">Scale chords:</div>
      <div class="key-view__chord-list">
        <div
          class="key-view__chord"
          v-for="(chord) in scaleChords"
          :key="chord"
          @click="onChordClick(chord)"
        >
          <span class="key-view__chord-name">{{chord}}</span>
        </div>
      </div>
      <div class="key-view__subtitle">Scale chord formula:</div>
      <div class="key-view__chord-formula-list">
        <div class="key-view__chord-formula" v-for="step in scaleChordsFormula" :key="step">{{step}}</div>
      </div>
      <div class="key-view__subtitle">Scale notes:</div>
      <piano-roll :selectedNotes="scaleNotes"></piano-roll>
      <div class="key-view__subtitle">Scale notes forumla:</div>
      <div>{{ scaleNotesFormula }}</div>
    </div>
  </div>
</template>

<script>
import {
  roots,
  scales,
  step,
  majorMinorQuality,
  majorMinor,
  notations
} from "../lib/enums";
import { octaveNotes } from "../lib/notes";
import pianoRoll from "./piano-roll";
import Chord from "../lib/chord";
import "./key-view.scss";

const chordFormulaSigns = ["i", "ii", "iii", "iv", "v", "vi", "vii"];

export default {
  props: ["chords"],
  data() {
    return {
      roots,
      scales,
      selectedRoot: roots.C,
      selectedScale: scales.major
    };
  },
  computed: {
    scaleNotes() {
      let notes = [];
      if (this.selectedRoot && this.selectedScale) {
        const rootIndex = octaveNotes.indexOf(this.selectedRoot.sign);
        let index = rootIndex;
        let octave = "4";
        notes.push(octaveNotes[rootIndex] + octave);
        this.selectedScale.formula.forEach(step => {
          index = index + step;
          if (index > 11) {
            octave = "5";
          }
          notes.push(octaveNotes[index] + octave);
        });
      }
      return notes;
    },
    scaleNotesFormula() {
      return (
        "Root > " +
        this.selectedScale.formula
          .map(step => (step === 1 ? "half step" : "whole step"))
          .join(" > ")
      );
    },
    scaleChordsFormula() {
      const result = [];
      this.selectedScale.majorMinor.forEach((item, index) => {
        const quality = this.selectedScale.majorMinorQuality[index];
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
    scaleChords() {
      const notes = this.scaleNotes;
      const result = [];

      this.selectedScale.majorMinor.forEach((item, index) => {
        let note = notes[index];
        note = note.substring(0, note.length - 1);
        const quality = this.selectedScale.majorMinorQuality[index];

        if (quality === majorMinorQuality.flat) {
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
        }

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
  },
  methods: {
    onChordClick(chord) {
      const chordInstance = Chord.parse(chord);
      this.chords.push(chordInstance);
    }
  },
  components: {
    "piano-roll": pianoRoll,
    module
  }
};
</script>