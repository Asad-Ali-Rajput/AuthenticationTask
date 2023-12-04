import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

export default createStore({
  state: {
    accessToken: null,
    refreshToken: null,
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
  },
  actions: {
    login({ commit }, { accessToken, refreshToken }) {
      commit('setTokens', { accessToken, refreshToken })
    },
    logout({ commit }) {
      commit('clearTokens')
    },
  },
  getters: {
    getAccessToken: state => state.accessToken,
    getRefreshToken: state => state.refreshToken,
  },
  plugins: [createPersistedState()],
});
