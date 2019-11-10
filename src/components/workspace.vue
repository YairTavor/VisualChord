<template>
  <section class="workspace">
    <h3>Workspace</h3>
    <composer
      :chords="chords"
      :selectedChord="currentChord"
      @onChordSelected="onChordSelected"
      @onChordChanged="onChordChanged"
      @onChordAdded="onChordAdded"
      @onClearAll="onClearAll"
    ></composer>
    <draggable class="list-group" :list="list" group="components">
      <div class="list-group-item" v-for="(element) in list" :key="element.name" :is="element.name"></div>
    </draggable>
  </section>
</template>

<script>
import draggable from "vuedraggable";
import pianoRoll from "./piano-roll";
import keyView from "./key-view";
import composer from "./composer";

import "./workspace.scss";

export default {
  props: ["list"],
  data() {
    return {
      chords: [],
      currentChord: {}
    };
  },
  methods: {
    onChordSelected(chord) {
      this.currentChord = chord;
    },
    onChordChanged() {},
    onChordAdded(chord) {
      this.chords.push(chord);
      this.currentChord = chord;
    },
    onClearAll() {
      this.chords = [];
    }
  },
  components: {
    draggable,
    composer,
    "piano-roll": pianoRoll,
    "key-view": keyView
  }
};
</script>