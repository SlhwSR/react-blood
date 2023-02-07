import { request } from "../index";
//userDetail
export const getUserCategoryDetail = (params) => {
  return request({
    url: `/user/detail/${params.id}`,
    method: "GET",
    // params
  });
};

//userCategory
export const getUserArticle = (id) => {
  return request({
    url: `/user/article/${id}`,
    method: "GET",
  });
};

//更新头像
export const updateAvatar=(params)=>{
  return request({
    url:`/user/avatar/${params.id}`,
    method:"PATCH",
    data:{
      avatar:params.avatar
    }
  })
}
//跟新密码
export const modifyPassword=(id,body)=>{
   return request({
    url:`/user/modify/password/${id}`,
    method:"PATCH",
    data:body
   })
}