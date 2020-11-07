<template>
  <div>
    <NavSwiper />
    <div class="sort" v-show="$route.path === '/art' ? false : true">
      <div class="labelbox">
        <div class="labelTitle labelchoose">
          <i class="el-icon-guide" style="font-size:14px">标签：</i>
          <el-tag
            class="unTag"
            v-for="(label, index) in labels"
            :key="label.id"
            size="small"
            @click="chooseTag(label, index)"
            v-show="label.unChoose"
            >{{ label.labelName }}</el-tag
          >
        </div>
        <div class="choosed labelchoose">
          <i class="el-icon-location-outline" style="font-size:14px">已选：</i>
          <el-tag
            class="hasTag"
            v-for="(label, index) in labels"
            :key="label.id"
            size="small"
            closable
            type="warning"
            v-show="label.isChoose"
            @close="closeTag(label, index)"
            >{{ label.labelName }}</el-tag
          >
        </div>
      </div>
      <el-input
        placeholder="请输入标题关键字"
        :clearable="true"
        v-model="titleKey"
      >
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="searchNote"
        ></el-button>
      </el-input>
    </div>
    <div class="bodyContainer">
      <ArticleList
        :titleKey="titleKey"
        :filterLabels="filterLabels"
        ref="noteList"
      ></ArticleList>
      <PersonalInfo></PersonalInfo>
    </div>
  </div>
</template>

<script>
import NavSwiper from "../components/NavSwiper.vue";
import ArticleList from "../components/ArticleList.vue";
import PersonalInfo from "../components/PersonalInfo.vue";
export default {
  name: "Home",
  components: {
    ArticleList,
    PersonalInfo,
    NavSwiper
  },
  data() {
    let list = JSON.parse(sessionStorage.getItem("orgLabels"));
    for (let i = 0; i < list.length; i++) {
      list[i]["unChoose"] = true;
      list[i]["isChoose"] = false;
    }

    return {
      titleKey: "",
      labels: list,
      filterLabels: []
    };
  },
  methods: {
    searchNote() {
      this.$refs.noteList.fitlerNotes();
    },
    chooseTag(label, index) {
      let untag = document.getElementsByClassName("unTag")[index];
      untag.style.display = "none";
      let hastag = document.getElementsByClassName("hasTag")[index];
      hastag.style.display = "inline-block";
      this.filterLabels.push(label.id);
      this.$refs.noteList.fitlerNotes();
    },
    closeTag(label, index) {
      let untag = document.getElementsByClassName("unTag")[index];
      untag.style.display = "inline-block";
      let hastag = document.getElementsByClassName("hasTag")[index];
      hastag.style.display = "none";
      let filters = this.filterLabels;
      for (let i = 0; i < filters.length; i++) {
        if (filters[i] == label.id) {
          this.filterLabels.splice(i, 1);
        }
      }
      this.$refs.noteList.fitlerNotes();
    }
  }
};
</script>

<style scoped lang="less">
.sort {
  width: 1100px;
  height: 120px;
  margin: 20px auto;
  margin-top: 20px;
  margin-bottom: 0;
  background-color: white;

  /deep/.el-input {
    width: 400px;
    height: 30px;
    position: relative;
    right: -90px;
    bottom: -10px;
  }
  .labelbox {
    width: 500px;
    height: 100%;
    float: left;
    text-align: left;
    .labelchoose {
      padding-left: 40px;
      height: 60px;
      line-height: 60px;
      cursor: pointer;
      /deep/ .el-tag {
        margin-right: 10px;
      }
    }
  }
  .clearfix {
    clear: both;
  }
}
</style>
