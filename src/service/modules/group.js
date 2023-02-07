import { request } from '../index'
//新增生产计划
export const AddOneGroup = (data) => {
    return request({
        url: "/article",
        method: "POST",
        data
    })
}
export const GetGroupList = (params) => {
    return request({
        url: "/article",
        method: "GET",
        params
    })
}
export const UpdateOne = (data) => {
    return request({
        url: `/article/${data.id}`,
        method: "PATCH",
        data:{
            title:data.title,
            content:data.content
        }
    })
}
export const searchSome=(params)=>{
    return request({
        url:"/article/findSome",
        params
    })
}
export const DeleteOne = (id) => {
    return request({
        url: `/article/${id}`,
        method: "DELETE",   
        // params:{
        //     id
        // }
    })
}