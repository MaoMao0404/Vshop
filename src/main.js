// 入口文件
import Vue from 'vue'
import App from './App.vue'

// 全局组件---三级联动组件
import TypeNav from '@/components/TypeNav'
Vue.component(TypeNav.name, TypeNav)
// 全局组件---分页
import  Pagination  from '@/components/Pagination'
Vue.component(Pagination.name, Pagination)

// 引入路由
import router from '@/router'

// 引入仓库
import store from '@/store'

// 引入mockServe.js---Mock数据
import '@/mock/mockServe'

// 引入ElementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 使用ElementUI
Vue.use(ElementUI);

// 引入swiper
import 'swiper/swiper-bundle.min.css'

// 引入vue-lazyload实现图片懒加载
import VueLazyload from 'vue-lazyload'
// 使用vue-lazyload
Vue.use(VueLazyload)

// 引入vee-validate实现表单验证
import VeeValidate from 'vee-validate'
// 引入中文提示信息
import zh_CN from 'vee-validate/dist/locale/zh_CN'
// 使用VeeValidate
Vue.use(VeeValidate)
// 表单验证
VeeValidate.Validator.localize('zh_CN', {
  messages: {
    ...zh_CN.messages,
    // 修改内置规则的message，让密码与确认密码相同
    is: (field) => `${field}必须与密码相同`,
  },
    // 给校验的field属性名映射中文名称
    attributes: {
    phone: '手机号',
    code: '验证码',
    password: '密码',
    password1: '确认密码',
    agree: '协议',
  }
});
// 自定义校验规则
VeeValidate.Validator.extend('agree',{
  validate:value => value,
  getMessage:field => field + "必须同意"
})


// 统一接受api文件夹中的全部请求函数
import * as API from '@/api'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  beforeCreate(){
    // 全局事件总线
    Vue.prototype.$bus = this
    Vue.prototype.$API = API

  },
  // 注册路由
  router,
  // 注册仓库：组件实例多一个$store属性
  store
}).$mount('#app')
