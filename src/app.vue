<template>
  <div class="layout">
    <header class="layout__header">Visual Chord</header>
    <div class="layout__container">
      <side-menu :list="menuList"></side-menu>
      <workspace :list="activeList" @onModuleClose="onClose"></workspace>
    </div>
    <footer>Copywrite 2019 Yair Tavor</footer>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import sideMenu from "./components/side-menu";
import workspace from "./components/workspace";
import { menuItems } from "./modules-map";

import "./app.scss";

export default {
  data() {
    return {
      menuList: [...menuItems],
      activeList: []
    };
  },
  methods: {
    onClose(index) {
      this.activeList.splice(index, 1);
    }
  },
  components: {
    draggable,
    "side-menu": sideMenu,
    workspace: workspace
  }
};
</script>