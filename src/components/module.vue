<template>
  <div class="module">
    <header class="module__header">
      <h2 class="module__title">{{title}}</h2>
      <span @click="onClose" class="module__close">
        <font-awesome-icon icon="times-circle" />
      </span>
    </header>
    <slot></slot>
  </div>
</template>

<script>
import "./module.scss";

export default {
  props: ["title"],
  methods: {
    onClose() {
      this.$emit("onModuleClose");
    }
  }
};
</script>