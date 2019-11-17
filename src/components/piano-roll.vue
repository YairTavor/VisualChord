<template>
  <div class="piano-roll__keyboard">
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
</template>

<script>
import { notes, sharps, octaveNotes } from "../lib/notes";
import "./piano-roll.scss";
export default {
  props: {
    selectedNotes: { type: Array, default: () => [] }
  },
  data() {
    return { notes, sharps };
  },
  methods: {
    getNoteClass(note) {
      let result = "";
      const isSharp = note.indexOf("#") > -1;
      const isSpace = note === "SPACE";
      const isSelected = !isSpace && this.selectedNotes.includes(note);

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