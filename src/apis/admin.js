// 後台相關的路由
import { apiHelper } from './../utils/helpers'
const getToken = () => localStorage.getItem('token')

export default {
  categories: {
    // 取得餐廳類別列表
    get() {
      return apiHelper.get('/admin/categories', {
        headers: { Authorization: `Bearer ${getToken()}` }
      })
    },
    
    // 新增餐廳類別
    create({name}) {
      return apiHelper.post('/admin/categories', {name},{
        headers: { Authorization: `Bearer ${getToken()}` }} 
      )
    },
    
    // 更新編輯後的餐廳類別 
    update({ categoryId, name }) {
      return apiHelper.put(`/admin/categories/${categoryId}`, {name},{
        headers: { Authorization: `Bearer ${getToken()}` }
      })
    },

    // 刪除餐廳類別
    delete({ categoryId }) {
      return apiHelper.delete(`/admin/categories/${categoryId}`, {
        headers: { Authorization: `Bearer ${getToken()}` }
      })
    },
    
  },

  restaurants: {
    // 新增餐廳資料
    create({ formData }) {
      return apiHelper.post('/admin/restaurants', formData, {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      })
    },
    
    // 取得餐廳列表
    get () {
      return apiHelper.get('/admin/restaurants', {
        headers: { Authorization: `Bearer ${getToken()}` } 
      })
    },

    // 取得餐廳詳細資料
    getDetail({ restaurantId }) {
      return apiHelper.get(`/admin/restaurants/${restaurantId}`, {
        headers: { Authorization: `Bearer ${getToken()}` }
      })
    },
    
    // 更新編輯後的餐廳資料
    update ({ restaurantId, formData }) {
      return apiHelper.put(`/admin/restaurants/${restaurantId}`, formData, {
        headers: { Authorization: `Bearer ${getToken()}` }
      })
    },

    // 刪除餐廳資料
    deleteRestaurant({ restaurantId }) {
      return apiHelper.delete(`/admin/restaurants/${restaurantId}`, {
        headers: { Authorization: `Bearer ${getToken()}` }
      })
    }
  },
  users: {
    get () {
      return apiHelper.get('/admin/users',{
        headers: { Authorization: `Bearer ${getToken()}` }
      })
    },
    update ({ userId, isAdmin }) {
      return apiHelper.put(`/admin/users/${userId}`, { isAdmin },{
        headers: { Authorization: `Bearer ${getToken()}` }
      })
    }
  }
}