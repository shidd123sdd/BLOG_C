<template>
  <div id="app">
    <TopNav />
    <router-view></router-view>
    <div class="foot">Copyright © 2018 vueComponent</div>
  </div>
</template>
<script>
import TopNav from "./components/TopNav.vue";
export default {
  components: {
    TopNav
  },
  watch: {
    "$route.path": function(newVal) {
      if (newVal === "/about") {
        this.isShow = true;
      } else {
        this.isShow = false;
      }
    }
  }
};
</script>
<style lang="less">
html {
  overflow: scroll;
}
body {
  margin: 0;
  background-color: #eeeeee;
}
#app {
  margin: 0;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.logo {
  float: left;
  padding-left: 40px;
  font-size: 40px;
  color: #2c3e50;
}
.desc {
  float: left;
  padding-left: 20px;
  padding-top: 20px;
  font-size: 10px;
  color: #2c3e50;
}
#nav {
  text-align: center;
  padding: 0;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  list-style-type: none;
  margin: 0 auto;
  padding: 0 200px;
  background-color: white;
  z-index: 999;
  box-sizing: border-box;
  opacity: 0.7;
  li {
    font-weight: bold;
    color: #2c3e50;
    float: right;
    font-size: 20px;
    padding: 10px 25px;
    &.router-link-exact-active {
      color: #1ae074;
    }
  }
  li:hover {
    background-color: rgb(132, 223, 235);
  }
}
.clear {
  clear: both;
}

.foot {
  width: 100%;
  bottom: 0;
  text-align: center;
  margin: 30px auto;
}
</style>
