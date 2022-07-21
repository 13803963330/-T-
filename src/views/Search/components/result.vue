<template>
  <div>
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
      <van-cell-group>
        <van-cell
          v-for="(item, index) in resultArr"
          :key="index"
          :title="item.title"
        />
      </van-cell-group>
    </van-list>
  </div>
</template>

<script>
import { getSearchResult } from '@/api'
export default {
  data () {
    return {
      resultArr: [],
      loading: false,
      finished: false,
      error: false,
      refreshLoading: false,
      page: 1
    }
  },
  props: {
    keywords: {
      type: String,
      required: true
    }
  },
  watch: {
    // 监视数据的首次及后续变化
    keywords: {
      immediate: true,
      handler () {
        this.getSearchSuggest()
      }
    }
  },
  methods: {
    async getSearchSuggest () {
      try {
        const res = await getSearchResult(this.keywords, this.page, 30)
        console.log(res)
        if (res.data.data.results.length === 0) {
          return this.$toast.fail('没有结果')
        }
        // 筛掉假值
        this.resultArr = res.data.data.results
        console.log(this.resultArr)
      } catch (e) {
        console.log(e)
      }
    },
    async loadNextPage () {
      try {
        // 滚动条触底加载下一页数据
        const { data } = await getSearchResult(this.keywords, this.page)
        console.log(data)
        // 判断底部加载
        if (!data.data.page) {
          this.finished = true
        }
        this.loading = false
        if (this.refreshLoading) {
          this.resultArr.unshift(...data.data.results)
        } else {
          // 结构后添加防止二级数组
          this.resultArr.push(...data.data.results)
        }
        // 更新页数防止后续加载重复数据key报错
        this.page = data.data.page + 1
      } catch (error) {
        this.error = true
        // console.log(this.error)
      } finally {
        this.loading = false
        this.refreshLoading = false
      }
    }
  }
}
</script>

<style lang="less" scoped></style>
