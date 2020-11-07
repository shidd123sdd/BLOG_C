import Vue from "vue";
import Vuex from "vuex";
import label from "./modules/label";
import note from "./modules/note";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    label,
    note
  }
});
