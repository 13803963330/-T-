import request from '@/utils/request'
// 获取文章信息
export const gerArticles = (article_id) => {
  return request({
    url: '/v1_0/articles/' + article_id
  })
}
// 获取关注
export const gerattention = (target) => {
  return request({
    method: 'POST',
    url: '/v1_0/user/followings',
    data: { target }
  })
}
// 取消关注
export const gertarget = (target) => {
  return request({
    method: 'DELETE',
    url: '/v1_0/user/followings/' + target
  })
}
// 收藏
export const getCllect = (target) => {
  return request({
    method: 'POST',
    url: '/v1_0/article/collections',
    data: { target }
  })
}
// 取消收藏
export const cancelCllect = (target) => {
  return request({
    method: 'DELETE',
    url: '/v1_0/article/collections/' + target
  })
}
// 点赞
export const getPraise = (target) => {
  return request({
    method: 'POST',
    url: '/v1_0/article/likings',
    data: { target }
  })
}
// 取消点赞
export const cancelPraise = (target) => {
  return request({
    method: 'DELETE',
    url: '/v1_0/article/likings/' + target
  })
}
// 获取评论
export const getComment = (id, a) => {
  return request({
    url: '/v1_0/comments',
    params: {
      type: a,
      source: id
    }
  })
}
// 获取评论回复
export const getDomment = (id, c) => {
  return request({
    url: '/v1_0/comments',
    params: {
      type: c,
      source: id
    }
  })
}
// 对评论点赞
export const getAlike = (target) => {
  return request({
    method: 'POST',
    url: '/v1_0/comment/likings',
    data: { target }
  })
}
// 取消对评论点赞
export const cancellike = (target) => {
  return request({
    method: 'DELETE',
    url: '/v1_0/comment/likings/' + target
  })
}
// // 对回复点赞
// export const getAreply = (target) => {
//   return request({
//     method: 'POST',
//     url: '/v1_0/comment/likings',
//     data: { target }
//   })
// }
// // 取消对回复点赞
// export const cancelreply = (target) => {
//   return request({
//     method: 'DELETE',
//     url: '/v1_0/comment/likings/' + target
//   })
// }
// 对文章或评论
export const setAdiscuss = (data) => {
  return request({
    method: 'POST',
    url: '/v1_0/comments',
    data
  })
}
