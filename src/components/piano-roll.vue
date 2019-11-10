<template>
  <div>
    <h2>Piano Roll</h2>
    <p>This will show you which notes to play for the selected Composer chrod</p>
    <p v-if="!currentChord.root">To get starded, pick or create a chord in the Composer</p>
    <div v-else class="piano-roll__keyboard">
      <div class="piano-roll__note-list">
        <div v-for="note in notes" :key="note" class="piano-roll__note">{{note}}</div>
      </div>
      <div class="piano-roll__sharp-list">
        <div
          v-for="(sharp, index) in sharps"
          :key="sharp+index"
          :class="`piano-roll__sharp${sharp === 'SPACE' ? '--space' : ''}`"
        >{{sharp === 'SPACE' ? '' : sharp}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { notes, sharps } from "../lib/notes";
import "./piano-roll.scss";
export default {
  props: {
    currentChord: { tyep: Object, default: () => ({}) }
  },
  data() {
    return { notes, sharps };
  }
};
</script>