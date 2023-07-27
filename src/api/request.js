// axios二次封装
import axios from "axios";
// 引入进度条
import nprogress from "nprogress";
// 引入进度条样式
import "nprogress/nprogress.css"
console.log(nprogress);
// 引入store
import store from "@/store";

// 创建axios实例
const requests = axios.create({
    // 基础路径
    baseURL:"/api",
    // 请求超时的时间
    timeout:5000,
});

// 请求拦截器
requests.interceptors.request.use((config)=>{
    // config配置对象，headers请求头
    if (store.state.detail.uuid_token) {
        // 请求头添加字段
        config.headers.userTempId = store.state.detail.uuid_token
    }
    // 需要携带token带给服务器
    if (store.state.user.token) {
        config.headers.token = store.state.user.token
    }
    // 进度条开始
    nprogress.start()
    return config

})

// 响应拦截器
requests.interceptors.response.use(
    // 成功回调
    (res)=>{
        // 进度条结束
        nprogress.done()
        return res.data
    },
    // 失败回调
    (error)=>{
        return Promise.reject(new Error('false'))
    }
)

export default requests