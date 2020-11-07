import request from "../../utils/request";

const state = {
  orgLabels: [],
  labelColumnList: []
};
// const url = "http://localhost:9000";
const url = "http://39.100.106.43:9000";
const actions = {
  async getOrgLables({ commit }) {
    const res = await request({
      url: url + "/api/label/getOrgLables",
      method: "get"
    });
    commit("setOrglabel", res.data);
  }
};
const mutations = {
  setOrglabel(state, res) {
    state.orgLabels = res;
    sessionStorage.setItem("orgLabels", JSON.stringify(res));
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
};
