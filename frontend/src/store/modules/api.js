import axios from "axios";

const state = {
  users: [],
  stats: []
};

const getters = {
  users() {
    return state.users;
  },
  stats() {
    return state.stats;
  }
};

const mutations = {
  RECEIVE_USERS(state, { data }) {
    state.users = data;
  },
  GET_STATS(state, users) {
    // Calculate total pull requests
    let totalPrs = users.reduce((total, obj) => obj.prs + total, 0);
    // Calculate total completions (prs/5)
    let totalCompletions = users.reduce((total, users) => {
      return users.prs >= 5 ? total + 1 : total;
    }, 0);
    state.stats = [];
    state.stats.push(
      { name: "Participants", number: users.length },
      { name: "Pull Requests", number: totalPrs },
      { name: "Completions", number: totalCompletions }
    );
  }
};

const actions = {
  async FETCH_USERS({ commit }) {
    try {
      const response = await axios.get("/api/data");
      /* ===== SET THE USERS ===== */
      commit("RECEIVE_USERS", { data: response.data });
      /* ===== SET THE LOADING STATE ===== */
      commit("loader/setLoading", false, { root: true });
      /* ===== CALCULATE TOTAL PARTICIPANTS ===== */
      commit("GET_STATS", response.data);
    } catch (error) {
      console.error(error); // eslint-disable-line no-console
    }
  },
  UPDATE_USERS({ commit }, updatedData) {
    /* ===== SET THE USERS ===== */
    commit("RECEIVE_USERS", { data: updatedData });
    /* ===== SET THE LOADING STATE ===== */
    commit("loader/setLoading", false, { root: true });
    /* ===== GET STATS ===== */
    commit("GET_STATS", updatedData);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
