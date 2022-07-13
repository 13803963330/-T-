<template>
  <div id="app">
    <meta name="referrer" content="no-referrer" />
    <!-- <router-view /> -->
    <!-- <h1>黑马头条</h1>
    <i class="iconfont icon-guanbi"></i>
    <van-cell is-link @click="showPopup">展示弹出层</van-cell>
    <van-popup v-model="show"
      ><img
        src="https://p2.ssl.qhimgs1.com/sdr/400__/t01cdc975b80a95bb18.jpg"
        alt=""
    /></van-popup>
    <div class="ii"></div> -->
    <!-- // 一级路由窗口 -->
    <div>
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      show: false
    }
  },

  methods: {
    showPopup () {
      this.show = true
    }
  }
}
</script>

<style scoped lang="less">
.ii {
  width: 694px;
  height: 88px;
  border-radius: 10px;
}
</style>
