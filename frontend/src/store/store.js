import Vue from "vue";
import Vuex from "vuex";
import api from "./modules/api";
import login from "./modules/login";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    api,
    login
  }
});
