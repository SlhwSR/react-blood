import { request } from '../index'
//登录
export const toLogin = (data) => {
    return request({
        url: "/auth/login",
        method: "POST",
        data
    })
}
//注册
export const toRegister = (data) => {
    return request({
        url: "/auth/register",
        method: "POST",
        data
    })
}