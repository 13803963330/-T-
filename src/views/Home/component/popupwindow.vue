<template>
  <van-popup
    v-model="isShow"
    position="bottom"
    :style="{ height: '95%' }"
    closeable
    round
    close-icon-position="top-left"
  >
    <!-- 弹出层内容 -->
    <div class="popup-main" v-show="isShow">
      <!-- 我的频道 -->
      <div class="my-channel">
        <van-cell title="我的频道">
          <van-button size="small" round class="edit-btn" @click="bac">{{
            isEdit ? '完成' : '编辑'
          }}</van-button>
        </van-cell>
        <!-- 我的频道内容 -->
        <van-grid :border="false" gutter="10px">
          <van-grid-item
            v-for="(item, index) in myChannels"
            :key="item.id"
            :text="item.name"
            :class="{ 'active-channel': item.name === '推荐' }"
            @click="onClickMyChannel(item, index)"
          >
            <template #icon>
              <van-icon
                name="close"
                v-show="isEdit && item.name !== '推荐'"
              ></van-icon>
            </template>
          </van-grid-item>
        </van-grid>
      </div>
      <!-- 推荐频道 -->
      <div class="recommend-channel">
        <van-cell title="推荐频道"></van-cell>
        <van-grid :border="false" gutter="10px">
          <van-grid-item
            v-for="item in commendChannels"
            :key="item.id"
            :text="item.name"
            icon="plus"
            @click="addMyChannel(item)"
          ></van-grid-item
        ></van-grid>
      </div>
    </div>
  </van-popup>
</template>

<script>
import { getAllChannels } from '@/api/index'
export default {
  name: 'EditChannelPopup',
  props: {
    myChannels: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      isShow: false,
      allChannels: [],
      isEdit: false
      // commendChannels: []
    }
  },

  mounted () {},
  created () {
    this.getAllChannels()
  },
  methods: {
    // 删除---&---添加
    onClickMyChannel (channel, index) {
      // 删除频道
      if (this.isEdit && channel.name !== '推荐') {
        this.$emit('del-myChanel', channel.id)
      }
      // 点击跳转频道
      if (!this.isEdit) {
        this.isShow = false
        this.$emit('change-active', index)
      }
    },
    // 添加频道
    addMyChannel (myChannel) {
      this.$emit('add-myChannel', { ...myChannel })
    },
    // 切换功能
    bac () {
      this.isEdit = !this.isEdit
    },
    async getAllChannels () {
      const { data } = await getAllChannels()
      this.allChannels = data.data.channels
      console.log(this.allChannels)
    }
  },
  computed: {
    // 筛选频道
    commendChannels () {
      return this.allChannels.filter((item) => {
        return !this.myChannels.find((i) => i.id === item.id)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.active-channel {
  :deep(.van-grid-item__text) {
    color: #f68c8c;
  }
}
.popup-main {
  padding-top: 100px;
  .van-cell {
    font-size: 32px;
    color: #333;
  }
  .edit-btn {
    color: #f68c8c;
    padding: 0 30px;
    font-size: 28px;
    height: 48px;
    border: 1px solid #f68c8c;
  }
  :deep(.van-grid-item__content) {
    background-color: #f4f5f6;
  }
  .my-channel {
    :deep(.van-grid-item__content) {
      position: relative;

      .van-grid-item__icon-wrapper {
        position: absolute;
        top: 0;
        right: 0;

        .van-icon-close {
          position: absolute;
          top: 0;
          right: 0;
          transform: translate(20%, -35%);
          border: 0.02667rem solid #000;
          border-radius: 50%;
          text-align: center;
          line-height: 0.38rem;
          font-size: 28px;
        }
      }
    }
  }
  // 推荐频道的样式
  .recommend-channel {
    // 推荐频道加号样式
    height: 40px;

    :deep(.van-grid-item__content) {
      flex-direction: row;
      height: 80px;
      .van-grid-item__icon {
        font-size: 0.5rem;
      }

      .van-grid-item__text {
        margin-top: 0;
      }
    }
  }
}
</style>
