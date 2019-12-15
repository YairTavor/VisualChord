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
      <font-awesome-icon
        icon="music"
        size="6x"
        class="composer__music-icon"
      ></font-awesome-icon>
      <p class="composer__empty-chords-description">
        To get started, click the
        <span class="composer__add-chord--inline" @click="addChord()">
          <font-awesome-icon icon="plus" />
        </span>
        button to create a new chord.
      </p>
    </div>
    <div v-else>
      <div class="composer__chords-container">
        <div class="composer__trash">
          <div class="composer__trash-icon-container">
            <font-awesome-icon icon="trash" class="composer__trash-icon" />
          </div>
          <div class="composer__clear-all">
            <button class="composer__clear-all-button" @click="clarAll">
              Clear All
            </button>
          </div>
          <draggable
            :list="trash"
            group="composer"
            class="composer__trash-drop"
            @change="onSelect({})"
          ></draggable>
        </div>

        <draggable :list="chords" group="composer" class="composer__chords">
          <div v-for="(chord, index) in chords" :key="chord.name + index">
            <div
              @mousedown="onSelect(chord, index)"
              :class="
                selectedChord === chord
                  ? 'composer__chord--current'
                  : 'composer__chord'
              "
            >
              {{ chord.name }}
            </div>
            <div class="composer__chord-bars">
              <select class="composer__chord-bars-input" v-model="chord.bars">
                <option value="1">1 </option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
                <option value="13">13</option>
                <option value="14">14</option>
                <option value="15">15</option>
                <option value="16">16</option>
              </select>
              Bar/s
            </div>
          </div>
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
    onSelect(chord, index) {
      this.$emit("onChordSelected", { chord, index });
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
        const chord = Chord.parse(event.target.value);
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
