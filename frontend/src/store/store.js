import Vue from "vue";
import Vuex from "vuex";
import loader from "./modules/loader";
import sponsors from "./modules/sponsors";
import communities from "./modules/communities";
import api from "./modules/api";
import signup from "./modules/signup";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    communities,
    sponsors,
    loader,
    api,
    signup
  }
});
