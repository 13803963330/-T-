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
