<template>
  <div class="my">
    <header>
      <!-- 登陆时显示的盒子 -->
      <div v-if="isLogin" class="banner user-info">
        <van-row></van-row>
        <!--  -->
        <van-row class="row-2">
          <van-col span="12">
            <van-row type="flex" align="center" justify="space-around">
              <van-image
                round
                width="1.76rem"
                height="1.76rem"
                src="userInfo.photo"
              />
              <span class="mobile">{{ userInfo.name }}</span>
            </van-row>
          </van-col>
          <van-col span="11">
            <van-row type="flex" align="center" justify="end" class="code-row">
              <van-button class="code-btn" size="mini" round
                >编辑资料</van-button
              >
            </van-row>
          </van-col>
        </van-row>
        <!--  -->
        <van-row>
          <van-grid class="grid" :border="false">
            <van-grid-item text="头条">
              <template #icon>{{ userInfo.art_count }}</template>
            </van-grid-item>
            <van-grid-item text="粉丝">
              <template #icon>{{ userInfo.fans_count }}</template>
            </van-grid-item>
            <van-grid-item text="关注">
              <template #icon>{{ userInfo.follow_count }}</template>
            </van-grid-item>
            <van-grid-item text="获赞">
              <template #icon>{{ userInfo.like_count }}</template>
            </van-grid-item>
          </van-grid>
        </van-row>
      </div>
      <!-- 未登陆时显示的盒子 -->
      <div v-else class="banner login-register">
        <div class="wrap" @click="Onno">
          <img src="../../assets/images/mobile.png" alt="" />
          <span>登陆/注册</span>
        </div>
      </div>
    </header>
    <!-- // 主体 -->
    <main>
      <div>
        <van-grid :column-num="2" class="grid" clickable>
          <van-grid-item text="收藏" @click="Onno">
            <template #icon>
              <i class="iconfont icon-shoucang"></i>
            </template>
          </van-grid-item>
          <van-grid-item text="历史" @click="Onno">
            <template #icon>
              <i class="iconfont icon-lishi"></i>
            </template>
          </van-grid-item>
        </van-grid>
      </div>
      <!-- 消息通知小智 -->
      <div class="link">
        <van-cell title="消息通知" is-link />
        <van-cell title="小智同学" is-link />
      </div>
    </main>
    <!-- 退出按钮 -->
    <van-button v-if="isLogin" block class="login-btn" @click="logout"
      >退出按钮</van-button
    >
  </div>
</template>

<script>
import { getUserInfo } from '@/api'
export default {
  data () {
    return {
      userInfo: {}
    }
  },
  methods: {
    logout () {
      this.$dialog
        .confirm({
          title: '嘿吴龙',
          message: '是否确认该账户'
        })
        .then(() => {
          // on confirm
          this.$store.commit('setUser', {})
        })
        .catch(() => {
          // on cancel
        })
    },
    Onno () {
      this.$router.push('/login')
    },
    // 获取用户信息------------------------------
    async getUserInfo () {
      if (this.isLogin) {
        try {
          const {
            data: { data }
          } = await getUserInfo()
          this.userInfo = data
          console.log('a', this.userInfo)
        } catch (e) {
          this.$toast.fail('请重新登陆')
        }
      }
      // const res = await getUserInfo()
      // console.log(res)
    }
  },
  computed: {
    // 判断是否登陆
    isLogin () {
      return !!this.$store.state.user.token
    }
  },
  created () {
    this.getUserInfo()
  }
}
</script>

<style lang="less" scoped>
.banner {
  width: 100%;
  height: 400px;
  background: url(../../assets/images/banner.png) no-repeat 0 0 / cover;
}
.user-info {
  display: flex;
  flex-direction: column;
  > .van-row {
    flex: 1;
  }
  .row-2 {
    .van-col {
      height: 100%;
    }
  }
  .mobile {
    font-size: 0.4rem;
  }
  .code-btn {
    width: 1.53333rem;
    height: 0.42667rem;
    background: #fff;
    border-radius: 0.21333rem;
    font-size: 0.26667rem;
    color: #666;
    padding: 0;
  }
  .code-row {
    height: 100%;
  }
  .grid {
    :deep(.van-grid-item__content) {
      background-color: unset;
    }
  }
  .van-grid-item {
    font-size: 0.5rem;
    color: #fff;
    :deep(.van-grid-item__text) {
      color: #fff;
    }
  }
}
// 主体区域
main {
  .grid {
    color: #646566;
    // 字体图标
    .iconfont {
      font-size: 0.6rem;

      &.icon-shoucang {
        color: #ffb31d;
      }
      &.icon-lishi {
        color: #ed5253;
      }
    }
  }
  .link {
    margin-top: 10px;
  }
}
.login-btn {
  color: red;
  margin-top: 10px !important;
  .van-button--default {
    color: red;
  }
}
.my {
  background-color: #f5f7f9;
  height: calc(100vh - 100px);
}
.login-register {
  display: flex;
  justify-content: center;
  align-items: center;
  .wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #fff;
    img {
      margin-bottom: 10px;
      width: 150px;
    }
  }
}
</style>
