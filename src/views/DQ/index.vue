<template>
  <div class="Box">
    <!-- 头部 -->
    <van-nav-bar class="navbar" title="黑马头条">
      <template #left>
        <van-icon name="arrow-left" @click="backToprepage" />
      </template>
    </van-nav-bar>
    <!--  -->
    <div class="main-wrap">
      <!-- 标题栏 -->
      <div>
        <h1 class="article-title">
          {{ Dqid.title }}
        </h1>
        <div class="user-info van-cell van-cell--center van-cell--borderless">
          <div class="avatar van-image van-image--round">
            <img
              src="http://toutiao.itheima.net/images/user_head.jpg"
              alt=""
              class="van-image__img"
            />
          </div>
          <div class="van-cell__title">
            <div class="user-name">黑马程序员(小吴)</div>
            <div class="van-cell__label">{{ Dqitem }}</div>
          </div>
          <div class="van-cell__value">
            <van-button v-if="attention" round type="info" @click="gerattention"
              >+ 关注</van-button
            >
            <van-button v-else round type="info" @click="gerattention"
              >已关注</van-button
            >
          </div>
        </div>
        <div class="article-content">
          <article
            class="markdown-body"
            style="text-align: left"
            v-html="Dqid.content"
          ></article>
        </div>
        <!-- 最后 -->
        <div
          class="van-divider van-divider--hairline van-divider--content-center"
        >
          正文结束
        </div>
        <!-- 没有更多 -->
        <div class="van-list__finished-text">没有更多了</div>
        <div class="article-bottom">
          <van-button round type="info">写评论</van-button>
          <van-icon name="comment-o" badge="6" />

          <van-icon v-if="!collect" name="star-o" @click="FnCllect" />
          <van-icon v-else name="star" color="orange" @click="FnCllect" />

          <van-icon v-if="!praise" name="good-job-o" @click="FnPraise" />
          <van-icon v-else name="good-job-o" color="red" @click="FnPraise" />
          <van-icon name="share-o" @click="showShare = true"> </van-icon>
          <van-share-sheet
            v-model="showShare"
            title="立即分享给好友"
            :options="options"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from '@/utils/dayjs'
import {
  gerArticles,
  gerattention,
  gertarget,
  getCllect,
  cancelCllect,
  getPraise,
  cancelPraise
} from '@/api/index'

export default {
  data() {
    return {
      dqId: '', // 文章id
      zzId: '', // 作者id
      Dqid: {},
      Dqitem: '',
      collect: false,
      praise: false,
      attention: true,
      showShare: false,
      options: [
        [
          { name: '微信', icon: 'wechat' },
          { name: '朋友圈', icon: 'wechat-moments' },
          { name: '微博', icon: 'weibo' },
          { name: 'QQ', icon: 'qq' }
        ],
        [
          { name: '复制链接', icon: 'link' },
          { name: '分享海报', icon: 'poster' },
          { name: '二维码', icon: 'qrcode' },
          { name: '小程序码', icon: 'weapp-qrcode' }
        ]
      ]
    }
  },
  created() {
    this.take()
    this.gerArticles()
    this.judge()
  },
  methods: {
    // 返回之前的页面
    backToprepage() {
      this.$router.back()
    },
    // 拿到当前文章id
    take() {
      this.dqId = this.$router.currentRoute.params.id
      console.log(this.dqId)
    },
    // 获取信息
    async gerArticles() {
      try {
        // console.log(this.dqId)
        const res = await gerArticles(this.dqId)
        this.zzId = res.data.data.aut_id
        this.Dqid = res.data.data
        this.Dqitem = dayjs(this.Dqid.pubdate).fromNow()
        // console.log(this.Dqid)
      } catch (e) {
        console.log('e', e)
        this.$toast.fail('获取文章失败，请刷新重试')
      }
    },
    // 关注取消关注的请求
    async gerattention() {
      try {
        // 存
        if (this.attention) {
          const res = await gerattention(this.zzId)
          // console.log(res)
          this.attentionArr = res.data.data.target
          this.attention = !this.attention
          // console.log('存')
        } else {
          // 删除
          await gertarget(this.zzId)
          this.attention = !this.attention
          // console.log('删')
        }
      } catch (e) {
        console.log('e', e)
        // this.$toast.fail('获取关注失败，请刷新重试')
      }
    },
    // 收藏
    async FnCllect() {
      // 非收藏状态点击提交收藏
      if (!this.collect) {
        const res = await getCllect(this.dqId)
        console.log(res)
        this.collect = !this.collect
        console.log('收藏')
      } else {
        await cancelCllect(this.dqId)
        this.collect = !this.collect
        console.log('取消收藏')
      }
    },
    async FnPraise() {
      // 非收藏状态点击提交收藏
      if (!this.praise) {
        const res = await getPraise(this.dqId)
        console.log(res)
        this.praise = !this.praise
        console.log('点赞')
      } else {
        await cancelPraise(this.dqId)
        this.praise = !this.praise
        console.log('取消点赞')
      }
    },
    // 判断
    async judge() {
      // 拿取点赞、收藏的后台存储情况
      const res = await gerArticles(this.dqId)
      console.log(res)
      // 判断是否收藏
      if (res.data.data.is_collected) {
        this.collect = true
      } else {
        console.log('是否收藏执行错误')
      }
      // 判断是否点赞
      if (res.data.data.attitude === 1) {
        this.praise = true
      } else {
        console.log('是否点赞执行错误')
      }
      // 判断是否关注
      if (res.data.data.is_followed) {
        this.attention = false
      } else {
        console.log('是否点赞执行错误')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.Box {
  display: block;
  .navbar {
    background-color: #3296fa;
    position: relative;
    :deep(.van-nav-bar__title) {
      color: #fff;
      font-size: 0.42rem;
    }
    .van-icon {
      color: #fff;
    }
  }
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 1.22667rem;
    bottom: 1.17333rem;
    overflow-y: scroll;
    background-color: #fff;
    .article-title {
      font-size: 0.53333rem;
      padding: 0.66667rem 0.42667rem;
      margin: 0;
      color: #3a3a3a;
    }
    .user-info {
      padding: 0 0.42667rem;
      .avatar {
        width: 0.93333rem;
        height: 0.93333rem;
        margin-right: 0.22667rem;
      }
      .van-image--round {
        overflow: hidden;
        border-radius: 50%;
      }
      .van-image {
        position: relative;
        display: inline-block;
        img {
          object-fit: cover;
          border-radius: inherit;
          display: block;
          width: 100%;
          height: 100%;
        }
      }
      .van-cell__title {
        -webkit-box-flex: 1;
        -webkit-flex: 1;
        flex: 1;
      }
      .user-name {
        font-size: 0.32rem;
        color: #3a3a3a;
      }
      .van-cell__label {
        margin-top: 0;
        color: #969799;
        font-size: 0.32rem;
        line-height: 0.48rem;
      }
      .van-cell__value {
        position: relative;
        overflow: hidden;
        color: #969799;
        text-align: right;
        vertical-align: middle;
        word-wrap: break-word;
      }
      .van-button {
        height: 0.7333rem;
      }
    }
    .van-cell--center {
      -webkit-box-align: center;
      -webkit-align-items: center;
      align-items: center;
    }
    .van-cell {
      position: relative;
      display: -webkit-box;
      display: -webkit-flex;
      display: flex;
      box-sizing: border-box;
      width: 100%;
      padding: 0.26667rem 0.42667rem;
      overflow: hidden;
      color: #323233;
      font-size: 0.37333rem;
      line-height: 0.64rem;
      background-color: #fff;
    }
    // 内容板块
    .article-content {
      padding: 0.73333rem 0.42667rem;
      color: #24292e;
      font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial,
        sans-serif, Apple Color Emoji, Segoe UI Emoji;
      font-size: 0.21333rem;
      line-height: 1.5;
      word-wrap: break-word;
    }
    // 结束板块
    .van-divider {
      display: -webkit-box;
      display: -webkit-flex;
      display: flex;
      -webkit-box-align: center;
      -webkit-align-items: center;
      align-items: center;
      margin: 0.42667rem 0;
      color: #969799;
      font-size: 0.37333rem;
      line-height: 0.64rem;
      border-color: #ebedf0;
      border-style: solid;
      border-width: 0;
    }
    .van-list__loading {
      color: #969799;
      font-size: 0.37333rem;
      line-height: 1.33333rem;
      text-align: center;
    }
    // 底部板块

    .article-bottom {
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      justify-content: space-around;
      align-items: center;
      box-sizing: border-box;
      height: 1.17333rem;
      border-top: 0.01333rem solid #d8d8d8;
      background-color: #fff;
      .van-button--round {
        width: 3.76rem;
        height: 0.61333rem;
        background-color: #fff;
        border: 0.02667rem solid #eee;
        font-size: 0.4rem;
        line-height: 0.61333rem;
        color: #a7a7a7;
      }
      .van-icon {
        color: rgb(119, 119, 119);
        font-size: 0.53333rem;
      }
    }
  }
}
</style>
