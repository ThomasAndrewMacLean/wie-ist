import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    userName: "",
    userPicture: ""
  },
  mutations: {
    setUser(state, payload) {
      state.userName = payload.userName;
      state.userPicture = payload.userPicture;
    }
  },
  actions: {
    setUser(context, payload) {
      context.commit("setUser", payload);
    }
  },
  getters: {
    userName(state) {
      return state.userName;
    },
    userPicture(state) {
      return state.userPicture;
    }
  },
  plugins: [createPersistedState({ storage: window.sessionStorage })]
});
