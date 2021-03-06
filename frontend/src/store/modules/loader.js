const state = {
  loading: true
};

const getters = {
  isLoading() {
    return state.loading;
  }
};

const mutations = {
  setLoading(state, status) {
    state.loading = status;
  }
};
export default {
  namespaced: true,
  state,
  getters,
  mutations
};
