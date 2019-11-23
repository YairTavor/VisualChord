<template>
  <div class="module">
    <header class="module__header">
      <h2 class="module__title">{{title}}</h2>
      <span @click="onToggle" :class="`module__toggle${open ? '--open' : '--closed'}`">
        <font-awesome-icon icon="chevron-circle-down" />
      </span>
      <span @click="onClose" class="module__close">
        <font-awesome-icon icon="times-circle" />
      </span>
    </header>
    <div :class="`module__content${open ? '--open' : '--closed'}`">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import "./module.scss";

export default {
  props: ["title"],
  data() {
    return {
      open: true
    };
  },
  methods: {
    onClose() {
      this.$emit("onModuleClose");
    },
    onToggle() {
      this.open = !this.open;
    }
  }
};
</script>