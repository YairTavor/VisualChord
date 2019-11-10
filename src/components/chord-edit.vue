<template>
  <div class="chord-edit">
    Chord Editor
    <p
      v-if="!currentChord.root"
      class="chord-edit__empty"
    >In order to edit a chord, please select one from the composer</p>
    <div v-else class="chord-edit__chord-props">
      <div class="chord-edit__prop">
        <div class="chord-edit__prop-label">Root</div>
        <select class="chord-edit__prop-input" v-model="currentChord.root">
          <option
            v-for="key in Object.keys(roots)"
            :key="key"
            :value="roots[key]"
          >{{ roots[key].sign }} {{roots[key].alternate ? `(${roots[key].alternate})` : ''}}</option>
        </select>
      </div>

      <div class="chord-edit__prop">
        <div class="chord-edit__prop-label">Quality</div>
        <select class="chord-edit__prop-input" v-model="currentChord.quality">
          <option
            v-for="key in Object.keys(qualities)"
            :key="key"
            :value="qualities[key]"
          >{{ qualities[key].displayName }}</option>
        </select>
      </div>

      <div class="chord-edit__prop">
        <div class="chord-edit__prop-label">Extension</div>
        <select class="chord-edit__prop-input" v-model="currentChord.extension">
          <option
            v-for="key in Object.keys(extensions)"
            :key="key"
            :value="extensions[key]"
          >{{ extensions[key].displayName }}</option>
        </select>
      </div>

      <div class="chord-edit__prop">
        <div class="chord-edit__prop-label">Bass</div>
        <select class="chord-edit__prop-input" v-model="currentChord.bass">
          <option value>None</option>
          <option
            v-for="key in Object.keys(roots)"
            :key="key"
            :value="roots[key]"
          >{{ roots[key].sign }} {{roots[key].alternate ? `(${roots[key].alternate})` : ''}}</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
import { roots, qualities, extensions } from "../lib/enums";
import "./chord-edit.scss";
export default {
  props: ["currentChord"],
  data() {
    return {
      roots,
      qualities,
      extensions
    };
  }
};
</script>