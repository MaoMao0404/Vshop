// 配置全局路由
import Vue from 'vue';
import VueRouter from 'vue-router';

// 使用插件
Vue.use(VueRouter)

// 引入路由组件
// 一级路由

import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
// 二级路由组件
import MyOrder from '@/pages/Center/MyOrder'
import GroupOrder from '@/pages/Center/GroupOrder'

// 引入store
import store from '@/store';

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

// 配置路由
const router = new VueRouter({
    routes:[
        {
            path:"/home",
            component:() => import('@/pages/Home'),
            meta:{show:true}
        },
        {
            path:"/detail/:skuid",
            component:Detail,
            meta:{show:true}
        },
        {
            name:'addcartsuccess',
            path:"/addcartsuccess",
            component:AddCartSuccess,
            meta:{show:true}
        },
        {
            path:"/shopcart",
            component:ShopCart,
            meta:{show:true}
        },
        {
            path:"/trade",
            component:Trade,
            meta:{show:true},
            beforeEnter: (to, from, next) => {
                // 去交易页必须从购物车页面去
                if (from.path=='/shopcart') {
                    next()
                }else{
                    // 从哪来回哪去
                    next(false)
                }
            }
        },
        {
            path:"/pay",
            component:Pay,
            meta:{show:true},
            beforeEnter: (to, from, next) => {
                // 去支付页必须从交易页面去
                if (from.path=='/trade') {
                    next()
                }else{
                    // 从哪来回哪去
                    next(false)
                }
            }
        },
        {
            path:"/paysuccess",
            component:PaySuccess,
            meta:{show:true},
            beforeEnter: (to, from, next) => {
                // 去支付成功页必须从支付页面去
                if (from.path=='/pay') {
                    next()
                }else{
                    // 从哪来回哪去
                    next(false)
                }
            }
        },
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
        {
            name:'search',
            // ?指定params参数是否传递
            path:"/search/:keyword?",
            component:Search,
            meta:{show:true},
            // 路由组件传递props数据
            // 布尔值写法：只能传递params
            // props:true
            // 对象写法
            // props:{a:1, b:2}
            // 函数写法：可以params、query参数，通过props传递给路由组件
            // props:($route)=>{
            //     return {
            //         keyword:this.$route.params.keyword
            //     }

            // }
        },
        {
            path:"/login",
            component:Login,
            meta:{show:false}
        },
        {
            path:"/register",
            component:Register,
            meta:{show:false}
        },
        // 重定向：在项目跑起来的时候，立马定向到首页
        {
            path:'*',
            redirect:"/home"

        }
    ],
    // 滚动位置
    scrollBehavior(to,from,savedPosition){
        return { y:0}
    }
})

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
        let toPath = to.path
        if (toPath.indexOf('/trade')!==-1 || (toPath.indexOf('/pay')!==-1) || (toPath.indexOf('/center')!==-1)) {
            next('/login?redirect='+toPath)
        }else{
            next()
        }
       
    }
})

export default router

