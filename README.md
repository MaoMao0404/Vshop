# 电商项目

### 项目说明
基于vue2开发的在线电商项目，包括首页, 搜索列表, 商品详情, 购物车, 订单, 支付, 用户登陆、注册等多个功能。

### 技术栈
Vue2+Vue-cli+Vue-Router+Vuex+Axios+ES6+Element-ui

### 路由分析

#### 初始路由组件：
Home首页路由组件、Search路由组件、Login登录路由、Register注册路由

#### 非路由组件：
Header Footer（首页、搜索页） Pagination分页器全局组件 TypeNav三级联动全局组件
Footer显示：Home Search（v-show）根据【meta】路由原信息中布尔值show判断

#### 编程式导航路由跳转 
1、给push方法传递相应的成功、失败回调
2、$router是VueRouter的一个实例，$router.push()来自VueRouter.prototype.push，因此重写push与replace方法
```
// 备份
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace
// 重写push|replace
// location 向哪里跳转
// resolve 成功回调
// reject 失败回调

// 重写push
VueRouter.prototype.push = function (location,resolve,reject) {
    if (resolve && reject) {
        // originPush指向window 因此修改指向
        // call apply区别：传递参数不同，call多个参数用逗号隔开，apply参数传递数组
        originPush.call(this,location, resolve, reject)
    }else{
        // 手动传递回调
        originPush.call(this,location, ()=>{}, ()=>{})
    }
}

// 重写replace
VueRouter.prototype.replace = function (location, resolve,reject) {
    if (resolve && reject) {
        originReplace.call(this,location, resolve, reject)
    }else{
        originReplace.call(this,location, ()=>{}, ()=>{})
    }
}

```



### Home组件

三级联动组件：在Home、Search、Detail中，将此组件注册为全局组件，只需注册一次

其余静态组件：html css 图片



### axios二次封装

请求拦截器：发请求之前处理
响应拦截器：数据返回后处理
安装nprogress进度条



### vuex状态管理库
模块化



### 三级联动路由跳转与传递参数---全局组件
一级、二级、三级分类
使用事件委托+编程式导航  声明式导航会出现卡顿
事件委托存在问题解决：
1、点击a标签  子节点a标签加自定义属性data-categoryName
2、传递参数问题 添加自定义属性 data-category1Id data-category2Id data-category3Id
```
goSearch(event){
    // 获取当前触发事件节点，节点属性dataset可以获取自定义属性与属性值
    let element = event.target
    let {categoryname,category1id,category2id,category3id} = element.dataset
    if (categoryname) {
        // 整理路由跳转参数
        let location = { name:"search" }
        let query = {categoryName:categoryname}
        if (category1id) {
            query.category1Id = category1id
        }else if(category2id){
            query.category2Id = category2id
        }else{
            query.category3Id = category3id
        } 
        // 整理参数
        location.query = query
        // 路由跳转
        this.$router.push(location)
    }   
}
```


### Search组件
TypeNav组件的显示与隐藏 + 过渡动画效果
1、显示与隐藏 在mounted中实现
```
mounted(){
    ·························
    // 组件挂载完毕 判断路由
    // 如果不是Home组件，将typeNav隐藏
    if (this.$route.path !== '/home') {
            this.show = false
    }
}
```

2、过渡动画效果
通过transition实现 有v-if或者v-show才能实现
```
<transition name="sort">
    <div class="sort" v-show="show">
        ···
    </div>
</transition>
```
```
// 过渡动画(进入开始状态)
    .sort-enter{
        height: 0px;
    }
    // 过渡动画(进入结束状态)
    .sort-enter-to{
        height: 461px;
    }
    .sort-enter-active{
        transition: all .5s;
    }
    
```

3、优化性能 减少请求次数
在APP根组件【mounted】中发请求，执行一次

4.合并参数 合并query和params
TypeNav组件
```
goSearch(){
    ········
     //判断有无params参数，如果有params将参数合并传递 
    if (this.$route.params) {
        // 整理参数
        location.params = this.$route.params
    }
}

```

Header组件
```
goSearch(){
    //判断有无query参数，如果有query将参数合并传递 
    if (this.$route.query) { 
        location.query = this.$route.query
    }
}
```

5.监听路由的变化 watch
监听到路由变化则再次发起请求 $route在data

6.子组件SearchSelector给父组件Search传数据----使用自定义事件
父组件中
```
<SearchSelector @trademarkInfo="trademarkInfo" @attrInfo="attrInfo"/>

// 自定义事件回调---品牌
trademarkInfo(trademark){
    // 整理品牌参数
    this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`
    // 再次发请求
    this.getData()
},
// 自定义事件回调---属性
attrInfo(attr,attrValue){
    let props = `${attr.attrId}:${attrValue}:${attr.attrName}`
    this.searchParams.props.push(props)
}
```

子组件中
```
 // 品牌事件处理函数
tradeMarkHandler(trademark){
this.$emit("trademarkInfo",trademark)
},
// 平台售卖属性
attrHandler(attr,attrValue){
this.$emit("attrInfo",attr,attrValue)
}
```

7.排序操作
1: 综合 2: 价格 
asc: 升序,desc: 降序  
4种情况  1:desc   1：asc   2:desc   2:asc



### Mock插件---模拟数据
1.src中创建mock文件夹
2.准备json数据，在mock文件夹中
3.mock数据需要的图片放置在public文件夹中
4.通过mockjs实现,创建mockServe.js实现
5.mockServe.js文件在main.js引入


### 分页器---全局组件
pageNo：当前为第几页
pageSize：一页展示多少条数据
total：一共展示的数据
continues：分页连续的页码个数【奇数】


### Detail组件
#### 放大镜(Zoom组件)：
```
checkImg(e){
    let mask = this.$refs.mask
    let big = this.$refs.big
    let bigDiv = this.$refs.bigDiv
    let left = e.offsetX - mask.offsetWidth/2 
    let top = e.offsetY - mask.offsetHeight/2
    if (left < 0) left = 0
    if(left > bigDiv.offsetWidth - mask.offsetWidth) left = bigDiv.offsetWidth - mask.offsetWidth
    if (top < 0) top = 0
    if (top > bigDiv.offsetHeight - mask.offsetHeight) top = bigDiv.offsetHeight - mask.offsetHeight
    mask.style.left = left + 'px'
    mask.style.top = top + 'px'
    big.style.left = -2 * left + 'px'
    big.style.top = -2 * top + 'px'
    }
```

#### 小图列表(ImageList组件):swiper实现
引入时如果前进后退按钮不生效还需要单独引入
```
import Swiper, { Navigation, Pagination } from "swiper";
Swiper.use([Navigation, Pagination]);
```

#### 加入购物车---路由传参
判断是否加入成功
```
// 加入购物车之前发请求
async addShopcar(){
    // 1.发送请求，将商品加入购物车，派发action
    // 2.服务器请求成功，进行路由跳转
    // 3.路由跳转时将产品信息带给下一级路由
    // 4.采用sessionStorage存储skuInfo---存储字符串
    sessionStorage.setItem("SKUINFO",JSON.stringify(this.skuInfo))
    try{
    await this.$store.dispatch('addOrUpdateShopCart',{skuId:this.$route.params.skuid, skuNum: this.skuNum}) 
    // 进行路由跳转
    this.$router.push({name:'addcartsuccess', query:{skuNum:this.skuNum}})
    }catch(error){
    alert(error.message)
    }
}
```


### ShopCart组件
#### 1.获取购物车数据
临时游客身份：使用uuid生成id，存储在localStorage，在请求头中添加字段userTempId

临时游客身份模块
```
export const getUUID = ()=>{
    // 从本地存储获取uuid
    let uuid_token = localStorage.getItem('UUIDTOKEN')
    if (!uuid_token) {
        // 如果没有生成临时身份
        uuid_token = uuidv4();
        // 本地存储一次
        localStorage.setItem('UUIDTOKEN',uuid_token)
    }
    return uuid_token
}
```

在detail仓库中添加
```
import  {getUUID}  from "@/utils/uuid_token";
const state = {
    // 商品详细数据
    goodInfo:{},
    // 游客的临时身份
    uuid_token:getUUID()
}
```

在请求头中添加字段 
```
// 请求拦截器
requests.interceptors.request.use((config)=>{
    // config配置对象，headers请求头
    if (store.state.detail.uuid_token) {
        // 请求头添加字段
        config.headers.userTempId = store.state.detail.uuid_token
    }
    // 进度条开始
    nprogress.start()
    return config

    })
```

#### 2.修改购物车产品数量(节流)
skuNum	商品数量 
正数代表增加 plus：1
负数代表减少 mins:-1
用户输入：需要判断输入是否合法并且计算增加或减少的数量

```
// 修改某个产品的个数(节流)
handler:throttle(async function(type, disNum, cart){
    switch (type) {
    case "plus":
        disNum = 1;
        break;
    case "mins":
        disNum = cart.skuNum > 1 ? -1 : 0
        break;
    case 'change':
        if (isNaN(disNum) || disNum < 1) {
        disNum = 0
        }else{
        disNum = parseInt(disNum) - cart.skuNum
        }
        break;
    }
    try{
    await this.$store.dispatch('addOrUpdateShopCart',{skuId:cart.skuId,skuNum:disNum})
    this.getData()
    }catch(error){
    alert(error.message)
    }
},500),
```

#### 3.删除购物车商品
不需要捞取数据，try catch判断是否删除商品成功并且重新获取数据数据
```
// 删除某一个产品的操作
async deleteCartById(cart){
    try {
    await this.$store.dispatch('deleteCartListBySkuId',cart.skuId)
    this.getData()
    } catch (error) {
    alert(error.message)
    }
}
```

#### 4.删除全部选中的商品---Promise.all
deleteAllCheckedCart派发action，在shopCart仓库中再次派发action，调用删除单个商品请求n次，并将所有返回的promise push进数组，使用Promise.all判断是否全部删除
```
// 删除购物车的全部选中的商品
deleteAllCheckedCart({dispatch,getters}){
    let PromiseAll = []
    getters.cartList.cartInfoList.forEach(item => {
        let promise = item.isChecked==1?dispatch('deleteCartListBySkuId',item.skuId):''
        PromiseAll.push(promise)
    });
    return Promise.all(PromiseAll)
}
```



### Login组件&&Register组件
1.数据存储在user仓库中
2.注册获取验证码
3.登录获取token，登录成功跳转到home
4.退出登录

#### 携带token给服务器
请求拦截器中
```
// 需要携带token带给服务器
if (store.state.user.token) {
    config.headers.token = store.state.user.token
}
```

登录成功需要在home挂载时派发action
home组件中
```
mounted(){
// 获取用户信息在首页展示
this.$store.dispatch('getUserInfo')
},
```

user仓库中发请求
```
// 用户登录
async userLogin(context,data){
    let result = await reqUserLogin(data)
    // 服务器下发token 用户信息唯一标识
    if (result.code==200) {
            // 本地持久化存储token
        setToken(result.data.token)
        context.commit('USERLOGIN',result.data.token)
        return 'ok'
    }else{
        return Promise.reject(new Error('fail'))
    }
},
```


登录成功header组件需要展示用户
```
<!-- 未登录 -->
<p v-if="!userName">
    <span>请</span>
    <!-- 声明式导航 -->
    <router-link to="/login">登录</router-link>
    <router-link to="/register" class="register">免费注册</router-link>
</p>
<!-- 登录 -->
<p v-else>
    <a>{{userName}}</a>
    <a class="register">退出</a>
</p>
```


#### 登录后跳转---导航守卫
```
// 全局路由守卫
router.beforeEach(async(to, from, next) => {
    // 用户登录有token
    let token = store.state.user.token
    let userName = store.state.user.userInfo.name
    // 用户登录
    if (token) {
        // 用户登录后不能跳转到login,停留在首页
        if (to.path == '/login') {
            next('/home')
        }else{
            // 有用户信息
            if (userName) {
                next()
            }else{
                // 没有用户信息
                try {
                    // 获取用户信息在首页展示
                    await store.dispatch('getUserInfo')
                    next()
                } catch (error) {
                    // token失效无法获取信息，重新登录
                    // 清除token
                    await store.dispatch('userLog')
                    next('/login')
                }
            }
            
        }
    }else{
        // 未登录
        next()
    }
})
```

#### 未登录路由判断
未登录无法跳转到交易(trade),个人中心(center),支付(pay)相关的页面
login组件中
```
// 路由当中是否包含query参数，有：跳转到指定路由，无：跳转到home
let toPath = this.$route.query.redirect||"/home"
this.$router.push(toPath)
```

路由判断
```
 // 未登录
let toPath = to.path
if (toPath.indexOf('/trade')!==-1 || (toPath.indexOf('/pay')!==-1) || (toPath.indexOf('/center')!==-1)) {
    next('/login?redirect='+toPath)
}else{
    next()
}
```

#### 登录路由判断
路由独享守卫
1.去交易页必须从购物车页面去
```
 beforeEnter: (to, from, next) => {
    // 去交易页必须从购物车页面去
    if (from.path=='/shopcart') {
        next()
    }else{
        // 从哪来回哪去
        next(false)
    }
}
```
2.去支付页必须从交易页面去
3.去支付成功页必须从支付页面去

#### 退出登录
向服务器发送请求，清空项目中数据，跳转到home
```
// 退出登录
async logOut(){
    // 发请求通知服务器
    // 清除项目中数据token，userInfo
    try {
        // 如果退出成功
        await this.$store.dispatch('userLog')
        // 回到首页
        this.$router.push('/home')
    } catch (error) {
        alert(error.message)
    }
}
```

仓库中清除数据
```
// 清除本地数据
CLEARALL(state){
    state.token = ''
    state.userInfo = {}
    // 本地存储数据
    removeToken()
}
```


### Trade组件
账号：13700000000
密码：111111


### Pay组件
#### 统一引入API---挂载在prototype上
```
// 统一接受api文件夹中的全部请求函数
import * as API from '@/api'
beforeCreate(){
    // 全局事件总线
    Vue.prototype.$bus = this
    //统一引入API
    Vue.prototype.$API = API
  },
```

#### Element-ui and qrcode
遮罩层：弹出支付信息
qrcode：插件生成二维码
```
import QRCode from "qrcode";
async open() {
    // 生成二维码
    let url = await QRCode.toDataURL(this.payInfo.codeUrl)
    this.$alert(`<img src="${url}" />`, "微信支付", {
    dangerouslyUseHTMLString: true,
    // 中间布局
    center: true,
    // 是否显示取消按钮
    showCancelButton: true,
    // 取消按钮文本
    cancelButtonText: "支付遇见问题",
    // 确定按钮文本
    confirmButtonText: "支付成功",
    // 右上角×号
    showClose: false,
    });
},
```

#### 支付结果
获取支付成功与失败的结果，开启定时器
```
// 获取支付成功与失败的结果
// 开启定时器，一直获取
if (!this.timer) {
this.timer = setInterval(async()=>{
// 发请求获取用户支付状态
let result = await this.$API.reqPayStatus(this.orderId)
console.log(result);
// 用户支付成功
if (result.code == 200) {
    // 清除定时器
    this.timer = null
    // 保存支付成功的code
    this.code = result.code
    // 关闭弹出框
    this.$msgbox.close()
    // 跳转到下一路由
    this.$router.push('/paysuccess')
}
},1000)
}
```

关闭弹出窗配置
function(action, instance, done)，action 的值为'confirm', 'cancel'或'close'；instance 为 MessageBox 实例，可以通过它访问实例上的属性和方法；done 用于关闭 MessageBox 实例
```
beforeClose:(type, instance, done)=>{
    if (type=='cancel') {
    alert('请联系客服')
    // 清除定时器
    clearInterval(this.timer)
    this.timer = null
    // 关闭弹出框
    done()
    }else{
    // 判断是否已经支付
        if (this.code == 200) {
            // 清除定时器
            clearInterval(this.timer)
            this.timer = null
            done()
            this.$router.push('/paysuccess')
        }
    }
}
```



### Center组件
1.二级路由---个人订单和团购订单
```
{
    path:"/center",
    component:Center,
    meta:{show:true},
    // 重定向
    redirect:'/center/myorder',
    children:[
        {
            path:"myorder",
            component:MyOrder,  
        },
        {
            path:"grouporder",
            component:GroupOrder,
        },
    ]
},
```

2.个人订单 
复用全局组件：Pagination组件



### 图片懒加载
vue-lazyload：插件

安装
```
npm i vue-lazyload@1.3.3 -S
```

引入使用
```
// 引入vue-lazyload实现图片懒加载
import VueLazyload from 'vue-lazyload'
// 使用vue-lazyload
Vue.use(VueLazyload)
```



### 表单验证
vee-validate：插件
#### 安装
```
npm i vee-validate@2
```

#### 引入使用 main.js
```
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
```


#### Register and Login组件html中
```
<input
    placeholder="请输入密码"
    v-model="password"
    name="password"
    v-validate="{ required: true, regex: /^[0-9A-Za-z]{8-20}$/ }"
    :class="{ invalid: errors.has('password') }"
/>
<span class="error-msg">{{ errors.first("password") }}</span>

//自定义checkbox使用
<div class="controls">
<input
    type="checkbox"
    v-model="agree"
    name="agree"
    v-validate="{ required: true, agree:true }"
    :class="{ invalid: errors.has('agree') }"
/>
<span>同意协议并注册《尚品汇用户协议》</span>
<span class="error-msg">{{ errors.first("agree") }}</span>
```


### 路由懒加载
当打包构建应用时，JavaScript 包会变得非常大，影响页面加载。如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就会更加高效。
```
// 将
// import UserDetails from './views/UserDetails.vue'
// 替换成
const UserDetails = () => import('./views/UserDetails.vue')
```

router使用
```
{
    path:"/home",
    component:() => import('@/pages/Home'),
    meta:{show:true}
},
```

