<template>
  <div>
    <van-cell-group>
      <van-cell title="搜索历史">
        <template #default>
          <i
            v-if="isEdit"
            @click="isEdit = false"
            class="iconfont icon-shanchu"
          ></i>
          <div v-else>
            <span @click="dell">全部删除</span>
            <span @click="isEdit = !isEdit">完成</span>
          </div>
        </template>
      </van-cell>
      <!-- 历史记录 -->
      <van-cell
        v-for="(item, index) in historArr"
        :key="index"
        :title="item"
        @click="GoResult(item)"
      >
        <template #default>
          <i
            v-if="!isEdit"
            @click="delOne(item)"
            class="iconfont icon-guanbi"
          ></i>
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import storage from '@/utils/storage'
export default {
  data () {
    return {
      historArr: [],
      historBrr: [],
      isEdit: true
    }
  },
  created () {
    this.onSearch()
  },
  methods: {
    onSearch () {
      this.historArr = storage.get('historArr')
      console.log(this.historArr)
    },
    // 清除
    dell () {
      storage.remove('historArr')
      this.historArr = storage.get('historArr')
      this.isEdit = !this.isEdit
    },
    delOne (val) {
      const index = this.historArr.findIndex((item) => val === item)
      this.historArr.splice(index, 1)
    },
    // 跳转结果页
    GoResult (item) {
      // this.$router.push('/result')
      this.$emit('GoResult', item)
    }
  },
  watch: {
    historArr (val) {
      storage.set('historArr', val)
    }
  }
}
</script>

<style lang="less" scoped>
.iconfont {
  font-size: 0.4rem !important;
}
</style>
