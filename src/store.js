import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

export default createStore({
  state: {
    accessToken: null,
    refreshToken: null,
    isOpenModal: false,
    otp: null,
    product: null,
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
      state.isOpenModal = true
    },
    closeModal(state) {
      state.isOpenModal = false
    },
    setOtp(state, otp) {
      state.otp = otp
    },
    clearOtp(state) {
      state.otp = null
    },
    setProduct(state, product) {
      state.product = product
    },
    clearProduct(state) {
      state.product = null
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
      commit('openModal')
    },
    closeModal({ commit }) {
      commit('closeModal')
    },
    setOtp({ commit }, otp) {
      commit('setOtp', otp)
    },
    clearOtp({ commit }) {
      commit('clearOtp')
    },
    setProduct({ commit }, product) {
      commit('setProduct', product)
    },
    clearProduct({ commit }) {
      commit('clearProduct')
    },
  },
  getters: {
    getAccessToken: state => state.accessToken,
    getRefreshToken: state => state.refreshToken,
    getOtp: state => state.otp,
    getProduct: state => state.product, // Getter for the entire product object
  },
  plugins: [createPersistedState()],
  modules: {
    user: {
      namespaced: true,
      state: {
        name: null,
        email: null,
        role: null,
        password: null,
      },
      mutations: {
        setUser(state, { name, email, role, password }) {
          state.name = name
          state.email = email
          state.role = role
          state.password = password
        },
        clearUser(state) {
          state.name = null
          state.email = null
          state.role = null
          state.password = null
        },
      },
      actions: {
        setUser({ commit }, { name, email, role, password }) {
          commit('setUser', { name, email, role, password })
        },
        clearUser({ commit }) {
          commit('clearUser')
        },
      },
      getters: {
        getUser: state => state,
      },
    },
  },
})