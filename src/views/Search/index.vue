<template>
  <div>
    <form action="/">
      <van-search
        v-model="keyword"
        show-action
        background="#3296fa"
        placeholder="请输入搜索关键词"
        @focus="Takethefocus"
        @search="onSearch"
        @cancel="onCancel"
      />
    </form>
    <!-- <HistoryAll></HistoryAll>
    <ResultAll></ResultAll>
    <SuggestAll></SuggestAll> -->
    <component
      :is="commendChannels"
      :keywords="keyword"
      :historyArr="historyArr"
      @GoResult="goResult"
    ></component>
  </div>
</template>

<script>
import storage from '@/utils/storage'
import HistoryAll from './components/history.vue'
import ResultAll from './components/result.vue'
import SuggestAll from './components/suggest.vue'
export default {
  data () {
    return {
      keyword: '',
      follow: false,
      historyArr: []
    }
  },
  components: {
    HistoryAll,
    ResultAll,
    SuggestAll
  },
  computed: {
    commendChannels () {
      if (this.keyword.trim() === '') {
        return 'HistoryAll'
      }
      if (this.follow) {
        return 'SuggestAll'
      }
      return 'ResultAll'
    }
  },
  methods: {
    onSearch () {
      storage.set('historArr', [])

      this.follow = false
      this.historyArr = storage.get('historArr')
      const index = this.historyArr.indexOf(this.keyword)
      if (index !== -1) {
        this.historyArr.splice(index, 1)
      }
      this.historyArr.unshift(this.keyword)
      storage.remove('historArr')
      storage.set('historArr', this.historyArr)
      // console.log('开始搜索')
    },
    onCancel () {
      this.$router.go(-1)
    },
    Takethefocus () {
      this.follow = true
    },
    goResult (val) {
      this.keyword = val
      this.follow = false
    }
  }
}
</script>

<style lang="less" scoped>
.van-search__action {
  color: #fff;
}
</style>
