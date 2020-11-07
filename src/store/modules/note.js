import request from "../../utils/request";
const state = {
  img: {
    imgPath: ""
  },
  tableInfo: {
    data: [],
    column: [],
    labelList: [],
    artColumn: [],
    artData: [],
    noteCount: 0,
    artCount: 0
  }
};
// const url = "http://localhost:9000";
const url = "http://39.100.106.43:9000";
const actions = {
  async initTableItems({ commit }) {
    const res = await request({
      url: url + "/api/note/getColumnList"
    });
    commit("initTableInfo", { res });
  }
};
const mutations = {
  initTableInfo(state, { res }) {
    state.tableInfo = {
      data: res.data["noteList"],
      column: res.data["noteColumns"],
      artColumn: res.data["artColoumns"],
      artData: res.data["artList"],
      labelList: res.data["labelList"],
      noteCount: res.data["noteList"].length,
      artCount: res.data["artList"].length
    };
    sessionStorage.setItem("tableInfo", JSON.stringify(state.tableInfo));
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
};
