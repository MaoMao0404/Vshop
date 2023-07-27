// search仓库
import { reqGetSearchInfo } from "@/api/index";

// statse:存储数据
const state = {
    searchList:{},//获取search数据
}

// mutations：修改数据
const mutations = {
    // 获取search数据
    GETSEARCHLIST(state, searchList){
        state.searchList = searchList
    }
}

// actions：业务逻辑or异步处理
const actions = {
    // 获取search数据
    async getSearchList(context,params={}){
        let result = await reqGetSearchInfo(params)
        if (result.code === 200) {
            context.commit('GETSEARCHLIST', result.data)
        }
    }
}

// getters：计算属性，简化数据
const getters = {
    goodsList(state){
        return state.searchList.goodsList || []
    },
    trademarkList(state){
        return state.searchList.trademarkList || []
    },
    attrsList(state){
        return state.searchList.attrsList || []
    },
}

export default{
    state,
    mutations,
    actions,
    getters
}