import storage from './storage'
const TOKEN = '吴龙的'
export const getToken = () => storage.get(TOKEN)
export const setToken = () => storage.set(TOKEN)
export const removeToken = () => storage.remove(TOKEN)
