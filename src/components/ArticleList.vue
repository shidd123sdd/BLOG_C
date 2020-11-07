<template>
  <div class="home data_info">
    <!-- <div v-if="dataList.length > 0"> -->
    <div v-for="item in dataList" :key="item.id" class="data_list">
      <div class="off_title">
        <h3>
          {{ item.offTitle }}
        </h3>
        <span v-show="$route.path === '/art' ? false : true">
          |
          <h6>
            {{ item.subTitle }}
          </h6>
        </span>
      </div>
      <div class="shortImg">
        <div class="box">
          <div class="img">
            <img
              :src="
                item.imgPath ? item.imgPath : require('../images/artic/wz1.jpg')
              "
            />
          </div>
        </div>
        <div class="short">
          <div class="shortInfo">
            <span style="color: black;">{{ item.shortInfo }}</span>
          </div>
        </div>
        <div class="clear"></div>
      </div>
      <div class="footer">
        <el-divider></el-divider>
        <div class="time">
          <i class="el-icon-time">{{ item.createTime }}</i>
        </div>
        <div class="sort" v-show="$route.path === '/art' ? false : true">
          <i class="el-icon-guide">{{ item.label }}</i>
        </div>
        <!-- <router-link to="/artDetails"> -->
        <div class="details" @click="toDetails(item)">
          详情<span class="toto">>>></span>
        </div>
        <div class="clear"></div>
      </div>
    </div>
    <!-- </div> -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="noteCount"
      @current-change="handleCurrentChange"
      @prev-click="prevClick"
      @next-click="nextClick"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "ArticleList",
  props: {
    titleKey: {
      type: String,
      default: ""
    },
    filterLabels: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  watch: {
    $route: function(newRouter) {
      const currPath = newRouter.name;
      const tableInfo = JSON.parse(sessionStorage.getItem("tableInfo"));
      if (currPath == "art") {
        this.datas = tableInfo.artData;
        this.noteCount = tableInfo.artCount;
      } else {
        this.datas = tableInfo.data;
        this.noteCount = tableInfo.noteCount;
      }
    }
  },
  computed: {
    dataList() {
      let datas = this.datas;
      const tableInfo = JSON.parse(sessionStorage.getItem("tableInfo"));
      let res = [];
      for (let i = 0; i < (datas.length <= 10 ? datas.length : 10); i++) {
        const content = datas[i].content;
        const shortInfo = content.substring(0, 180);
        let labelName = "";
        if (!(this.$route.path === "/art")) {
          const labelList = tableInfo.labelList;
          const label = datas[i].labelList;
          const labelId = label[label.length - 1];
          labelName = this.getLabelName(labelList, labelId);
        }

        res[i] = {
          ...datas[i],
          shortInfo: shortInfo + "...",
          label: labelName
        };
      }
      return res;
    }
  },
  data() {
    const currPath = this.$route.name;
    const tableInfo = JSON.parse(sessionStorage.getItem("tableInfo"));
    let datas = [];
    let noteCount = 0;
    if (currPath == "art") {
      datas = tableInfo.artData;
      noteCount = tableInfo.artCount;
    } else {
      datas = tableInfo.data;
      noteCount = tableInfo.noteCount;
    }

    return {
      datas: datas,
      noteCount: noteCount
    };
  },
  methods: {
    isArt() {
      return this.$route.path === "/art" ? true : false;
    },
    handleCurrentChange(val) {
      this.getPageData(val);
    },
    prevClick(val) {
      this.getPageData(val);
    },
    nextClick(val) {
      this.getPageData(val);
    },
    toDetails(item) {
      this.$router.push({
        name: "artDetails",
        query: {
          noteId: item.id
        }
      });
    },
    getLabelName(arr1, id) {
      var temp = "";
      var forFn = function(arr, id) {
        for (var i = 0; i < arr.length; i++) {
          var item = arr[i];
          if (item.id == id) {
            temp = item.labelName;
            return;
          } else {
            if (item.children) {
              forFn(item.children, id);
            }
          }
        }
      };
      forFn(arr1, id);
      return temp;
    },
    fitlerNotes() {
      const tableInfo = JSON.parse(sessionStorage.getItem("tableInfo"));
      const noteDatas = tableInfo.data;
      const filterLabels = this.filterLabels;
      const labelList = tableInfo.labelList;
      let datas = [];
      for (let i = 0; i < noteDatas.length; i++) {
        const noteLabels = noteDatas[i].labelList;
        if (filterLabels.length === 0) {
          datas = noteDatas;
        } else {
          for (let j = 0; j < filterLabels.length; j++) {
            if (noteLabels.indexOf(filterLabels[j] + "") >= 0) {
              datas.push(noteDatas[i]);
              break;
            }
          }
        }
      }
      let res = [];
      if (this.titleKey != "") {
        for (let i = 0; i < datas.length; i++) {
          if (
            datas[i].offTitle
              .toUpperCase()
              .indexOf(this.titleKey.toUpperCase()) >= 0 ||
            datas[i].subTitle
              .toUpperCase()
              .indexOf(this.titleKey.toUpperCase()) >= 0
          ) {
            res.push(datas[i]);
          }
        }
      } else {
        res = datas;
      }
      for (let i = 0; i < (res.length <= 10 ? res.length : 10); i++) {
        const content = res[i].content;
        const label = res[i].labelList;
        const shortInfo = content.substring(0, 180);
        const labelId = label[label.length - 1];
        let labelName = this.getLabelName(labelList, labelId);
        res[i] = {
          ...res[i],
          shortInfo: shortInfo + "...",
          label: labelName
        };
      }
      this.noteCount = res.length;
      this.datas = res;
    },
    getPageData(index) {
      this.fitlerNotes();
      const len = this.datas.length;
      let min = (index - 1) * 10 + 1;
      let max = index * 10;
      if (min > len + 1) {
        return this.datas;
      } else if (max > len + 1) {
        max = len + 1;
      }
      let res = [];
      for (let i = 0; i < len; i++) {
        if (i >= min - 1 && i <= max - 1) {
          res.push(this.datas[i]);
        }
      }
      this.datas = res;
    }
  }
};
</script>

<style scoped lang="less">
.data_list {
  width: 800px;
  padding-left: 10px;
  padding-right: 10px;
  margin-right: 30px;
  text-align: left;
  background-color: white;
  margin-bottom: 20px;
  border-radius: 5px;
  /deep/ a {
    text-decoration: none;
  }
}

.footer {
  display: block;

  /deep/ .el-divider--horizontal {
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .time {
    float: left;
    font-size: 14px;
    margin-left: 30px;
    color: rgb(19, 152, 230);
  }
  .sort {
    float: left;
    font-size: 14px;
    margin-left: 30px;
    color: rgb(19, 152, 230);
  }
  .details {
    float: right;
    font-size: 15px;
    margin-right: 20px;
    padding-bottom: 10px;
    cursor: pointer;
    color: chocolate;
  }
  .details:hover {
    color: blueviolet;
  }
}

.shortImg {
  display: block;

  width: 100%;
  .box {
    display: block;
    float: left;
    margin-left: 10px;
    .img {
      border: 1px solid rgba(0, 0, 0, 0.064);
      margin: 0;
      width: 240px;
      height: 150px;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 90%;
        height: 90%;
      }
    }
  }
  .short {
    display: block;
    padding: 20px 40px;
    padding-left: 60px;
    width: 400px;
    float: left;
    .shortInfo {
      display: flex;
    }
    /deep/ span {
      font-size: 14px;
    }
  }
}

.off_title {
  h6 {
    display: inline-block;
    color: rgba(73, 179, 240, 0.74);
    font-size: 16px;
    margin: 20px 20px;
    margin-left: 10px;
    font-weight: 400;
  }
  h3 {
    color: rgb(19, 152, 230);
    margin: 20px 20px;
    padding-bottom: 10px;
    margin-right: 10px;
    font-weight: 400;
    font-size: 18px;
    display: inline-block;
    border-bottom: 3px solid rgb(81, 84, 219);
  }

  /deep/ .el-divider--horizontal {
    margin-top: 0px;
    margin-bottom: 0px;
  }
}
span {
  font-size: 15px;
}
.clear {
  clear: both;
}
.el-pagination {
  text-align: center;
}
</style>
