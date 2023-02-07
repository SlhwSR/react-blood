import { request } from "../index";
//新增
export const AddOneArticle = (data) => {
  return request({
    url: "/article",
    method: "POST",
    data,
  });
};
//文章列表
export const getArticleList = (params) => {
  return request({
    url: "/article",
    method: "GET",
    params,
  });
};
//更新
export const updateArticle = (data) => {
  return request({
    url: `/article/${data.id}`,
    method: "PATCH",
    data: {
      title: data.title,
      content: data.content,
      categoryId: data.categoryId,
    },
  });
};
//删除某条文章
export const deleteArticle = (id) => {
  return request({
    url: `/article/${id}`,
    method: "DELETE",
  });
};
//搜索
export const querySearch = (params) => {
  return request({
    url: "/article/findSome",
    method: "GET",
    params,
  });
};
//添加某条评论
export const addOneComment = (data) => {
  return request({
    url: "/article/comment", 
    method: "POST",
    data,
  });
};  
//获取文章评论
export const getOneArticleCommentList = (id) => {
  return request({
    url: `/article/comment/${id}`,
    method: "GET",
  });
};
//回复评论
export const replyOneComment = (data) => {
  return request({
    url: "/article/comment/reply",
    method: "POST",
    data,
  });
};
//给某条评论点赞
export const addZan = (id, userId) => {
  return request({
    url: "/article/dianzan",
    method: "POST",
    data: {
      commentId: id,
      userId,
    },
  });
};
