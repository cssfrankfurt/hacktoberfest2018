import Vue from "vue";
import "@fortawesome/fontawesome-free/css/all.css";
import {
  Vuetify,
  VApp,
  VNavigationDrawer,
  VDataTable,
  VProgressLinear,
  VFooter,
  VList,
  VBtn,
  VIcon,
  VGrid,
  VToolbar,
  transitions
} from "vuetify";
import "vuetify/src/stylus/app.styl";

Vue.use(Vuetify, {
  theme: {
    primary: "#582D41",
    secondary: "#FF9A56",
    accent: "#2B81D9"
  },
  components: {
    VApp,
    VNavigationDrawer,
    VDataTable,
    VProgressLinear,
    VFooter,
    VList,
    VBtn,
    VIcon,
    VGrid,
    VToolbar,
    transitions
  },
  iconfont: "fa"
});
