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
        <!-- 正文结束 -->
        <div
          class="van-divider van-divider--hairline van-divider--content-center"
        >
          正文结束
        </div>
        <!-- 评论 -->
        <div class="van-list" v-for="(item, index) in CommentArr" :key="index">
          <div class="comment-item van-cell">
            <!-- 左头像 -->
            <div class="avatar van-image van-image--round">
              <img class="van-image__img" :src="item.aut_photo" alt="" />
            </div>
            <!-- 右文本 -->
            <div class="van-cell__title">
              <div class="title-wrap">
                <div class="user-name">{{ item.aut_name }}</div>
                <button
                  class="like-btn van-button van-button--default van-button--normal"
                >
                  <van-icon
                    v-if="dzArr.indexOf(item.com_id) !== -1 || item.is_liking"
                    name="good-job-o"
                    color="red"
                    @click="AFnzhan(item)"
                  />
                  <van-icon v-else name="good-job-o" @click="Fnzhan(item)" />赞
                </button>
              </div>
              <div class="van-cell__label">
                <div>
                  <p class="comment-content">{{ item.content }}</p>
                  <div class="bottom-info">
                    <span class="comment-pubdate">
                      {{ item.pubdate | Comitem }}</span
                    >
                    <button
                      @click="surrent(item)"
                      class="reply-btn van-button van-button--default van-button--normal van-button--round"
                    >
                      <span class="van-button__text"
                        >回复 {{ item.reply_count }}</span
                      >
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="van-list__finished-text">没有更多了</div>
        <div class="article-bottom">
          <van-button round type="info" @click="show = true">写评论</van-button>
          <van-icon name="comment-o" :badge="CommentArr.length" />
          <!-- 评论弹窗 -->
          <van-popup
            class=""
            v-model="show"
            position="bottom"
            :style="{ height: '22%' }"
          >
            <div class="comment-post">
              <van-field
                v-model="message"
                rows="2"
                autosize
                type="textarea"
                maxlength="50"
                placeholder="请输入留言"
                show-word-limit
                class="post-field"
              />
              <button
                class="post-btn van-button van-button--default van-button--normal van-button--disabled"
              >
                <div class="van-button__content">
                  <span class="van-button__text" @click="setAdiscuss"
                    >发布</span
                  >
                </div>
              </button>
            </div>
          </van-popup>
          <van-icon v-if="!collect" name="star-o" @click="FnCllect" />
          <van-icon v-else name="star" color="orange" @click="FnCllect" />

          <van-icon v-if="!praise" name="good-job-o" @click="FnPraise" />
          <van-icon v-else name="good-job-o" color="red" @click="FnPraise" />
          <van-icon name="share-o" @click="showShare = true"> </van-icon>
          <!-- 转发弹窗 -->
          <van-share-sheet
            v-model="showShare"
            title="立即分享给好友"
            :options="options"
          />
        </div>
      </div>
    </div>
    <!-- 组件弹框 -->
    <van-popup
      class=""
      v-model="shoD"
      closeable
      close-icon-position="top-left"
      close-icon="arrow-left"
      position="bottom"
      :style="{ height: '90%' }"
    >
      <comment :current="current" :dqId="dqId"></comment>
    </van-popup>
  </div>
</template>

<script>
import comment from './comment.vue'
import dayjs from '@/utils/dayjs'
import {
  gerArticles,
  gerattention,
  gertarget,
  getCllect,
  cancelCllect,
  getPraise,
  cancelPraise,
  getComment,
  getAlike,
  cancellike,
  setAdiscuss
} from '@/api/index'

export default {
  name: 'DQ',
  components: {
    comment
  },
  data() {
    return {
      message: '',
      plId: '',
      dzArr: [], // 评论点赞数组
      dqId: '', // 文章id
      zzId: '', // 作者id
      CommentArr: [], // 评论列表
      current: '', // 拿到当前点击数据
      Dqid: {},
      Dqitem: '',
      collect: false,
      praise: false,
      attention: true,
      showShare: false,
      show: false,
      shoD: false,
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
    this.getComment()
    // this.dianz()
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
    // 点赞
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
    // 评论点赞
    async Fnzhan(item) {
      // 非收藏状态点击提交收藏
      await getAlike(item.com_id)
      this.dzArr.push(item.com_id)
      console.log('评论点赞')
    },
    // 取消评论点赞
    async AFnzhan(item) {
      await cancellike(item.com_id)
      const index = this.dzArr.findIndex((item) => item.com_id === item)
      this.dzArr.splice(index, 1)
      // this.zhan = !this.zhan
      console.log('取消评论点赞')
    },
    // 判断
    async judge() {
      // 拿取点赞、收藏的后台存储情况
      const res = await gerArticles(this.dqId)
      console.log(res)
      // 判断是否收藏
      if (res.data.data.is_collected) {
        this.collect = true
      }
      // 判断是否点赞
      if (res.data.data.attitude === 1) {
        this.praise = true
      }
      // 判断是否关注
      if (res.data.data.is_followed) {
        this.attention = false
      }
    },
    // 获取评论
    async getComment() {
      console.log('评论')
      try {
        // console.log(this.dqId)
        const res = await getComment(this.dqId, 'a')
        // console.log(res)
        this.CommentArr = res.data.data.results
        console.log(this.CommentArr)
      } catch (e) {
        console.log('e', e)
        this.$toast.fail('获取评论失败，请刷新重试')
      }
    },
    // 对文章评论
    async setAdiscuss() {
      try {
        const res = await setAdiscuss({
          target: this.dqId,
          content: this.message
        })
        this.CommentArr.unshift(res.data.data.new_obj)
        this.message = ''
        this.show = false
        console.log(res)
      } catch (e) {
        console.log('e', e)
        this.$toast.fail('发送评论失败，请刷新重试')
        this.show = false
        this.message = ''
      }
    },
    // 设置回复传参
    surrent(item) {
      this.shoD = true
      this.current = item
    }
  },
  // 处理格式
  filters: {
    Comitem(item) {
      return dayjs(item).fromNow()
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
  .van-icon-cross:before {
    content: '\e6a7';
    padding-top: 80px;
  }
  .comment-post {
    display: flex;
    align-items: center;
    padding: 0.42667rem 0 0.42667rem 0.42667rem;
    font-size: 24px;
    :deep(.post-field) {
      background-color: #f5f7f9;
      display: flex;
      position: relative;
      box-sizing: border-box;
      width: 100%;
      padding: 0.26667rem 0.42667rem;
      overflow: hidden;
      color: #323233;
      font-size: 0.37333rem;
      line-height: 0.64rem;
    }
    .post-btn {
      width: 2rem;
      border: none;
      padding: 0;
      color: #6ba3d8;
      font-size: 0.37333rem;
    }
    .van-button--disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
    :deep(.van-button) {
      position: relative;
      display: inline-block;
      box-sizing: border-box;
      height: 1.17333rem;
      margin: 0;
      padding: 0;
      font-size: 0.42667rem;
      line-height: 1.2;
      text-align: center;
      border-radius: 0.05333rem;
      cursor: pointer;
      -webkit-transition: opacity 0.2s;
      transition: opacity 0.2s;
      -webkit-appearance: none;
    }
  }

  // 评论
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
    .avatar {
      width: 0.96rem;
      height: 0.96rem;
      margin-right: 0.33333rem;
    }
    .van-image--round {
      overflow: hidden;
      border-radius: 50%;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .van-cell__title {
      -webkit-box-flex: 1;
      -webkit-flex: 1;
      flex: 1;
      .title-wrap {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .user-name {
          color: #406599;
          font-size: 0.34667rem;
        }
        .van-button--normal {
          padding: 0 0.4rem;
          font-size: 0.37333rem;
        }
        .van-button--default {
          color: #323233;
          background-color: #fff;
          border: 0.02667rem solid #ebedf0;
        }
        .van-button__content {
          display: -webkit-box;
          display: -webkit-flex;
          display: flex;
          -webkit-box-align: center;
          -webkit-align-items: center;
          align-items: center;
          -webkit-box-pack: center;
          -webkit-justify-content: center;
          justify-content: center;
          height: 100%;
        }
        .van-button__text {
          margin-left: 0.10667rem;
        }
      }
    }
    :deep(.like-btn) {
      height: 0.4rem;
      padding: 0;
      border: none !important;
      /* font-size: .25333rem; */
      /* line-height: .4rem; */
      margin-right: 0.09333rem;
    }
    .van-cell__label {
      margin-top: 0.10667rem;
      color: #969799;
      font-size: 0.32rem;
      line-height: 0.48rem;
      .comment-content {
        font-size: 0.42667rem;
        color: #222;
        word-break: break-all;
        text-align: justify;
      }
      .bottom-info {
        display: flex;
        align-items: center;
        .comment-pubdate {
          font-size: 0.25333rem;
          color: #222;
          margin-right: 0.33333rem;
        }
        .reply-btn {
          width: 1.8rem;
          height: 0.64rem;
          line-height: 0.64rem;
          font-size: 0.28rem;
          color: #222;
        }
        .van-button--default {
          color: #323233;
          background-color: #fff;
          border: 0.02667rem solid #ebedf0;
        }
        .van-button__content {
          display: -webkit-box;
          display: -webkit-flex;
          display: flex;
          -webkit-box-align: center;
          -webkit-align-items: center;
          align-items: center;
          -webkit-box-pack: center;
          -webkit-justify-content: center;
          justify-content: center;
          height: 100%;
        }
      }
    }
  }
}
.content {
  padding: 16px 16px 160px;
}
</style>
