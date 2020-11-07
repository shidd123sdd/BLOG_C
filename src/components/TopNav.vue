<template>
  <div>
    <ul id="nav">
      <div class="logo">BLOG</div>
      <div class="desc">——来自一个小白的知识搬运工</div>
      <router-link tag="li" to="/art">随笔</router-link>
      <li v-show="false">专栏</li>
      <router-link tag="li" to="/note">笔记</router-link>
      <router-link tag="li" to="/">首页</router-link>
    </ul>
  </div>
</template>

<script>
export default {
  name: "topNav"
};
</script>

<style scoped lang="less">
.nav {
  /deep/ li {
    font-size: 18px;
  }
}
</style>
