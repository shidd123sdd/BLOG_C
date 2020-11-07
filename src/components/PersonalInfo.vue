<template>
  <div class="persionalInfo data_info">
    <div>
      <div class="selfimg"><img src="../images/toux.jpg" /></div>
      <div class="desc">努力成为大佬的小白</div>
      <div class="imgs">
        <div class="imgbox"><img src="../images/qq.svg" /></div>
        <div class="imgbox"><img src="../images/wechat.svg" /></div>
        <div class="imgbox"><img src="../images/github.svg" /></div>
        <div class="clear"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PersonalInfo"
};
</script>

<style scoped lang="less">
.persionalInfo {
  width: 250px;
  text-align: center;
  background-color: white;
}
.desc {
  padding-left: 0;
  font-size: 20px;
  width: 100%;
  color: rgb(45, 139, 202);
  padding-bottom: 20px;
}
.selfimg {
  padding-top: 40px;
  width: 120px;
  height: 120px;
  margin: 20px auto;
}
.selfimg img {
  width: 100%;
}

.imgs {
  display: inline-block;
  text-align: center;
}

.imgs .imgbox {
  width: 30px;
  float: left;
  margin: 20px 20px;
}

.imgs .imgbox img {
  width: 100%;
}
</style>
