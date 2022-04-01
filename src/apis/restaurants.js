// 「餐廳」相關 API
import { apiHelper } from './../utils/helpers'
const getToken = () => localStorage.getItem('token')

export default {
  // 首頁 全部餐廳
  getRestaurants({ page,categoryId }) {
    const searchParams = new URLSearchParams({ page, categoryId })
    return apiHelper.get(`/restaurants?${searchParams.toString()}`,{
      headers: { Authorization:`Bearer ${getToken()}`}
    })
  },

  // 個別餐廳詳細資料
  getRestaurant({ restaurantId }) {
  return apiHelper.get(`/restaurants/${restaurantId}`, {
    headers: { Authorization:`Bearer ${getToken()}`}
    })
  },

  // Restaurants Feeds 最新動態 
  getFeeds() {
    return apiHelper.get('/restaurants/feeds',{
      headers: { Authorization:`Bearer ${getToken()}`}})
  },
  
  // TOP10人氣餐廳
  getTopRestaurants () {
    return apiHelper.get('/restaurants/top',{
      headers: { Authorization:`Bearer ${getToken()}`}})
  },
}