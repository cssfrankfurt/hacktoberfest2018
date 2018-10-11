import Vue from "vue";
import "@fortawesome/fontawesome-free/css/all.css";
import {
  Vuetify,
  VApp,
  VDataTable,
  VProgressLinear,
  VBtn,
  VIcon,
  transitions
} from "vuetify";

Vue.use(Vuetify, {
  theme: {
    primary: "#582D41",
    secondary: "#FF9A56",
    accent: "#2B81D9",
    cyan: "#01FFFF"
  },
  components: {
    VApp,
    VDataTable,
    VProgressLinear,
    VBtn,
    VIcon,
    transitions
  },
  iconfont: "fa"
});
