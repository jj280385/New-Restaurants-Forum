import { apiHelper } from './../utils/helpers'

export default {
  // 只需要驗證該 token 是否有效，並取得登入者的資訊
  getCurrentUser() {
    return apiHelper.get(`/get_current_user`)
  },

  // 知道使用者 id 時，可以透過這道 API 獲取完整的 user profile
  get ({ userId }) {
    return apiHelper.get(`/users/${userId}`)
  },
  
  // 編輯使用者資料
  update ({ userId, formData }) {
    return apiHelper.put(`/users/${userId}`, formData)
  },

  // Restaurant Card 中的按鈕功能
  addFavorite ({ restaurantId }) {
    return apiHelper.post(`/favorite/${restaurantId}`, null)
  },

  deleteFavorite ({ restaurantId }) {
    return apiHelper.delete(`/favorite/${restaurantId}`, )
  },

  addLike ({ restaurantId }) {
    return apiHelper.post(`/like/${restaurantId}`, null, )
  },

  deleteLike({ restaurantId }) {
    return apiHelper.delete(`/like/${restaurantId}`)
  },
  
  // User Top
  getTopUsers() {
    return apiHelper.get('/users/top')
  },

  addFollowing ({ userId }) {
    return apiHelper.post(`/following/${userId}`, null)
  },
  deleteFollowing ({ userId }) {
    return apiHelper.delete(`/following/${userId}`)
  }
}