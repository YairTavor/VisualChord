<template>
  <div>
    <h2>Key View</h2>
    <div>key view shows the Available chords and notes in a key.</div>
    <div>
      <select class="key-view__dropdown" v-model="selectedRoot">
        <option
          v-for="key in Object.keys(roots)"
          :key="key"
          :value="roots[key]"
        >{{ roots[key].sign }} {{roots[key].alternate ? `(${roots[key].alternate})` : ''}}</option>
      </select>
      <select class="key-view__dropdown" v-model="selectedScale">
        <option
          v-for="key in Object.keys(scales)"
          :key="key"
          :value="scales[key]"
        >{{ scales[key].name }}</option>
      </select>
    </div>

    <div v-if="selectedScale && selectedRoot">{{selectedScale.name}}</div>
  </div>
</template>

<script>
import {
  roots,
  scales,
  step,
  majorMinorQuality,
  majorMinor
} from "../lib/enums";
import "./key-view.scss";

export default {
  data() {
    return {
      roots,
      scales,
      selectedRoot: roots.C,
      selectedScale: scales.major
    };
  }
};
</script>