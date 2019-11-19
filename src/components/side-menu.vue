<template>
  <nav class="side-menu">
    <header>
      <h2 class="side-menu__title">Modules</h2>
      <p
        class="side-menu__description"
      >Drag items from this modules list into the workspace modules panel</p>
    </header>
    <draggable
      class="side-menu__item-list"
      :list="list"
      :group="{ name: 'components', pull: 'clone', put: false}"
      :sort="false"
    >
      <div class="side-menu__item" v-for="element in list" :key="element.name">
        <font-awesome-icon icon="box"></font-awesome-icon>
        &nbsp;
        {{ element.displayName }}
      </div>
    </draggable>
  </nav>
</template>

<script>
import draggable from "vuedraggable";
import "./side-menu.scss";

export default {
  props: ["list"],
  components: {
    draggable
  }
};
</script>