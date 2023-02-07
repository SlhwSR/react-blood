import { request } from '../index'
//新增
export const AddOneCategory = (data) => {
    return request({
        url: "/category",
        method: "POST",
        data
    })
}
//findall
export const getCategoryList = (params) => {
    return request({
        url: "/category",
        method: "GET",
        params
    }) 
}
//pullList
export const getPullCategoryList=(params)=>{
    return request({
        url:`/category/list/${params.id}`,
        method:"GET"
    })
}
//delete
export const deleteCategory=(id)=>{
    return request({
        url:`/category/${id}`,
        method:"DELETE"
    })
}
//update
export const updateCategory=(id,data)=>{
    return request({
        url:`/category/${id}`,
        method:"PATCH",
        data
    })
}