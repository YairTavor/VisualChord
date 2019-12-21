import Vue from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faPlus,
  faTrash,
  faMusic,
  faBoxOpen,
  faBox,
  faTimesCircle,
  faChevronCircleDown,
  faRetweet,
  faPlay,
  faStop,
  faSkull
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(
  faPlus,
  faTrash,
  faMusic,
  faBoxOpen,
  faBox,
  faTimesCircle,
  faChevronCircleDown,
  faRetweet,
  faPlay,
  faStop,
  faSkull
);

Vue.component("font-awesome-icon", FontAwesomeIcon);
