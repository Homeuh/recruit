import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        // token: "",
        login_id: "",
        login_role: "",
        onlyReadResume: false,
    },
    mutations: {
        // setToken(state) {
        //     state.token = window.sessionStorage.getItem("token");
        // },
        // removeToken(state) {
        //     state.token = window.sessionStorage.removeItem("token");
        // },
        setLogin(state) {
            state.login_id = window.localStorage.getItem("login_id");
            state.login_role = window.localStorage.getItem("login_role");
        },
        removeLogin(state) {
            state.login_id = window.localStorage.removeItem("login_id");
            state.login_role = window.localStorage.removeItem("login_role");
        },
        setOnlyReadResume(state) {
            state.onlyReadResume = true;
        },
        recoverOnlyReadResume(state) {
            state.onlyReadResume = false;
        },
    },
    actions: {},
    getters: {},
    modules: {}
})

export default store;