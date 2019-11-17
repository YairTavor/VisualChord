<template>
  <div>
    <h2>Piano Roll</h2>
    <p>This will show you which notes to play for the selected Composer chrod</p>
    <p v-if="!currentChord.root">To get starded, pick or create a chord in the Composer</p>
    <div v-else class="piano-roll__keyboard">
      <div class="piano-roll__note-list">
        <div v-for="note in notes" :key="note" :class="getNoteClass(note)">{{note}}</div>
      </div>
      <div class="piano-roll__sharp-list">
        <div
          v-for="(sharp, index) in sharps"
          :key="sharp+index"
          :class="getNoteClass(sharp)"
        >{{sharp === 'SPACE' ? '' : sharp}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { notes, sharps, octaveNotes } from "../lib/notes";
import "./piano-roll.scss";
export default {
  props: {
    currentChord: { tyep: Object, default: () => ({}) }
  },
  data() {
    return { notes, sharps };
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
      }
      return result;
    },
    getNoteClass(note) {
      let result = "";
      const isSharp = note.indexOf("#") > -1;
      const isSpace = note === "SPACE";
      const isSelected = !isSpace && this.getNotesInChord().includes(note);

      if (isSpace) {
        result = "piano-roll__sharp--space";
      } else if (!isSharp) {
        result = "piano-roll__note";
      } else {
        result = "piano-roll__sharp";
      }
      if (isSelected) {
        result += "--selected";
      }
      return result;
    }
  }
};
</script>