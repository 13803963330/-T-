import request from '@/utils/request'
import store from '@/store/index'

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
export const SendCode = (mobile) => {
  /**
   * @param {string} mobile 手机号
   */
  return request({
    url: `/v1_0/sms/codes/${mobile}`
  })
}

export const getUserInfo = () => {
  return request({
    url: '/v1_0/user',
    headers: {
      Authorization: `Bearer ${store.state.user.token}`
    }
  })
}
