import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
    strict: true,

    plugins: [
        createPersistedState()
    ],
    state: {
        token: null,
        person: null,
        isUserLoggedIn: false,
    },
    mutations: {
        setToken(state, token) {
            state.token = token
            state.isUserLoggedIn = !!(token)
        },
        setUser(state, user) {
            state.person = user
        },
    },
    actions: {
        setToken({ commit }, token) {
            commit('setToken', token)
        },
        setUser({ commit }, user) {
            commit('setUser', user)
        }
    },
    getters: {
        userType(state) {
            return state.person ? state.person.type : null
        }
    }

}) 