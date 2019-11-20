import Vue from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faPlus,
  faTrash,
  faMusic,
  faBoxOpen,
  faBox,
  faTimesCircle
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faPlus, faTrash, faMusic, faBoxOpen, faBox, faTimesCircle);

Vue.component("font-awesome-icon", FontAwesomeIcon);
