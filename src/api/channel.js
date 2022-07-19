import request from '@/utils/request'
import storage from '@/utils/storage'

export const getMyChannels = () => {
  return request({
    url: '/v1_0/user/channels'
  })
}

export const getAllChannels = () => {
  return request({
    url: '/v1_0/channels'
  })
}
export const delMyChannel = (target) => {
  return request({
    url: `/v1_0/user/channels/${{ target }}`,
    method: 'DELETE'
  })
}
export const addMyChannells = (id, seq) => {
  return request({
    url: '/v1_0/user/channels',
    method: 'PATCH',
    data: {
      channels: [{ id, seq }]
    }
  })
}
const HEIMA_TOUTIAO = 'HEIMA_TOUTIAO'
export const getChannelsBy = () => storage.get(HEIMA_TOUTIAO)
export const setChannelsTo = (channel) => storage.set(HEIMA_TOUTIAO, channel)
