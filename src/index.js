import Vue from "vue";
import App from "./App.vue";
import "./fonts";
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/default.css";

Vue.component("VueSlider", VueSlider);

new Vue({ render: createElement => createElement(App) }).$mount("#app");
