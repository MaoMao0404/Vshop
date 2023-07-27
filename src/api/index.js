// API接口统一管理
import requests from "./request";
import mockRequests from './mockAjax'

// 三级联动
// /api/product/getBaseCategoryList get 无参数
export const reqCategoryList = ()=>{
    // 发请求：axios返回promise对象
    return requests({url:'/product/getBaseCategoryList', method:'get'})
}

// banner轮播图
export const reqGetBanner = ()=>{
    return mockRequests.get('/banner')
}

// 获取floor数据
export const reqGetFloorList = ()=>{
    return mockRequests.get('/floor')
}


// 获取搜索模块数据 方式：post
/*
参数：
{
  "category3Id": "61",
  "categoryName": "手机",
  "keyword": "小米",
  "order": "1:desc",
  "pageNo": 1,
  "pageSize": 10,
  "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
  "trademark": "4:小米"
}
*/
export const reqGetSearchInfo = (params)=>{
    return requests({url:"/list", method:"post", data:params})
}


// 获取商品详情   /api/item/{ skuId }  
export const reqGoodsInfo = (skuId)=>{
    return requests({url:`/item/${ skuId }`, method:"get"})
}

// 产品添加到购物车  /api/cart/addToCart/{ skuId }/{ skuNum }
export const reqAddOrUpdateShopCart = (skuId, skuNum)=>{
    return requests({url:`/cart/addToCart/${skuId}/${skuNum}`, method:"post"})
}

// 获取购物车列表接口
export const reqCartList = ()=>{
    return requests.get('/cart/cartList')
}

// 删除购物车商品
export const reqDeleteCart = (skuId)=>{
    return requests({url:`/cart/deleteCart/${skuId}`,method:"delete"})
}

// 切换商品选中状态 
export const reqCheckCart = (skuId, isChecked)=>{
    return requests({url:`/cart/checkCart/${skuId}/${isChecked}`, method:"get"})
}

// 获取验证码
export const reqGetCode = (phone)=>{
    return requests({url:`/user/passport/sendCode/${phone}`,method:"get"})
}

// 用户注册   post  参数：phone  password code
export const reqUserRegister = (data)=>{
    return requests({url:'/user/passport/register',method:"post",data})
}

// 用户登录
export const reqUserLogin = (data)=>{
    return requests({url:'/user/passport/login',method:"post",data})
}

// 获取用户信息(带着token向服务器要用户信息) 
// 在请求头中带token
export const reqUserInfo = ()=>{
    return requests.get('/user/passport/auth/getUserInfo')
}

// 退出登录
export const reqLogOut = ()=>{
    return requests.get('/user/passport/logout')
}


// 获取订单交易页信息
export const reqGetTradeInfo = ()=>{
    return requests.get('/order/auth/trade')
}

// 获取用户地址信息
export const reqAddressInfo = ()=>{
    return requests.get('/user/userAddress/auth/findUserAddressList')
}

// 提交订单 
export const reqSubmitOrder = (tradeNo,data)=>{
    return requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`, method:"post", data})
}

// 获取订单支付信息 
export const reqPayInfo = (orderId)=>{
    return requests({url:`/payment/weixin/createNative/${orderId}`, method:"get"})
}

// 获取支付订单状态 
export const reqPayStatus = (orderId)=>{
    return requests({url:`/payment/weixin/queryPayStatus/${orderId}`, method:"get"})
}

// 获取我的订单  /api
export const reqMyOrderList = (page, limit)=>{
    return requests.get(`/order/auth/${page}/${limit}`)
}
