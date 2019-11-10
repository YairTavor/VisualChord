<template>
  <div class="layout">
    <header class="layout__header">Visual Chord</header>
    <div class="layout__container">
      <side-menu :list="menuList"></side-menu>
      <workspace :list="activeList"></workspace>
    </div>
    <footer>Copywrite 2019 Yair Tavor</footer>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import sideMenu from "./components/side-menu";
import workspace from "./components/workspace";

import "./app.scss";

export default {
  data() {
    return {
      menuList: [
        { name: "key-view", displayName: "Key View" },
        { name: "piano-roll", displayName: "Piao Roll" }
      ],
      activeList: []
    };
  },
  components: {
    draggable,
    "side-menu": sideMenu,
    workspace: workspace
  }
};
</script>