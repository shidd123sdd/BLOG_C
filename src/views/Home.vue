<template>
  <div>
    <NavSwiper />
    <div class="bodyContainer">
      <div class="content data_info">
        <OverviewList
          v-for="(item, index) in datas"
          :key="index"
          :data="item"
        />
      </div>
      <PersonalInfo></PersonalInfo>
      <div class="clearfix"></div>
    </div>
  </div>
</template>

<script>
import NavSwiper from "../components/NavSwiper.vue";
import PersonalInfo from "../components/PersonalInfo.vue";
import OverviewList from "../components/OverviewList";
export default {
  name: "Home",
  beforeCreate() {
    this.$store.dispatch({
      type: "note/initTableItems"
    });
    this.$store.dispatch({
      type: "label/getOrgLables"
    });
  },
  components: {
    PersonalInfo,
    NavSwiper,
    OverviewList
  },
  watch: {
    "$store.state.note.tableInfo.data": function(newValue) {
      this.noteData = newValue;
    },
    "$store.state.note.tableInfo.artData": function(newValue) {
      this.artData = newValue;
    }
  },
  computed: {
    datas() {
      let res = [{ tag: "笔记列表" }, { tag: "随笔列表" }];
      const noteList = this.noteData;
      const artList = this.artData;
      let noteRes = [];
      let artRes = [];
      if (noteList.length > 0) {
        for (
          let i = 0;
          i < (noteList.length < 10 ? noteList.length : 10);
          i++
        ) {
          noteList[i]["shortInfo"] =
            noteList[i].content.substring(0, 50) + "...";
          noteRes.push(noteList[i]);
        }
      }
      if (artList.length > 0) {
        for (let i = 0; i < (artList.length < 10 ? artList.length : 10); i++) {
          artList[i]["shortInfo"] = artList[i].content.substring(0, 50) + "...";
          artRes.push(artList[i]);
        }
      }
      res[0]["data"] = noteRes;
      res[1]["data"] = artRes;
      return res;
    }
  },
  data() {
    return {
      noteData: [],
      artData: []
    };
  }
};
</script>

<style lang="less">
.bodyContainer {
  text-align: left;
  display: inline-block;
  margin-top: 25px;
  .data_info {
    float: left;
  }
  .content {
    width: 800px;
    margin-right: 25px;
    background: white;
    padding-bottom: 40px;
  }
  .clearfix {
    clear: both;
  }
}
</style>
