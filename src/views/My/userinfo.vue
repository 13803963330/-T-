<template>
  <div>
    <!-- 标题 -->
    <van-nav-bar
      class="navbar"
      title="个人信息"
      left-text="返回"
      right-text="保存"
      left-arrow
      @click-left="backToprepage"
      @click-right="onClickRight"
    />
    <!-- 头像 -->
    <input type="file" ref="file" hidden accept=".png,.jpg" />
    <van-cell class="calssa" title="头像" is-link @click="$refs.file.click()">
      <van-image
        width="40"
        height="40"
        round
        src="https://img01.yzcdn.cn/vant/cat.jpeg"
      />
    </van-cell>
    <!-- 弹出层 -->
    <van-popup v-model="show">
      <UpdatePhoto
        :photo="photo"
        v-if="show1"
        @confirm="confirm"
        @noConfirm="noConfirm"
      ></UpdatePhoto>
    </van-popup>

    <!-- 昵称 -->
    <van-cell is-link title="昵称" :value="message" @click="Bshow = true">
      <template #default>{{ message }} </template>
    </van-cell>
    <van-popup v-model="Bshow" position="bottom" :style="{ height: '90%' }">
      <van-nav-bar
        title="标题"
        left-text="返回"
        right-text="确认"
        left-arrow
        @click-left="BonClickLeft"
        @click-right="BonClickRight"
      />
      <van-field
        v-model="message"
        rows="1"
        autosize
        type="textarea"
        maxlength="7"
        placeholder="请输入新的昵称"
        show-word-limit
      />
    </van-popup>
    <!-- 性别 -->
    <van-cell title="性别" @click="Cshow = true">
      <template #default>{{ Cdate }} <van-icon name="arrow" /> </template>
    </van-cell>
    <van-popup v-model="Cshow" position="bottom" :style="{ height: '30%' }">
      <van-picker
        title="更换性别"
        show-toolbar
        :columns="columns"
        @confirm="ConConfirm"
        @cancel="ConCancel"
      />
    </van-popup>
    <!-- 生日 -->
    <van-cell is-link title="生日" @click="Dshow = true">
      <template #default>
        {{ currentDate }}
      </template>
    </van-cell>
    <van-popup v-model="Dshow" position="bottom" :style="{ height: '30%' }">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="DonConfirm"
      />
    </van-popup>
  </div>
</template>

<script>
import { Personaldata, APersonaldata } from '@/api/index'
export default {
  data() {
    return {
      Ashow: false,
      Bshow: false,
      Cshow: false,
      Dshow: false,
      Adate: '',
      Cdate: '',
      message: '',
      double: '', // 男女
      minDate: new Date(1990, 0, 1),
      maxDate: new Date(2022, 7, 25),
      currentDate: '',
      columns: ['男', '女', '盒子']
    }
  },
  created() {
    this.APersonaldata()
  },
  methods: {
    // 返回上页
    backToprepage() {
      this.$router.go(-1)
    },
    // 格式化时间-------------------------------------------
    formatDate(currentDate) {
      return `${currentDate.getFullYear()}-${
        currentDate.getMonth() + 1
      }-${currentDate.getDate()}`
    },
    DonConfirm(currentDate) {
      this.Cshow = false
      this.currentDate = this.formatDate(currentDate)
    },
    // 选择性别-------------------------------------------
    ConConfirm(value) {
      // Toast(`当前值：${value}, 当前索引：${index}`)
      this.Cdate = value
      this.Cshow = false
    },
    ConCancel() {
      this.Cshow = false
    },
    // 更改名称-------------------------------------------
    // 取消
    BonClickLeft() {
      this.Bshow = false
    },
    // 返回
    BonClickRight() {
      this.Bshow = false
    },
    // 编辑信息
    async onClickRight() {
      try {
        if (this.Cdate === '男') {
          this.double = 0
        } else if (this.Cdate === '女') {
          this.double = 1
        } else {
          console.log('内容错误')
        }
        // console.log(this.dqId)
        const res = await Personaldata(
          this.message,
          this.double,
          this.currentDate
        )
        console.log(res)
      } catch (e) {
        console.log('e', e)
        this.$toast.fail('提交信息失败，请刷新重试')
      }
    },
    // 拿取信息
    async APersonaldata() {
      try {
        const res = await APersonaldata()
        if (res.data.data.gender === 0) {
          this.Cdate = '男'
        } else {
          this.Cdate = '女'
        }
        this.message = res.data.data.name
        this.currentDate = res.data.data.birthday
        console.log(res)
      } catch (e) {
        console.log('e', e)
        this.$toast.fail('获取信息失败，请刷新重试')
      }
    }
  },
  // 头像
  mounted() {
    this.$refs.file.addEventListener('change', (e) => {
      const file = e.target.files[0]
      const fr = new FileReader()
      fr.readAsDataURL(file)
      fr.onload = (e) => {
        this.photo = e.target.result
        this.show1 = true
        // 处理上传同一张照片无法再次打开
        this.$refs.file.value = ''
      }
    })
  }
}
</script>

<style lang="less" scoped>
// 头部
.navbar {
  background-color: #3296fa;
  position: relative;
  :deep(.van-nav-bar__title) {
    color: #fff;
    font-size: 0.42rem;
  }
  :deep(.van-nav-bar__text, ) {
    color: #fff;
  }
  :deep(.van-icon) {
    color: #fff;
  }
}
// 选择栏
.van-cell {
  height: 90px;
}
.van-field {
  height: 100px;
}
.TX {
  height: 2rem;
  :deep(.Atx) {
    height: 50px;
    width: 200px;
  }
}
.calssa {
  height: 1.8rem;
}
html {
  background-color: #f5f7f9 !important;
}
</style>
