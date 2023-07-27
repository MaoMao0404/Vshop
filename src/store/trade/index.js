// trade订单仓库
import { reqGetTradeInfo,reqAddressInfo } from '@/api/index'

const state = {
    orderInfo:{},//订单交易页信息
    address:[],//用户地址信息
}

const mutations = {
    // 获取订单交易页信息
    GETTRADEINFO(state,orderInfo){
        state.orderInfo = orderInfo
    },
    // 获取用户地址信息
    GETUSERADDRESS(state, address){
        state.address = address
    }
}

const actions = {
    // 获取订单交易页信息
    async getTradeInfo(context){
        let result = await reqGetTradeInfo()
        if (result.code == 200) {
            context.commit('GETTRADEINFO',result.data)
        }
    },

    //获取用户地址信息
    async getUserAddress(context){
        let result = await reqAddressInfo()
        if (result.code == 200) {
            context.commit('GETUSERADDRESS',result.data)
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