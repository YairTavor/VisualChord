<template>
  <div>
    <p>
      Overview of a key and scale. Shows how keys are built and allows you to
      copy chords to the Composer.
    </p>
    <div>
      <select class="key-view__dropdown" v-model="selectedRoot">
        <option v-for="key in Object.keys(roots)" :key="key" :value="roots[key]">
          {{ roots[key].sign }}
          {{ roots[key].alternate ? `(${roots[key].alternate})` : "" }}
        </option>
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
          v-for="chord in scaleChords"
          :key="chord"
          @click="onChordClick(chord)"
        >
          <span class="key-view__chord-name">{{ chord }}</span>
        </div>
      </div>
      <div class="key-view__subtitle">Scale chord formula:</div>
      <div class="key-view__chord-formula-list">
        <div
          class="key-view__chord-formula"
          v-for="step in scaleChordsFormula"
          :key="step"
        >{{ step }}</div>
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
import scale from "../lib/scale";
import { octaveNotes } from "../lib/notes";
import pianoRoll from "../components/piano-roll";
import Chord from "../lib/chord";
import "./key-view.scss";

export default {
  displayName: "Keys & Scales",
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
      return scale.scaleNotes(this.selectedRoot, this.selectedScale);
    },
    scaleNotesFormula() {
      return scale.scaleNotesFormula(this.selectedScale);
    },
    scaleChordsFormula() {
      return scale.scaleChordsFormula(this.selectedScale);
    },
    scaleChords() {
      return scale.scaleChords(this.selectedRoot, this.selectedScale);
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
