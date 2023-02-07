import { request } from '../index'
//新增生产计划
export const AddOnePlan = (data) => {
    return request({
        url: "/bmos/production/product/plan/saveOrUpdate",
        method: "POST",
        data
    })
}
//物料--生产计划保存返回
export const getMaterialInfo = (params) => {
    return request({
        url: "/bmos/production/product/plan/process/material/save/details",
        method: "GET",
        params
    })
}
export const getOneDetail = (id) => {
    return request({
        url: `/bmos/produciton/product/plan/detail/${id}`,
        method: "GET"
    })
}
//产品下拉
export const getProductionList = (params) => {
    return request({
        url: "/bmos/basic/product/list",
        method: "GET",
        params
    })
}
//根据产品下拉查询条线列表
export const getRipeList = (id) => {
    return request({
        url: `/bmos/basic/product/detail/${id}`,
        method: "GET"
    })
}
//根据配方节点查询物料
export const getMaterials = (params) => {
    return request({
        url: "/bmos/production/product/plan/process/material/save/details",
        method: "GET",
        params
    })
}