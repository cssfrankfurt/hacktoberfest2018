import axios from "axios";

const state = {
  users: [],
  totalParticipants: 0,
  totalPrs: 0,
  totalCompletions: 0
};

const getters = {
  users() {
    return state.users;
  },
  totalParticipants() {
    return state.totalParticipants;
  },
  totalPrs() {
    return state.totalPrs;
  },
  totalCompletions() {
    return state.totalCompletions;
  }
};

const mutations = {
  RECEIVE_USERS(state, { data }) {
    state.users = data;
  },
  GET_TOTAL_PARTICIPANTS(state, data) {
    state.totalParticipants = data;
  },
  GET_TOTAL_PRS(state, data) {
    let total = data.reduce((total, obj) => obj.prs + total, 0);
    state.totalPrs = total;
  },
  GET_TOTAL_COMPLETIONS(state, data) {
    let completions = data.reduce((total, users) => {
      return users.prs >= 5 ? total + 1 : total;
    }, 0);
    state.totalCompletions = completions;
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
      commit("GET_TOTAL_PARTICIPANTS", response.data.length);
      /* ===== CALCULATE TOTAL PULL REQUESTS ===== */
      commit("GET_TOTAL_PRS", response.data);
      /* ===== CALCULATE TOTAL COMPLETIONS ===== */
      commit("GET_TOTAL_COMPLETIONS", response.data);
    } catch (error) {
      console.error(error); // eslint-disable-line no-console
    }
  },
  UPDATE_USERS({ commit }, updatedData) {
    /* ===== SET THE USERS ===== */
    commit("RECEIVE_USERS", { data: updatedData });
    /* ===== SET THE LOADING STATE ===== */
    commit("loader/setLoading", false, { root: true });
    /* ===== CALCULATE TOTAL PARTICIPANTS ===== */
    commit("GET_TOTAL_PARTICIPANTS", updatedData.length);
    /* ===== CALCULATE TOTAL PULL REQUESTS ===== */
    commit("GET_TOTAL_PRS", updatedData);
    /* ===== CALCULATE TOTAL COMPLETIONS ===== */
    commit("GET_TOTAL_COMPLETIONS", updatedData);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
