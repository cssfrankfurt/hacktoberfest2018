import axios from "axios";

const state = {};

const getters = {};

const mutations = {};

const actions = {
  async login() {
    try {
      const response = await axios.get("/api/login");
      window.location = response.data;
    } catch (error) {
      console.error(error); // eslint-disable-line no-console
    }
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
