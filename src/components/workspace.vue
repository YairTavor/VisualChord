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
    <draggable v-if="!list.length" :class="dropClass" :list="list" group="components">
      <div class="workplace__empty">
        <font-awesome-icon icon="box-open"></font-awesome-icon>&nbsp;Modules
      </div>
    </draggable>
    <draggable v-else class="workspace__list-group" :list="list" group="components">
      <div
        class="list-group-item"
        v-for="(element) in list"
        :key="element.name"
        :is="element.name"
        :chords="chords"
        :currentChord="currentChord"
      ></div>
    </draggable>
  </section>
</template>

<script>
import draggable from "vuedraggable";
import pianoChord from "./piano-chord";
import keyView from "./key-view";
import composer from "./composer";

import "./workspace.scss";

export default {
  props: ["list"],
  data() {
    return {
      chords: [],
      currentChord: {},
      dropClass: "workspace__list-group--empty"
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
    "piano-chord": pianoChord,
    "key-view": keyView
  }
};
</script>