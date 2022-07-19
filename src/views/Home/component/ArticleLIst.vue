<template>
  <div>
    <van-pull-refresh
      v-model="refreshLoading"
      @refresh="loadNextPage"
      success-text="刷新成功"
    >
      <van-list
        @load="loadNextPage"
        v-model="loading"
        :finished="finished"
        :error.sync="error"
        error-text="出错了，请重新加载~"
        finished-text="没有更多了"
        loading-text="加载中"
        offset="0"
      >
        <ArticleItem
          v-for="item in articles"
          :key="item.art_id"
          :articleInfo="item"
        ></ArticleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { gerArticle } from '@/api'
import ArticleItem from './ArticleItem.vue'
export default {
  components: {
    ArticleItem
  },
  data () {
    return {
      articles: [],
      pre_timestamp: '',
      loading: false,
      finished: false,
      error: true,
      refreshLoading: false
    }
  },
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  created () {
    this.gerArticle()
  },
  methods: {
    async gerArticle () {
      try {
        const { data } = await gerArticle(this.id, +new Date())
        console.log(data)
        // 保存第一次页码
        this.pre_timestamp = data.data.pre_timestamp
        this.articles = data.data.results
      } catch (e) {
        const status = e.response.status
        if (status === 400) {
          throw new Error(e.response.data.message)
        } else {
          this.$toast.fail('获取文章列表失败')
        }
      }
    },
    async loadNextPage () {
      try {
        if (Math.random() < 0.7) {
          // console.log(Math.random())
          throw new Error('错误')
        }
        // 滚动条触底加载下一页数据
        const { data } = await gerArticle(this.id, +this.pre_timestamp)
        // 判断底部加载
        if (!data.data.pre_timestamp) {
          this.finished = true
        }
        this.loading = false
        if (this.refreshLoading) {
          this.articles.unshift(...data.data.results)
        } else {
          // 结构后添加防止二级数组
          this.articles.push(...data.data.results)
        }
        // 更新页数防止后续加载重复数据key报错
        this.pre_timestamp = data.data.pre_timestamp
      } catch (error) {
        this.error = true
      } finally {
        this.loading = false
        this.refreshLoading = false
      }
    }
  }
}
</script>

<style></style>
