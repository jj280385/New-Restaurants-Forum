// 「餐廳」相關 API
import { apiHelper } from './../utils/helpers'

export default {
  // 首頁 全部餐廳
  getRestaurants({ page,categoryId }) {
    const searchParams = new URLSearchParams({ page, categoryId })
    return apiHelper.get(`/restaurants?${searchParams.toString()}`)
  },

  // 個別餐廳詳細資料
  getRestaurant({ restaurantId }) {
  return apiHelper.get(`/restaurants/${restaurantId}`)
  },

  // Restaurants Feeds 最新動態 
  getFeeds() {
    return apiHelper.get('/restaurants/feeds')
  },
  
  // TOP10人氣餐廳
  getTopRestaurants () {
    return apiHelper.get('/restaurants/top')
  },
}