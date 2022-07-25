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
// 编辑用户资料
export const Personaldata = (name, gender, birthday) => {
  return request({
    url: '/v1_0/user/profile',
    method: 'PATCH',
    data: {
      name: name,
      gender: gender,
      birthday: birthday,
      real_name: '吴龙',
      intro: '很帅'
    }
  })
}
export const APersonaldata = () => {
  return request({
    url: '/v1_0/user/profile'
  })
}
// 编辑头像
export const uploadPhoto = (photo) => {
  return request({
    url: '/v1_0/user/photo',
    method: 'PATCH',
    data: photo
  })
}
