import Vue from 'vue'
import App from './App.vue'
import Vant from 'vant'
import router from './router'
import store from './store'
import './assets/zttb/iconfont.css'
import './styles/index.less'
import 'amfe-flexible'
import 'vant/lib/index.css'
import 'github-markdown-css/github-markdown.css'
import mavonEditor from 'mavon-editor' // 引入mavon-editor 就是上面所安装的
Vue.use(mavonEditor) // 让Vue使用mavonEditor
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
