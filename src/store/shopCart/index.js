// 购物车仓库
import { reqCartList,reqDeleteCart,reqCheckCart } from "@/api/index";

const state = {
    shopCartList:[],// 获取购物车列表
}

const mutations = {
    // 获取购物车列表
    GETSHOPCARTLIST(state,shopCartList){
        state.shopCartList = shopCartList
    }
}

const actions = {
    // 获取购物车列表
    async getShopCartList(context){
        let result = await reqCartList()
        if (result.code == 200) {
            context.commit('GETSHOPCARTLIST',result.data)
        }
    },
    // 删除购物车商品
    async deleteCartListBySkuId(context,skuId){
        let result = await reqDeleteCart(skuId)
        if (result.code == 200) {
            return 'ok'
        }else{
            return Promise.reject(new Error('fail'))
        }
    },
    // 切换商品选中状态 
    async checkCart(context,{skuId, isChecked}){
        let result = await reqCheckCart(skuId, isChecked)
        if (result.code == 200) {
            return 'ok'
        }else{
            return Promise.reject(new Error('fail'))
        }
    },
    // 删除购物车的全部选中的商品
    deleteAllCheckedCart({dispatch,getters}){
        let PromiseAll = []
        getters.cartList.cartInfoList.forEach(item => {
            let promise = item.isChecked==1?dispatch('deleteCartListBySkuId',item.skuId):''
            PromiseAll.push(promise)
        });
        return Promise.all(PromiseAll)
    },
    //全选框控制商品isChecked
    updateAllCartIsChecked({dispatch,state},isChecked){
        let promiseAll = []
        state.shopCartList[0].cartInfoList.forEach(item=>{
            let promise = dispatch('checkCart',{skuId:item.skuId,isChecked})
            promiseAll.push(promise)
        })
        return Promise.all(promiseAll)
    }

}

const getters = {
    cartList(state){
        return state.shopCartList[0]||{}
    },
    
}

export default{
    state,
    mutations,
    actions,
    getters
}