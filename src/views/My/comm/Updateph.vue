<template>
  <div>
    <div
      :style="{ height: '50%', width: '100%' }"
      :close-on-click-overlay="false"
    >
      <img :src="photo" alt="" ref="img" />
    </div>
    <div class="data-img">
      <button class="btn" @click="noConfirm">取消</button>
      <button class="btn" @click="confirm">完成</button>
    </div>
  </div>
</template>

<script>
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
import { uploadPhoto } from '@/api/user'
export default {
  props: ['photo'],
  data() {
    return {}
  },
  mounted() {
    const img = this.$refs.img

    this.myCropper = new Cropper(img, {
      viewMode: 3,
      dragMode: 'none',
      initialAspectRatio: 1,
      aspectRatio: 1,
      preview: '.before',
      background: false,
      autoCropArea: 0.6,
      zoomOnWheel: true
    })
  },
  methods: {
    /*
      multipart/form-data
    */
    confirm() {
      const fm = new FormData()
      this.myCropper.getCroppedCanvas().toBlob(async (blob) => {
        fm.append('photo', blob)
        const { data } = await uploadPhoto(fm)
        console.log(data)
        this.imgUrl = data.data.photo
        this.$emit('confirm', this.imgUrl)
        this.$parent.imgUrl = this.imgUrl
        this.$toast('请点击保存按钮完成上传')
      })
    },
    noConfirm() {
      this.$parent.show1 = false
    }
  }
}
</script>

<style scoped>
.btn {
  position: fixed;
  top: 50%;
  left: 50%;
}
</style>
