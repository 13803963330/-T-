<template>
  <div class="login-container">
    <!-- 头部 -->
    <van-nav-bar class="navbar" title="登陆" @click-left="backToprepage">
      <template #left>
        <van-icon name="cross" />
      </template>
    </van-nav-bar>
    <!-- 表单 -->
    <van-form @submit="login" class="form">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="[{ required: true, message: '请输入手机号' }]"
      >
        <template #label>
          <span class="iconfont icon-shouji"></span>
        </template>
      </van-field>
      <van-field
        v-model="code"
        type="code"
        name="code"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      >
        <template #label>
          <span class="iconfont icon-yanzhengma"></span>
        </template>
        <template #right-icon>
          <van-button class="code-btn" size="small" round
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
    <!-- 登陆 -->
  </div>
</template>

<script>
// import { Toast } from 'vant'

import { login } from '../../api/user'

export default {
  name: 'LoginPage',
  components: {},
  props: {},
  data () {
    return {
      mobile: '',
      code: ''
    }
  },
  methods: {
    // 返回之前的页面
    backToprepage () {
      this.$router.back()
    },
    async login () {
      const res = await login(this.mobile, this.code)
      console.log(res)
    }
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
