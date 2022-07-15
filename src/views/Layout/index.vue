<template>
  <div>
    布局页面
    <router-view></router-view>
    <span class="iconfont icon-wenda"></span>
    <!-- 导航 -->
    <van-tabbar route v-model="active" class="foot">
      <van-tabbar-item to="/layout/home">
        <template #icon>
          <span class="iconfont icon-shouye"></span>
        </template>
        首页
      </van-tabbar-item>
      <van-tabbar-item to="/layout/video">
        <template #icon>
          <span class="iconfont icon-shipin"></span>
        </template>
        视频
      </van-tabbar-item>
      <van-tabbar-item to="/layout/qa">
        <template #icon>
          <span class="iconfont icon-wenda"></span>
        </template>
        问答
      </van-tabbar-item>
      <van-tabbar-item to="/layout/my">
        <template #icon>
          <span class="iconfont icon-wode"></span>
        </template>
        我的
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'Layout',
  data () {
    return {
      active: ''
    }
  }
}
</script>

<style scoped lang="less">
.foot {
  :deep(.van-tabbar-item) {
    font-size: 0.4rem;
    .iconfont {
      font-size: 0.45rem;
    }
  }
}
</style>
