// 後台相關的路由
import { apiHelper } from './../utils/helpers'

export default {
  categories: {
    // 取得餐廳類別列表
    get() {
      return apiHelper.get('/admin/categories')
    },
    
    // 新增餐廳類別
    create({name}) {
      return apiHelper.post('/admin/categories', {name})
    },
    
    // 更新編輯後的餐廳類別 
    update({ categoryId, name }) {
      return apiHelper.put(`/admin/categories/${categoryId}`, {name})
    },

    // 刪除餐廳類別
    delete({ categoryId }) {
      return apiHelper.delete(`/admin/categories/${categoryId}`)
    },
    
  },

  restaurants: {
    // 新增餐廳資料
    create({ formData }) {
      return apiHelper.post('/admin/restaurants', formData)
    },
    
    // 取得餐廳列表
    get () {
      return apiHelper.get('/admin/restaurants')
    },

    // 取得餐廳詳細資料
    getDetail({ restaurantId }) {
      return apiHelper.get(`/admin/restaurants/${restaurantId}`)
    },
    
    // 更新編輯後的餐廳資料
    update ({ restaurantId, formData }) {
      return apiHelper.put(`/admin/restaurants/${restaurantId}`, formData)
    },

    // 刪除餐廳資料
    deleteRestaurant({ restaurantId }) {
      return apiHelper.delete(`/admin/restaurants/${restaurantId}`)
    }
  },
  users: {
    get () {
      return apiHelper.get('/admin/users')
    },
    update ({ userId, isAdmin }) {
      return apiHelper.put(`/admin/users/${userId}`, { isAdmin })
    }
  }
}