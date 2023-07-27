// 用户登录与注册仓库
import { reqGetCode,reqUserRegister,reqUserLogin,reqUserInfo,reqLogOut } from "@/api/index";
import { setToken,removeToken,getToken } from "@/utils/token";
const state = {
    code:'',//验证码
    token:getToken(),
    userInfo:{}//用户信息

}

const mutations = {
    // 获取验证码
    GETCODE(state,code){
        state.code = code
    },
    // 用户登录
    USERLOGIN(state,token){
        state.token = token
    },
    // 获取用户信息
    GETUSERINFO(state,userInfo){
        state.userInfo = userInfo
    },

    // 清除本地数据
    CLEARALL(state){
        state.token = ''
        state.userInfo = {}
        // 本地存储数据
        removeToken()
    }
}

const actions = {
    // 获取验证码
    async getCode(context,phone){
        // 返回验证码
        let result = await reqGetCode(phone)
        if (result.code == 200) {
            context.commit('GETCODE',result.data)
            return 'ok'
        }else{
            return Promise.reject(new Error('fail'))
        }

    },

    // 用户注册
    async userRegister(context,user){
        let result = await reqUserRegister(user)
        if (result.code == 200) {
            return 'ok'
        }else{
            return Promise.reject(new Error('fail'))
        }

    },

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

    // 获取用户信息
    async getUserInfo(context){
        let result = await reqUserInfo()
        if (result.code==200) {
            context.commit('GETUSERINFO',result.data)
            return 'ok'
        }else{
            return Promise.reject(new Error('fail'))
        }
    },

    // 退出登录
    async userLog(context){
        let result = await reqLogOut()
        if (result.code==200) {
            context.commit('CLEARALL')
            return 'ok'
        }else{
            return Promise.reject(new Error('fail'))
        }
    }
}

const getters = {}

export default{
    state,
    mutations,
    actions,
    getters
}