const state = {
  users: []
};

const getters = {
  users() {
    return state.users;
  }
};

const mutations = {};

const actions = {};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
