import request from '@/utils/request'

export const getSearchSuggest = (q) => {
  return request({
    url: '/v1_0/suggestion',
    params: { q }
  })
}
