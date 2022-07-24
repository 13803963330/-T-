<template>
  <div @click="artiicles(articleInfo)">
    <!-- 渲染无图片 -->
    <van-cell
      v-if="articleInfo.cover.type === 0"
      :label="articleDesc"
      :title="articleInfo.title"
    ></van-cell>
    <!-- 渲染单图片 -->
    <van-cell
      v-if="articleInfo.cover.type === 1"
      :label="articleDesc"
      :title="articleInfo.title"
    >
      <van-image
        width="3rem"
        height="2rem"
        :src="articleInfo.cover.images[0]"
      ></van-image>
    </van-cell>
    <!-- 渲染多图片 -->
    <van-cell v-if="articleInfo.cover.type === 3" :title="articleInfo.title">
      <template #label>
        <div>
          <van-image
            v-for="item in articleInfo.cover.images"
            :key="item"
            width="3rem"
            height="2rem"
            :src="item"
          ></van-image>
          <span>{{ articleDesc }}</span>
        </div>
      </template>
    </van-cell>
  </div>
</template>

<script>
import dayjs from '@/utils/dayjs'
export default {
  props: {
    articleInfo: {
      type: Object,
      required: true
    }
  },
  methods: {
    // 跳转文章详情
    artiicles (item) {
      console.log('跳转')
      this.$router.push(`/Dq/${this.articleInfo.art_id}`)
    }
  },
  computed: {
    articleDesc () {
      const arr = this.articleInfo
      // console.log(arr)
      const relativeTime = dayjs(arr.pubdate).fromNow()
      // console.log(relativeTime)
      return `${arr.aut_name} ${arr.comm_count}评论 ${relativeTime}`
    }
  }
}
</script>

<style></style>
