<template>
  <div class="module">
    <header class="module__header">
      <h2 class="module__title">{{ title }}</h2>
      <span @click="onToggle" :class="`module__toggle${open ? '--open' : '--closed'}`">
        <font-awesome-icon icon="chevron-circle-down" />
      </span>
      <span @click="onClose" class="module__close">
        <font-awesome-icon icon="times-circle" />
      </span>
    </header>
    <div :class="`module__content${open ? '--open' : '--closed'}`">
      <slot v-if="err" name="error" v-bind:err="err" v-bind:vm="vm" v-bind:info="info">
        <div class="module__error">
          <font-awesome-icon icon="skull" class="module__error-icon"></font-awesome-icon>Opps, something went wrong and this module cannot be opened.
        </div>
      </slot>
      <slot v-else></slot>
    </div>
  </div>
</template>

<script>
import "./module.scss";

export default {
  props: ["title"],
  data() {
    return {
      open: true,
      err: false,
      vm: null,
      info: null
    };
  },
  errorCaptured(err, vm, info) {
    this.err = err;
    this.vm = vm;
    this.info = info;
    return !this.stopPropagation;
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
