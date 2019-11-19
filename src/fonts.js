import Vue from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faPlus,
  faTrash,
  faMusic,
  faBoxOpen,
  faBox
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faPlus, faTrash, faMusic, faBoxOpen, faBox);

Vue.component("font-awesome-icon", FontAwesomeIcon);
