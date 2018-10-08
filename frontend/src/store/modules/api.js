import axios from "axios";

const state = {
  users: []
};

const getters = {
  users() {
    return state.users;
  }
};

const mutations = {
  RECEIVE_USERS(state, { data }) {
    state.users = data;
  }
};

const actions = {
  async FETCH_USERS({ commit }) {
    try {
      const response = await axios.get("/api/data");
      commit("RECEIVE_USERS", { data: response.data });
      commit("loader/setLoading", false, { root: true });
    } catch (error) {
      console.error(error); // eslint-disable-line no-console
    }
  },
  UPDATE_USERS({ commit }, updatedData) {
    commit("RECEIVE_USERS", { data: updatedData });
    commit("loader/setLoading", false, { root: true });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
