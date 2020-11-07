<template>
  <div>
    <div class="tag">
      <h4>{{ data.tag }}</h4>
    </div>
    <div class="container">
      <div class="list" v-for="item in data.data" :key="item.id">
        <h2>
          <a @click="toDetails(item)">{{ item.offTitle }}</a>
        </h2>
        <span>{{ item.shortInfo }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: null
    }
  },
  methods: {
    toDetails(item) {
      this.$router.push({
        name: "artDetails",
        query: {
          noteId: item.id
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
.tag {
  padding-left: 15px;
  line-height: 40px;
  padding: 10px auto;
  color: rgb(19, 152, 230);
}
.container {
  .list {
    padding-top: 10px;
    padding-bottom: 15px;
    padding-left: 30px;
    padding-right: 30px;
    border-bottom: 1px solid #f4f4f4;
    h2 {
      margin-top: 0;
      font-size: 18px;
      font-weight: bold;
      line-height: 24px;
      height: 24px;
      margin-bottom: 4px;
      overflow: hidden;
      white-space: nowrap;
      font-family: PingFang SC, Hiragino Sans GB, Arial, Microsoft YaHei,
        Verdana, Roboto, Noto, Helvetica Neue, sans-serif !important;
    }
    h2 > a:hover {
      color: red;
      cursor: pointer;
    }
  }
  .list:hover {
    background-color: #f5f6f7;
  }
  .el-divider--horizontal {
    margin: 0;
  }
}
</style>
