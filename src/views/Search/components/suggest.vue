<template>
  <div>
    <van-cell
      v-for="(item, index) in highlight"
      :key="index"
      @click="GoResult(index)"
    >
      <template #icon>
        <van-icon name="search" class="search-icon"></van-icon>
      </template>
      <template #title>
        <span v-html="item"></span>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggest } from '@/api'
export default {
  data () {
    return {
      suggestions: []
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
        const res = await getSearchSuggest(this.keywords)
        console.log(res)
        if (res.data.data.options.length === 0) {
          this.$toast.fail('没有建议')
        }
        this.suggestions = res.data.data.options.filter(Boolean)
      } catch (e) {
        console.log(e)
      }
    },
    GoResult (index) {
      // this.$router.push('/result')
      this.$emit('GoResult', this.suggestions[index])
    }
  },
  computed: {
    highlight () {
      // 声明正则类，可以写变量
      const reg = new RegExp(this.keywords, 'ig')
      return this.suggestions.map((str) =>
        str.replace(reg, (match) => `<span style="color: red">${match}</span>`)
      )
    }
  }
}
</script>

<style lang="less" scoped>
.search-icon {
  padding-top: 10px;
}
</style>
