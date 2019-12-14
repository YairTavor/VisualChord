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
    <draggable
      v-if="!list.length"
      :class="dropClass"
      :list="list"
      group="components"
    >
      <div class="workplace__empty">
        <font-awesome-icon icon="box-open"></font-awesome-icon>&nbsp;Modules
      </div>
    </draggable>
    <draggable
      v-else
      class="workspace__list-group"
      :list="list"
      group="components"
    >
      <module
        class="workspace__module"
        v-for="(element, index) in list"
        :key="element.name"
        :title="element.displayName"
        @onModuleClose="onClose(index)"
      >
        <div
          :is="element.name"
          :chords="chords"
          :currentChord="currentChord"
          :setChords="setChords"
          :next="next"
        ></div>
      </module>
    </draggable>
  </section>
</template>

<script>
import draggable from "vuedraggable";
import composer from "./composer";
import module from "./module";
import modulesMap from "../modules-map";

import "./workspace.scss";

export default {
  props: ["list"],
  data() {
    return {
      chords: [],
      currentChord: {},
      currentChordIndex: -1,
      dropClass: "workspace__list-group--empty"
    };
  },
  methods: {
    onChordSelected({ chord, index }) {
      this.currentChord = chord;
      this.currentChordIndex = index;
    },
    onChordChanged() {},
    onChordAdded(chord) {
      this.chords.push(chord);
      this.currentChord = chord;
    },
    onClearAll() {
      this.chords = [];
      this.currentChord = {};
      this.currentChordIndex = -1;
    },
    setChords({ chords, currentChord }) {
      if (chords && Array.isArray(chords)) {
        this.chords = [...chords];
      }
      if (currentChord) {
        this.currentChord = currentChord;
        this.currentChordIndex = chords.indexOf(currentChord);
      } else if (this.chords.length) {
        this.currentChordIndex = 0;
        this.currentChord = this.chords[0];
      } else {
        this.currentChord = {};
        this.currentChordIndex = -1;
      }
    },
    onClose(index) {
      this.$emit("onModuleClose", index);
    },
    next() {
      if (this.chords.length) {
        let index = this.currentChordIndex + 1;
        if (index >= this.chords.length) {
          index = 0;
        }
        this.currentChord = this.chords[index];
        this.currentChordIndex = index;
      }
    }
  },
  components: {
    draggable,
    composer,
    module,
    ...modulesMap
  }
};
</script>
