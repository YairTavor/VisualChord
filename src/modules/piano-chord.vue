<template>
  <div>
    <p>
      This will show you which notes to play for the selected Composer chord
    </p>
    <p v-if="!currentChord.root">
      To get starded, pick or create a chord in the Composer
    </p>
    <piano-roll v-else :selectedNotes="getNotesInChord()"></piano-roll>
  </div>
</template>

<script>
import { roots } from "../lib/enums";
import octave from "../lib/octave";
import pianoRoll from "../components/piano-roll";

export default {
  displayName: "Chord Visualisation",
  props: {
    currentChord: { tyep: Object, default: () => ({}) }
  },
  methods: {
    getNotesInChord() {
      return octave(this.currentChord);
    }
  },
  components: {
    "piano-roll": pianoRoll,
    module
  }
};
</script>
