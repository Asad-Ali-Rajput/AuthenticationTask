import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

export default createStore({
  state: {
    accessToken: null,
    refreshToken: null,
    isOpenModal: false,
  },
  mutations: {
    setTokens(state, { accessToken, refreshToken }) {
      state.accessToken = accessToken
      state.refreshToken = refreshToken
    },
    clearTokens(state) {
      state.accessToken = null
      state.refreshToken = null
    },
    openModal(state) {
      state.isOpenModal = true;
    },
    closeModal(state) {
      state.isOpenModal = false;
    },
  },
  actions: {
    login({ commit }, { accessToken, refreshToken }) {
      commit('setTokens', { accessToken, refreshToken })
    },
    logout({ commit }) {
      commit('clearTokens')
    },
    openModal({ commit }) {
      commit('openModal');
    },
    closeModal({ commit }) {
      commit('closeModal');
    },
  },
  getters: {
    getAccessToken: state => state.accessToken,
    getRefreshToken: state => state.refreshToken,
  },
  plugins: [createPersistedState()],
});
