<template>
  <div>
    <div v-if="!currentChord.root && !chords.length">Empty State</div>
    <div v-else>
      <button @click="play">Play</button>
    </div>
  </div>
</template>

<script>
import { getSample } from "../lib/sampleLoader";
import octave from "../lib/octave";

export default {
  props: ["chords", "currentChord"],
  methods: {
    play() {
      const notes = octave(this.currentChord);
      Promise.all(notes.map(note => getSample(note))).then(samples =>
        samples.forEach(sample => sample.play())
      );
    }
  }
};
</script>
