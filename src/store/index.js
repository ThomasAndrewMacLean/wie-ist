import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    userName: "",
    userPicture: "",
    uploadPic: ""
  },
  mutations: {
    setUser(state, payload) {
      state.userName = payload.userName;
      state.userPicture = payload.userPicture;
    },
    setUploadPic(state, payload) {
      state.uploadPic = payload.uploadPic;
    }
  },
  actions: {
    setUser(context, payload) {
      context.commit("setUser", payload);
    },
    setUploadPic(context, payload) {
      context.commit("setUploadPic", payload);
    }
  },
  getters: {
    userName(state) {
      return state.userName;
    },
    userPicture(state) {
      return state.userPicture;
    },
    uploadPic(state) {
      return state.uploadPic;
    }
  },
  plugins: [createPersistedState({ storage: window.sessionStorage })]
});
