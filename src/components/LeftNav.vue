<template>
  <div id="leftNav">
    <div class="title">
      <el-menu
        default-active="1-4-1"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        :collapse="isCollapse"
      >
        <el-submenu index="1">
          <template slot="title">
            <i class="titleImg"><img src="../images/leftNav/java.png"/></i>
            <span slot="title">java</span>
          </template>
          <el-menu-item-group>
            <span slot="title" class="listDetils">java</span>
            <el-menu-item index="1-1">JavaSE</el-menu-item>
            <el-menu-item index="1-2">Spring</el-menu-item>
          </el-menu-item-group>
          <!-- <el-menu-item-group title="分组2">
                <el-menu-item index="1-3">选项3</el-menu-item>
              </el-menu-item-group>
              <el-submenu index="1-4">
                <span slot="title">选项4</span>
                <el-menu-item index="1-4-1">选项1</el-menu-item>x
              </el-submenu> -->
        </el-submenu>
        <el-menu-item index="2">
          <i class="titleImg"><img src="../images/leftNav/web.png"/></i>
          <span slot="title">WEB</span>
        </el-menu-item>
        <el-menu-item index="3" disabled>
          <i class="el-icon-document"></i>
          <span slot="title">导航三</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-setting"></i>
          <span slot="title">导航四</span>
        </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script>
// function $(id){
//     return document.getElementById(id);
// }

// function sc1(DivId) {
//     var top =document.documentElement.scrollTop;
//     var posTop = $(DivId).offsetTop;
//     if(posTop<=200 && top>360){
//         $(DivId).style.top = (posTop)+"px";
//     }else{
//         $(DivId).style.top = (400-top)+"px";
//     }
// }

// function scall () {
//   sc1("leftNav");
// }
// window.onscroll = scall;
// window.onresize = scall;
// window.onload = scall;

export default {
  data() {
    return {
      isCollapse: true
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style scoped lang="less">
#leftNav {
  position: fixed;
  left: 15%;
  top: 400px;
}
.titleImg {
  width: 20px;
  height: 20px;
}
.titleImg img {
  width: 100%;
}
</style>
