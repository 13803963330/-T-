<template>
  <div class="login-container">
    <!-- 头部 -->
    <van-nav-bar class="navbar" title="登陆" @click-left="backToprepage">
      <template #left>
        <van-icon name="cross" />
      </template>
    </van-nav-bar>
    <!-- 表单 -->
    <van-form ref="form" @submit="login" class="form">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="mobileRules"
      >
        <template #label>
          <span class="iconfont icon-shouji"></span>
        </template>
      </van-field>
      <van-field
        v-model="code"
        type="code"
        name="code"
        placeholder="验证码"
        :rules="codeRules"
      >
        <template #label>
          <span class="iconfont icon-yanzhengma"></span>
        </template>
        <template #right-icon>
          <van-count-down
            v-if="isShowCountDown"
            :time="3000"
            @finish="isShowCountDown = false"
          />
          <van-button
            v-else
            class="code-btn"
            size="small"
            round
            @click.prevent="sendCode"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
    <!-- 登陆 -->
    <!-- <h1>{{ $store.state.Number }}</h1>
    <button @click="increment">点加一</button> -->
  </div>
</template>

<script>
// import { Toast } from 'vant'
import { mobileRules, codeRules } from './rules'
import { login, SendCode } from '../../api/user'

export default {
  name: 'LoginPage',
  components: {},
  props: {},
  data () {
    return {
      mobile: '',
      code: '',
      codeRules,
      mobileRules,
      isShowCountDown: ''
    }
  },
  methods: {
    // 返回之前的页面
    backToprepage () {
      this.$router.back()
    },
    async login () {
      this.$toast.loading({
        message: '不要着急，加载中---',
        forbidClick: true
      })
      // 登陆--------------
      try {
        const res = await login(this.mobile, this.code)
        // console.log(res)
        // 存储token
        this.$store.commit('setUser', res.data.data)
        this.$toast.success('呦吼~登陆成功')
        this.$router.push('/')
      } catch (e) {
        const status = e.response.status
        let message = '登陆错误，请刷新再试'
        if (status === 400) {
          message = e.response.data.message
        }
        this.$toast.fail(message)
        // switch (status) {
        //   case 400:
        //     this.$toast.fail(e.response.data.message)
        //     break
        //   case 507:
        //     this.$toast.fail('登陆错误，请刷新再试')
        //     break

        //   default:
        //     this.$toast.fail('登陆错误，请刷新再试')
        //     break
        // }
        console.log(e.response.data.message)
        console.log(e.response.status)
      }
    },
    // 验证码 -------------
    async sendCode () {
      try {
        await this.$refs.form.validate('mobile')
        // 发送验证码
        await SendCode(this.mobile)
        this.isShowCountDown = true
      } catch (e) {
        // 表单校验失败
        if (!e.response) {
          this.$toast.fail('手机号非法')
        } else {
          // 状态码
          const status = e.response.status
          if (status === 404 || status === 429) {
            this.$toast.fail(e.response.data.message)
          }
        }
        console.log(e)
      }
    }
    // increment () {
    //   this.$store.commit('setNumeber', 1)
    // }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {}
}
</script>

<style scoped lang="less">
.navbar {
  background-color: #6aa6e2;
  :deep(.van-nav-bar__title) {
    color: #fff;
  }
  .van-icon {
    color: #fff;
  }
}
.form {
  :deep(.van-field__label) {
    flex: 1;
  }
  :deep(.van-field__value) {
    flex: 20;
  }
  .icon-shouji:before {
    font-size: 0.49333rem;
  }
  .icon-yanzhengma:before {
    font-size: 0.49333rem;
  }
  .code-btn {
    background-color: #eee;
    padding: 0 10px;
    color: #666;
  }
}
</style>
