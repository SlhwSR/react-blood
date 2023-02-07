import { request } from '../index'
//个人信息获取
export const getPersonalInfo = (params) => {
    return request({
        url: "/auth/all",
        method: "GET",
        params
    })
} 