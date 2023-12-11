import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import SecureLS from 'secure-ls'

const secureLS = new SecureLS({ isCompression: false })

export default createStore({
  state: {
    accessToken: null,
    refreshToken: null,
    isOpenModal: false,
    otp: null,
    product: null,
    loginInfo: {
      email: null,
      _Id: null,
    },
  },
  mutations: {
    setLoginInfo(state, { email, _Id }) {
      state.loginInfo.email = email
      state.loginInfo._Id = _Id
    },
    clearLoginInfo(state) {
      state.loginInfo.email = null
      state.loginInfo._Id = null
    },
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
    setLoginInfo({ commit }, { email, _Id }) {
      commit('setLoginInfo', { email, _Id })
    },
    login({ commit }, { accessToken, refreshToken }) {
      commit('setTokens', { accessToken, refreshToken })
    },
    logout({ commit }) {
      commit('clearLoginInfo')
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
    getLoginInfo: state => state.loginInfo,
    getAccessToken: state => state.accessToken,
    getRefreshToken: state => state.refreshToken,
    getOtp: state => state.otp,
    getProduct: state => state.product, // Getter for the entire product object
  },
  plugins: [createPersistedState({
    key: 'vuex-store',
    storage: {
      getItem: key => {
        const data = secureLS.get(key);
        return data;
      },
      setItem: (key, value) => {
        secureLS.set(key, value);
      },
      removeItem: key => {
        secureLS.remove(key);
      },
    },
  }),],
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