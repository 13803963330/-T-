<template>
  <div>
    <van-nav-bar class="navbar">
      <template #title>
        <van-button round @click="$router.push('/search')">
          <van-icon name="search">搜索</van-icon>
        </van-button>
      </template>
    </van-nav-bar>

    <!-- 选项卡 -->
    <van-tabs v-model="active" swipeable>
      <van-tab v-for="item in myChannels" :key="item.id" :title="item.name">
        <ArticleList :id="item.id"> </ArticleList>
      </van-tab>
      <!-- 更多按钮 -->
      <span class="iconfont icon-gengduo" @click="showPopup"></span>
    </van-tabs>
    <!-- 弹框 -->
    <PopuPwindow
      ref="popup"
      :myChannels="myChannels"
      @del-myChanel="myChannell"
      @change-active="changeActive"
      @add-myChannel="addMyChannel"
    ></PopuPwindow>
  </div>
</template>

<script>
import {
  getMyChannels,
  getChannelsBy,
  setChannelsTo,
  delMyChannel,
  addMyChannells
} from '@/api/channel'
import PopuPwindow from './component/popupwindow.vue'
import ArticleList from './component/ArticleLIst.vue'
export default {
  name: 'Home',
  components: {
    ArticleList,
    PopuPwindow
  },
  coputed: {
    isLogin () {
      return !!this.$store.state.user.token
    }
  },
  data () {
    return {
      myChannels: [],
      active: 0
    }
  },
  created () {
    this.getMyChannels()
  },
  methods: {
    // 获取频道(------------需存储)
    async getMyChannels () {
      try {
        // 未登录状态
        if (!this.isLogin) {
          const myChannels = getChannelsBy()
          // 本地有数据
          if (myChannels) {
            console.log(11)
            this.myChannels = myChannels
          } else {
            // 本地没数据
            const { data } = await getMyChannels()
            console.log(data)
            this.myChannels = data.data.channels
          }
        } else {
          //
        }
      } catch (e) {
        this.$toast.fail('请重新获取列表')
      }
    },
    // 显示弹出层
    showPopup () {
      this.$refs.popup.isShow = true
    },
    // 删除频道(------------需存储)
    async myChannell (id) {
      console.log(id)
      this.myChannels = this.myChannels.filter((item) => item.id !== id)
      if (!this.isLogin) {
        setChannelsTo(this.myChannels)
      } else {
        // 发送请求
        try {
          await delMyChannel(id)
        } catch (error) {
          this.$toast.fail('删除用户信息失败')
        }
      }
      this.$toast.fail('删除用户信息成功')
    },
    // 更改频道
    changeActive (active) {
      this.active = active
    },
    // 添加频道(------------需存储)
    async addMyChannel (channel) {
      this.myChannels.push(channel)
      if (!this.isLogin) {
        setChannelsTo(this.myChannels)
      } else {
        try {
          await addMyChannells(channel.id, this.myChannels.length)
        } catch (error) {
          return this.$toast.fail('添加频道失败')
        }
      }
      this.$toast.success('添加频道成功')
    }
  }
}
</script>

<style lang="less" scoped>
.navbar {
  background-color: #3296fa;
  color: #fff;
  .van-button {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
  }
  :deep(.van-nav-bar__title) {
    max-width: unset;
  }
  .van-button__text {
    color: #fff;
  }
  .van-icon-search {
    color: #fff;
  }
  .van-button--default {
    border: 0.02667rem solid #5babfb;
  }
}
// 头部固定的样式
.navbar {
  position: sticky;
  top: 0;
  left: 0;
}
:deep(.van-tabs__wrap) {
  position: sticky;
  top: 92px;
  left: 0;
  z-index: 99;
}
.toutiao-gengduo {
  position: fixed;
  top: 92px;
}

:deep(.van-tabs__content) {
  max-height: calc(100vh - 92px - 82px - 100px);
  overflow: auto;
}
//tabs选项卡
:deep(.van-tabs__wrap) {
  padding-right: 66px;

  .van-tabs__nav {
    padding-left: 0;
    padding-right: 0;

    /* tab标签 */
    .van-tab {
      border: 1px solid #eee;
      width: 200px;
      height: 82px;
    }

    /* tab标签下划线 */
    .van-tabs__line {
      width: 31px;
      height: 6px;
      background-color: #3296fa;
      bottom: 40px;
    }
  }
}

/* 字体图标 */
.icon-gengduo {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 100;
  width: 66px;
  height: 82px;
  font-size: 40px;
  line-height: 82px;
  text-align: center;
  opacity: 0.6;
  border-bottom: 1px solid #eee;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 70%;
    width: 1px;
    background-image: url('~@/assets/images/gradient-gray-line.png');
  }
}
</style>
