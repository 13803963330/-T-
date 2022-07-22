import request from '@/utils/request'

export const gerArticles = (article_id) => {
  return request({
    url: '/v1_0/articles/' + article_id
  })
}
