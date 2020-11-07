<template>
  <div>
    <div class="viewBox">
      <div class="title">
        <h3>{{ datas.offTitle }}</h3>
        <h5>{{ datas.subTitle }}</h5>
      </div>

      <div class="infoLine">
        <div class="time">
          <i class="el-icon-time">{{ datas.createTime }}</i>
        </div>
        <div class="tags" v-if="datas.type == 1">
          <i class="el-icon-guide">
            <el-tag v-for="tag in tags" :key="tag.name" :type="tag.type">
              {{ tag.name }}
            </el-tag>
          </i>
        </div>
        <div class="clearfix"></div>
      </div>
      <br />
      <div class="noteContent">
        <p v-html="datas.domStr"></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    // const datas = this.$store.state.note.tableInfo.data;
    // const datas = JSON.parse(sessionStorage.getItem("tableInfo")).data;
    // const id = this.$route.query.noteId;
    // let value = "";
    // for (let i = 0; i < datas.length; i++) {
    //   if (id === datas[i].id) {
    //     value = datas[i];
    //   }
    // }
    return {
      datas: this.getNoteList()
    };
  },
  computed: {
    tags() {
      let labelList = this.getNoteList().labelList;
      console.log(labelList);
      const labels = JSON.parse(sessionStorage.getItem("tableInfo")).labelList;
      const style = ["success", "info", "warning", "danger", ""];
      const res = [];
      for (let i = 0; i < labelList.length; i++) {
        let labelName = this.getLabelName(labels, labelList[i]);
        res[i] = { name: labelName, type: style[i] };
      }
      return res;
    }
  },
  methods: {
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
    getNoteList() {
      const tableInfo = JSON.parse(sessionStorage.getItem("tableInfo"));
      const noteDatas = tableInfo.data;
      const artDatas = tableInfo.artData;
      const datas = noteDatas.concat(artDatas);
      const id = this.$route.query.noteId;
      let value = "";
      for (let i = 0; i < datas.length; i++) {
        if (id == datas[i].id) {
          value = datas[i];
        }
      }
      return value;
    }
  }
};
</script>

<style scoped lang="less">
.viewBox {
  width: 1200px;
  margin: 0 auto;
  margin-top: 80px;
  text-align: left;
  padding: 40px 40px;
  background-color: white;

  /deep/ img {
    max-width: 1000px;
  }

  /deep/ code {
    font-size: 14px;
    font-family: SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono,
      Courier New, monospace;
  }
  .title > * {
    display: inline-block;
    margin-right: 40px;
  }
  .title {
    /deep/h3 {
      font-size: 24px;
    }
    /deep/h5 {
      font-size: 18px;
    }
  }
  .infoLine {
    font-size: 12px;
    background-color: #f5f6f7;
    padding: 10px 0;
    .time {
      margin-top: 10px;
      float: left;
    }

    /deep/.tags {
      float: left;
      /deep/.el-icon-guide {
        margin-left: 40px;
        font-size: 18px;
        color: rgb(235, 63, 20);
        /deep/.el-tag {
          margin: 0 3px;
        }
      }
    }
    .clearfix {
      clear: both;
    }
  }

  .noteContent {
    margin-top: 40px;
  }
}
</style>
