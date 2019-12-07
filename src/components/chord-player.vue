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

export default {
  props: ["chords", "currentChord"],
  methods: {
    play() {
      getSample("g4").then(sample => sample.play());
    }
  }
};
</script>
