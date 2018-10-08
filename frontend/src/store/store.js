import Vue from "vue";
import Vuex from "vuex";
import loader from "./modules/loader";
import api from "./modules/api";
import login from "./modules/login";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    loader,
    api,
    login
  }
});
