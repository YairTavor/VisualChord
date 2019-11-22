<template>
  <div>
    <p>This will show you which notes to play for the selected Composer chord</p>
    <p v-if="!currentChord.root">To get starded, pick or create a chord in the Composer</p>
    <piano-roll v-else :selectedNotes="getNotesInChord()"></piano-roll>
  </div>
</template>

<script>
import { octaveNotes } from "../lib/notes";
import { roots } from "../lib/enums";
import pianoRoll from "./piano-roll";

export default {
  props: {
    currentChord: { tyep: Object, default: () => ({}) }
  },
  methods: {
    getNotesInChord() {
      let result = [];
      if (this.currentChord.notes) {
        result = this.currentChord.notes.map((chordNote, index) => {
          let resultOcatve = "4";

          if (index > 0) {
            const root = this.currentChord.notes[0];
            const startFromRoot = octaveNotes.indexOf(root);
            const noteIndex = octaveNotes.indexOf(chordNote, startFromRoot);
            if (noteIndex >= 12) {
              resultOcatve = "5";
            }
          }

          return chordNote + resultOcatve;
        });

        if (this.currentChord.bass) {
          result.push(this.currentChord.bass.sign + "3");
        }
      }
      return result;
    }
  },
  components: {
    "piano-roll": pianoRoll,
    module
  }
};
</script>