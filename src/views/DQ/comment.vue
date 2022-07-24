<template>
  <div>
    <van-nav-bar v-if="CommentArr.length === 0" class="navbar" title="暂无回复">
    </van-nav-bar>
    <van-nav-bar v-else class="navbar" :title="`${CommentArr.length}条回复`">
      <template #left>
        <van-icon name="arrow-left" @click="backToprepage" />
      </template>
    </van-nav-bar>

    <!-- 本评论 -->
    <div class="van-list">
      <div class="comment-item van-cell">
        <!-- 左头像 -->
        <div class="avatar van-image van-image--round">
          <img class="van-image__img" :src="current.aut_photo" alt="" />
        </div>
        <!-- 右文本 -->
        <div class="van-cell__title">
          <div class="title-wrap">
            <div class="user-name">{{ current.aut_name }}</div>
            <button
              class="like-btn van-button van-button--default van-button--normal"
            >
              <van-icon name="good-job-o" />
              <span class="van-button__text">赞</span>
            </button>
          </div>
          <div class="van-cell__label">
            <div>
              <p class="comment-content">{{ current.content }}</p>
              <div class="bottom-info">
                <span class="comment-pubdate">
                  {{ current.pubdate | Comitem }}</span
                >
                <button
                  class="reply-btn van-button van-button--default van-button--normal van-button--round"
                >
                  <span class="van-button__text"
                    >回复 {{ current.reply_count }}</span
                  >
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 回复 -->
    <div class="van-cella">
      <span>全部回复</span>
    </div>
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
    <!-- 底部 -->
    <div class="post-warp">
      <van-button
        @click="shoA = true"
        color="#1e2c36"
        plain
        class="bttn"
        round
        type="info"
        >评论</van-button
      >
      <van-popup
        class=""
        v-model="shoA"
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
              <span class="van-button__text" @click="setAdiscuss">发布</span>
            </div>
          </button>
        </div>
      </van-popup>
    </div>
  </div>
</template>

<script>
import dayjs from '@/utils/dayjs'
import { getDomment, setAdiscuss, getAlike, cancellike } from '@/api/index'
export default {
  props: {
    current: {
      type: Object,
      required: true
    },
    dqId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      show: true,
      shoA: false,
      number: '',
      message: '',
      CommentArr: [],
      dzArr: []
    }
  },
  created() {
    this.getDomment()
  },
  methods: {
    // 关闭弹窗
    backToprepage() {
      this.$parent.shoD = false
    },
    // 获取回复
    async getDomment() {
      console.log('评论')
      try {
        // console.log(this.dqId)
        const res = await getDomment(this.current.com_id, 'c')
        console.log(res)
        this.CommentArr = res.data.data.results
        console.log(this.CommentArr)
      } catch (e) {
        console.log('e', e)
        this.$toast.fail('获取评论失败，请刷新重试')
      }
    },
    // 对评论回复
    async setAdiscuss() {
      try {
        const res = await setAdiscuss({
          target: this.current.com_id,
          content: this.message,
          art_id: this.dqId
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
    // 回复点赞
    async Fnzhan(item) {
      // 非收藏状态点击提交收藏
      await getAlike(item.com_id)
      this.dzArr.push(item.com_id)
      console.log('回复点赞')
    },
    // 取消回复点赞
    async AFnzhan(item) {
      await cancellike(item.com_id)
      const index = this.dzArr.findIndex((item) => item.com_id === item)
      this.dzArr.splice(index, 1)
      // this.zhan = !this.zhan
      console.log('取消回复点赞')
    }
  },
  filters: {
    Comitem(item) {
      return dayjs(item).fromNow()
    }
  }
}
</script>

<style lang="less" scoped>
.navbar {
  position: relative;
  :deep(.van-nav-bar__title) {
    color: rgb(10, 10, 10);
    font-size: 0.42rem;
  }
  .van-icon {
    color: rgb(14, 13, 13);
  }
}
.post-warp {
  width: 100%;
  height: 1.33333rem;
  position: fixed;
  bottom: 0;
  border-top: 0.01333rem solid #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #1e2c36;
  background-color: #67a5cf;
}
.bttn {
  width: 600px;
}
// 评论
.van-cell {
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  box-sizing: border-box;
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
// 回复
.van-cella {
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  box-sizing: border-box;
  width: 100%;
  margin: 0.06667rem 0.0667rem;
  padding: 0.26667rem 0.2667rem;
  overflow: hidden;
  color: #323233;
  font-size: 0.37333rem;
  line-height: 0.64rem;
  background-color: #fff;
  border-bottom: 0.02667rem solid #ebedf0;
  border-top: 0.02667rem solid #ebedf0;
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
</style>
