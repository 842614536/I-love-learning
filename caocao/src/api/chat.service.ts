import http from '@/utils/fetch'
export const apiChatCreate = (data: any, signal) => {
  return http.post('/ai/create', data, signal)
}
