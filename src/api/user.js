import request from '@/utils/request'

export const login = (mobile, code) => {
  /**
   * @param {string} mobile 手机号
   */
  return request({
    url: '/v1_0/authorizations',
    method: 'POST',
    data: { code, mobile }
  })
}
