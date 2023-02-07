import { request } from "../index";
//获取视频分类
export const getVideoCategory = (params) => {
  return request({
    url: `/video/category`,
    method: "GET",
    params,
  });
};
//新增视频分类
export const addVideoCategory=(data)=>{
 return request({
    url:"/video/category",
    method:"POST",
    data
 })
}
//添加视频
export const addVideo=(data)=>{
  return request({
    url:"/video",
    method:"POST",
    data
  })
}
//获取分类下视频
export const getVideoDetail = (params) => {
  return request({
    url: "/video",
    method: "GET",
    params,
  });
};
//获取所有视频
export const getAllVideo=(params)=>{
  return request({
    url:"/video/all",
    method:"GET",
    params
  })
}