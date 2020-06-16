import Vue from "vue";
import Vuex from "vuex";
import api from "./AxiosService"
import router from "../router";
import { BugsStore } from './BugsStore'
import { NotesStore } from './NotesStore'

Vue.use(Vuex);


export default new Vuex.Store({
  state: {
    profile: {},
    bugs: [],
    activeBug: {},
    notes: []
  },
  mutations: {
    setProfile(state, profile) {
      state.profile = profile;
    },

    setBugs(state, bugs) {
      state.bugs = bugs
    },

    setActiveBug(state, bug) {
      state.activeBug = bug
    },

    setNotes(state, note) {
      state.notes = note
    }

  },


  actions: {
    setBearer({}, bearer) {
      api.defaults.headers.authorization = bearer;
    },
    resetBearer() {
      api.defaults.headers.authorization = "";
    },
    async getProfile({ commit }) {
      try {
        let res = await api.get("profile");
        commit("setProfile", res.data);
      } catch (error) {
        console.error(error);
       }
      }
    },
    modules: {
      BugsStore,
      NotesStore
  }
})
