<template>
  <div>
    <img
      :src="
        $route.path === '/art'
          ? require('../images/back2.jpg')
          : $route.path === '/note'
          ? require('../images/back1.jpg')
          : require('../images/2.jpg')
      "
    />
    <!-- 分页器 -->
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="less">
img {
  width: 100%;
}
</style>
