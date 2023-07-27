//detail仓库
import { reqGoodsInfo, reqAddOrUpdateShopCart } from "@/api";
import  {getUUID}  from "@/utils/uuid_token";
const state = {
    // 商品详细数据
    goodInfo:{},
    // 游客的临时身份
    uuid_token:getUUID()
}

const mutations = {
    // 获取商品数据
    GETDOODSINFO(state,goodInfo){
        state.goodInfo = goodInfo
    }
}

const actions = {
    // 获取商品数据
    async getGoodsInfo(context, skuId){
        let result = await reqGoodsInfo(skuId)
        if (result.code === 200) {
            console.log(result.data);
            context.commit('GETDOODSINFO',result.data)
        }
    },

    // 将商品添加到购物车是否成功
    async addOrUpdateShopCart(context, {skuId, skuNum}){
        let result = await reqAddOrUpdateShopCart(skuId, skuNum)
        // 加入购物车成功 
        if (result.code == 200) {
            return "ok"
        }else{
            // 加入购物车失败
            return Promise.reject(new Error('fail'))
        }
    },
}

const getters = {
    // 路径导航数据
    categoryView(state){
        return state.goodInfo.categoryView || {}
    },
    // 简化产品信息
    skuInfo(state){
        return state.goodInfo.skuInfo || {}
    },
    // 产品售卖属性的简化
    spuSaleAttrList(state){
        return state.goodInfo.spuSaleAttrList || []
    }
}

export default{
    state,
    mutations,
    actions,
    getters
}