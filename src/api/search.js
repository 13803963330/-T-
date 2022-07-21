import request from '@/utils/request'

// 获取建议
export const getSearchSuggest = (q) => {
  return request({
    url: '/v1_0/suggestion',
    params: { q }
  })
}
// 获取结果
export const getSearchResult = (q, page, per_page) => {
  return request({
    url: '/v1_0/search',
    params: { q, page, per_page }
  })
}
