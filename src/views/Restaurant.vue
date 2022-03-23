// ./src/views/Restaurant.vue
<template>
  <div class="container py-5">
    <h1>餐廳描述頁</h1>
    <!-- 餐廳資訊頁 RestaurantDetail -->
    <RestaurantDetail
    :initial-restaurant="restaurant"/>
    <hr>
    <!-- 餐廳評論 RestaurantComments -->
    <RestaurantComments
    :restaurant-comments="restaurantComments"
    @after-delete-comment="afterDeleteComment"/>

    <!-- 新增評論 CreateComment -->
    <CreateComment 
    :restaurant-id="restaurant.id"
    @after-create-comment="afterCreateComment"/>
  </div>
</template>

<script>
import RestaurantDetail from "../components/RestaurantDetail.vue"
import RestaurantComments from "./../components/RestaurantComments"
import CreateComment from "./../components/CreateComment"

const dummyData = 
{
    "restaurant": {
        "id": 1,
        "name": "Sylvester Hauck",
        "tel": "(813) 367-7905",
        "address": "1690 Turner Well",
        "opening_hours": "08:00",
        "description": "Quam autem accusamus eos laboriosam.\nCorporis rerum voluptatibus dolores facere nihil.\nEveniet ut debitis fuga praesentium.\nConsequuntur voluptate non hic similique vero dolor quia saepe.",
        "image": "https://loremflickr.com/320/240/restaurant,food/?random=57.31300539537876",
        "viewCounts": 2,
        "createdAt": "2022-02-15T03:53:45.000Z",
        "updatedAt": "2022-03-22T13:42:42.103Z",
        "CategoryId": 1,
        "Category": {
            "id": 1,
            "name": "中式料理",
            "createdAt": "2022-02-15T03:53:45.000Z",
            "updatedAt": "2022-02-15T03:53:45.000Z"
        },
        "FavoritedUsers": [],
        "LikedUsers": [],
        "Comments": [
            {
                "id": 51,
                "text": "Temporibus unde a voluptatem nostrum et qui.",
                "UserId": 1,
                "RestaurantId": 1,
                "createdAt": "2022-02-15T03:53:45.000Z",
                "updatedAt": "2022-02-15T03:53:45.000Z",
                "User": {
                    "id": 1,
                    "name": "root",
                    "email": "root@example.com",
                    "password": "$2a$10$Yxrxlf8.uVNrnfxgfflfCe1KWFgxZOOZxc9E2X6806ZEuW4LH5WbW",
                    "isAdmin": true,
                    "image": null,
                    "createdAt": "2022-02-15T03:53:45.000Z",
                    "updatedAt": "2022-02-15T03:53:45.000Z"
                }
            },
            {
                "id": 101,
                "text": "Neque est aliquid modi.",
                "UserId": 1,
                "RestaurantId": 1,
                "createdAt": "2022-02-15T03:53:45.000Z",
                "updatedAt": "2022-02-15T03:53:45.000Z",
                "User": {
                    "id": 1,
                    "name": "root",
                    "email": "root@example.com",
                    "password": "$2a$10$Yxrxlf8.uVNrnfxgfflfCe1KWFgxZOOZxc9E2X6806ZEuW4LH5WbW",
                    "isAdmin": true,
                    "image": null,
                    "createdAt": "2022-02-15T03:53:45.000Z",
                    "updatedAt": "2022-02-15T03:53:45.000Z"
                }
            },
            {
                "id": 1,
                "text": "Minima a nihil nam sed similique adipisci fugiat necessitatibus eum.",
                "UserId": 2,
                "RestaurantId": 1,
                "createdAt": "2022-02-15T03:53:45.000Z",
                "updatedAt": "2022-02-15T03:53:45.000Z",
                "User": {
                    "id": 2,
                    "name": "user1",
                    "email": "user1@example.com",
                    "password": "$2a$10$Qm5VdQxvP1RW.FwtkSx3Je1dThQIrZmMld2Hr2YwetRIXvESBr70q",
                    "isAdmin": false,
                    "image": null,
                    "createdAt": "2022-02-15T03:53:45.000Z",
                    "updatedAt": "2022-02-15T03:53:45.000Z"
                }
            }
        ]
    },
    "isFavorited": false,
    "isLiked": false
}

const dummyUser = {
  currentUser: {
    id: 1,
    name: '管理者',
    email: 'root@example.com',
    image: 'https://i.pravatar.cc/300',
    isAdmin: true
  },
  isAuthenticated: true
}

export default {
  components: {
    RestaurantDetail,
    RestaurantComments,
    CreateComment,
  },
  data() {
    return {
      restaurant: {
        id: -1,
        name: '',
        categoryName: '',
        image: '',
        openingHours: '',
        tel: '',
        address: '',
        description: '',
        isFavorited: false,
        isLiked: false
      },
      currentUser: dummyUser.currentUser,
      restaurantComments: []
    }
  },
  created () {
    const { id: restaurantId } = this.$route.params
    this.fetchRestaurant(restaurantId)
  },
  methods: {
    fetchRestaurant(restaurantId) {
      console.log('fetchRestaurant id',restaurantId)

      this.restaurant = {
        id: dummyData.restaurant.id,
        name: dummyData.restaurant.name,
        categoryName: dummyData.restaurant.Category.name,
        image: dummyData.restaurant.image,
        openingHours: dummyData.restaurant.opening_hours,
        tel: dummyData.restaurant.tel,
        address: dummyData.restaurant.address,
        description: dummyData.restaurant.description,
        isFavorited: dummyData.isFavorited,
        isLiked: dummyData.isLiked,
      }
      this.restaurantComments = dummyData.restaurant.Comments
    },
    afterDeleteComment (commentId) {
      // 以filter保留未被選擇的comment.id
      this.restaurantComments = this.restaurantComments.filter(comment => comment.id !== commentId)
    },
    afterCreateComment(payload) {
      const { commentId, restaurantId, text } = payload
      this.restaurantComments.push({
        id: commentId,
        RestaurantId: restaurantId,
        User: {
          id: this.currentUser.id,
          name: this.currentUser.name
        },
        text, //text: text 的縮寫
        createdAt: new Date() //直接抓當下的時間
      })
    }
  }
}
</script>