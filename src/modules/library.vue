<template>
  <div class="library">
    <div class="library__subtitle">
      Save the chords in the composer to your browser's local storage.
      <br />
      // TODO: add override and delete warnings
    </div>
    <header class="library__header">
      <div class="library__title">
        <label for="currentFile.name" class="library__label"
          >Current File
        </label>
        <input
          id="currentFile.name"
          type="text"
          class="library__title-input"
          v-model="currentFile.name"
          placeholder="File name"
        />
      </div>

      <div class="library__description-wrapper">
        <label for="currentFile.description" class="library__label"
          >Description</label
        >
        <textarea
          id="currentFile.description"
          class="library__description"
          v-model="currentFile.description"
          placeholder="Description"
        >
        </textarea>
      </div>
      <div>
        <button
          class="library__save"
          :disabled="!currentFile.id"
          @click="saveFile(false)"
        >
          Save
        </button>
        <button class="library__save" @click="saveFile(true)">
          Save as new
        </button>
      </div>
    </header>

    <spinner v-if="loading"></spinner>
    <div v-if="!loading && !files.length">
      No files to display. :(
    </div>
    <div v-if="!loading && files.length">
      <table class="library__results">
        <thead>
          <tr>
            <th class="library__results-header">File Name</th>
            <th class="library__results-header">Created</th>
            <th class="library__results-header">Description</th>
            <th class="library__results-header">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="file in files"
            :key="file.id"
            @click="setCurrent(file)"
            class="library__results-item-wrapper"
          >
            <td class="library__results-item" :title="file.name">
              {{ file.name }}
            </td>
            <td class="library__results-item" :title="file.created">
              {{ file.created }}
            </td>
            <td class="library__results-item">
              {{ file.description }}
            </td>
            <td class="library__results-item">
              <span
                class="library__results-action"
                @click="deleteFile(file, $event)"
                >Delete</span
              >
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import spinner from "../components/spinner.vue";
import generateHash from "random-hash";
import Chord from "../lib/chord";
import "./library.scss";

export default {
  displayName: "Library",
  props: ["chords", "setChords"],
  data() {
    return {
      currentFile: {
        name: "",
        description: ""
      },
      loading: false,
      files: []
    };
  },
  created() {
    this.loadFiles();
  },
  methods: {
    loadFiles() {
      const value = localStorage.getItem("files");
      if (value) {
        this.files = JSON.parse(value).map(file => {
          file.chords = file.chords.map(chord => new Chord(chord));
          return file;
        });
      } else {
        this.files = [];
      }
    },

    setCurrent(file) {
      this.currentFile = { ...file };
      this.setChords({
        chords: file.chords
      });
    },

    saveFile(asNewFile) {
      this.saveList(() => {
        const file = { ...this.currentFile, chords: [...this.chords] };
        if (asNewFile) {
          file.id = generateHash();
          file.created = `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`;
          this.files.push(file);
        } else {
          const index = this.files.findIndex(({ id }) => file.id === id);
          this.files.splice(index, 1, file);
        }
        this.currentFile = { ...file };
      });
    },

    deleteFile(file, event) {
      event.stopPropagation();
      this.saveList(() => {
        const index = this.files.findIndex(({ id }) => file.id === id);
        this.files.splice(index, 1);
        if (this.currentFile.id === file.id) {
          this.currentFile = {
            name: "",
            description: ""
          };
        }
      });
    },

    saveList(func) {
      this.loading = true;
      setTimeout(() => {
        func && func();
        localStorage.setItem("files", JSON.stringify(this.files));
        this.loading = false;
      }, 300);
    }
  },
  components: {
    spinner
  }
};
</script>
