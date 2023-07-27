// home仓库
import { reqCategoryList,reqGetBanner,reqGetFloorList } from "@/api";

// statse:存储数据
const state = {
    categoryList:[],//三级联动数据
    bannerList:[],//banner图数据
    floorList:[],//floor数据
}

// mutations：修改数据
const mutations = {
    // 获取三级联动数据
    CATEGORYLIST(state, categoryList){
        state.categoryList = categoryList.slice(0,15)
    },
    // 获取banner图数据
    GETBANNERLIST(state,bannerList){
        state.bannerList = bannerList
    },
    // 获取floorBanner数据
    GETFLOORLIST(state,floorList){
        state.floorList = floorList

    }

}

// actions：业务逻辑or异步处理
const actions = {
    /*
        通过API中的函数接口，向服务器发请求，获取数据
    */

    // 获取三级联动数据
    async categoryList(context){
        let result = await reqCategoryList()
        if (result.code === 200) {
            context.commit('CATEGORYLIST', result.data)
        }
    },
    // 获取banner图数据
    async getBannerList(context){
        let result = await reqGetBanner()
        if (result.code === 200) {
            context.commit('GETBANNERLIST',result.data)
        }

    },
    // 获取floorBanner数据
    async getFloorList(context){
        let result = await reqGetFloorList()
        if (result.code === 200) {
            context.commit('GETFLOORLIST',result.data)
        }

    }
}

// getters：计算属性，简化数据
const getters = {}

export default{
    state,
    mutations,
    actions,
    getters
}