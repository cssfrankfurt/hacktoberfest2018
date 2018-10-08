import Vue from "vue";
import Vuex from "vuex";
import api from "./modules/api";
import login from "./modules/login";

Vue.use(Vuex);

/* ----------  Global Scope  ---------- */
const state = {};
const getters = {};
const actions = {};
const mutations = {};

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters,
  modules: {
    api,
    login
  }
});
