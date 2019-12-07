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
      <module
        class="workspace__module"
        v-for="(element, index) in list"
        :key="element.name"
        :title="element.displayName"
        @onModuleClose="onClose(index)"
      >
        <div :is="element.name" :chords="chords" :currentChord="currentChord"></div>
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
    },
    onClose(index) {
      this.$emit("onModuleClose", index);
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