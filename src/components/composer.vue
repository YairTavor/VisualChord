<template>
  <div class="composer">
    <header class="composer__header">
      <h2 class="composer__title">Composer</h2>
      <div class="composer__actions">
        <div class="composer__add-chord" @click="addChord()">
          <font-awesome-icon icon="plus" />
        </div>
        <div>
          <input
            class="composer__quick-add"
            type="text"
            placeholder="Quick Add"
            @keydown="handelQuickSave($event)"
          />
        </div>
      </div>
    </header>

    <div v-if="!chords.length" class="composer__chords-container--empty">
      <font-awesome-icon icon="music" size="6x" class="composer__music-icon"></font-awesome-icon>
      <p class="composer__empty-chords-description">
        To get started, click the
        <span class="composer__add-chord--inline" @click="addChord()">
          <font-awesome-icon icon="plus" />
        </span> button to create a new chord.
      </p>
    </div>
    <div v-else>
      <div class="composer__chords-container">
        <div class="composer__trash">
          <div class="composer__trash-icon-container">
            <font-awesome-icon icon="trash" class="composer__trash-icon" />
          </div>
          <div class="composer__clear-all">
            <button class="composer__clear-all-button" @click="clarAll">Clear All</button>
          </div>
          <draggable
            :list="trash"
            group="composer"
            class="composer__trash-drop"
            @change="onSelect({})"
          ></draggable>
        </div>

        <draggable :list="chords" group="composer" class="composer__chords">
          <div
            v-for="(chord, index) in chords"
            :key="chord.name + index"
            @mousedown="onSelect(chord)"
            :class="selectedChord=== chord ? 'composer__chord--current': 'composer__chord'"
          >{{chord.name}}</div>
        </draggable>
      </div>
      <chord-edit :currentChord="selectedChord"></chord-edit>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import Chord from "../lib/chord";
import chordEdit from "./chord-edit";
import "./composer.scss";

export default {
  props: ["chords", "selectedChord"],
  data() {
    return {
      trash: []
    };
  },
  methods: {
    onSelect(chord) {
      this.$emit("onChordSelected", chord);
    },
    addChord() {
      this.$emit("onChordAdded", new Chord());
    },
    clarAll() {
      this.$emit("onClearAll");
      this.trash = [];
    },
    handelQuickSave(event) {
      if (event.which === 13) {
        const chord = Chord.parse(event.target.value.toLowerCase());
        if (chord) {
          this.$emit("onChordAdded", chord);
        }
        event.target.value = "";
      }
    }
  },
  components: {
    draggable,
    "chord-edit": chordEdit
  }
};
</script>