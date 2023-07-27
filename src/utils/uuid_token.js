// 临时游客身份模块---单例
import { v4 as uuidv4 } from 'uuid';
export const getUUID = ()=>{
    // 从本地存储获取uuid
    let uuid_token = localStorage.getItem('UUIDTOKEN')
    if (!uuid_token) {
        // 如果没有生成临时身份
        uuid_token = uuidv4();
        // 本地存储一次
        localStorage.setItem('UUIDTOKEN',uuid_token)
    }
    // 返回id
    return uuid_token
}