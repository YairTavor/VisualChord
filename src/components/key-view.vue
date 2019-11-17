<template>
  <div>
    <h2>Key View</h2>
    <div>key view shows the Available chords and notes in a key.</div>
    <div>
      <select class="chord-edit__prop-input" v-model="selectedRoot">
        <option
          v-for="key in Object.keys(roots)"
          :key="key"
          :value="roots[key]"
        >{{ roots[key].sign }} {{roots[key].alternate ? `(${roots[key].alternate})` : ''}}</option>
      </select>
    </div>
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
export default {
  data() {
    return {
      roots,
      scales,
      selectedRoot: "",
      selectedScale: null
    };
  }
};
</script>