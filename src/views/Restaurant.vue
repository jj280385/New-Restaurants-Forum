<template>
  <div class="container py-5">
    <h1>餐廳描述頁</h1>
    <!-- 餐廳資訊頁 RestaurantDetail -->
    <RestaurantDetail :initial-restaurant="restaurant" />
    <hr />
    <!-- 餐廳評論 RestaurantComments -->
    <RestaurantComments
      :restaurant-comments="restaurantComments"
      @after-delete-comment="afterDeleteComment"
    />
    <!-- 新增評論 CreateComment -->
    <CreateComment
      :restaurant-id="restaurant.id"
      @after-create-comment="afterCreateComment"
    />
  </div>
</template>

<script>
import RestaurantDetail from "./../components/RestaurantDetail.vue";
import RestaurantComments from "./../components/RestaurantComments.vue";
import CreateComment from "./../components/CreateComment.vue";

const dummyData = {
  restaurant: {
    id: 1,
    name: "Albert Gottlieb DVM",
    tel: "747-225-7090",
    address: "76818 Jerde Course",
    opening_hours: "08:00",
    description:
      "Officiis repellat repellendus reiciendis dolore esse.\nIpsa culpa ducimus voluptatum tenetur.",
    image:
      "https://loremflickr.com/320/240/restaurant,food/?random=52.83383915249684",
    viewCounts: 1,
    createdAt: "2021-12-29T15:47:04.000Z",
    updatedAt: "2022-01-02T04:51:51.184Z",
    CategoryId: 4,
    Category: {
      id: 4,
      name: "墨西哥料理",
      createdAt: "2021-12-29T15:47:04.000Z",
      updatedAt: "2021-12-29T15:47:04.000Z",
    },
    FavoritedUsers: [],
    LikedUsers: [],
    Comments: [
      {
        id: 101,
        text: "Adipisci et ipsam eos et numquam suscipit qui repellendus.",
        UserId: 2,
        RestaurantId: 1,
        createdAt: "2021-12-29T15:47:04.000Z",
        updatedAt: "2021-12-29T15:47:04.000Z",
        User: {
          id: 2,
          name: "user1",
          email: "user1@example.com",
          password:
            "$2a$10$gjUFXuaSmM3c/LGWVXPfFOXWbVdyvvQOOBPOd7BxRTlBc9pYXJvPy",
          isAdmin: false,
          image: null,
          createdAt: "2021-12-29T15:47:04.000Z",
          updatedAt: "2021-12-29T15:47:04.000Z",
        },
      },
      {
        id: 51,
        text: "Et non ipsa et officia quidem recusandae nobis nihil voluptatibus.",
        UserId: 1,
        RestaurantId: 1,
        createdAt: "2021-12-29T15:47:04.000Z",
        updatedAt: "2021-12-29T15:47:04.000Z",
        User: {
          id: 1,
          name: "root",
          email: "root@example.com",
          password:
            "$2a$10$wXsyGVxev3nf2zq2/40lM./bLZM2oXS6A7XCs5e40W/bRA1V4.58.",
          isAdmin: true,
          image: null,
          createdAt: "2021-12-29T15:47:04.000Z",
          updatedAt: "2021-12-29T15:47:04.000Z",
        },
      },
      {
        id: 1,
        text: "Ipsa rerum voluptatibus voluptatem sit.",
        UserId: 3,
        RestaurantId: 1,
        createdAt: "2021-12-29T15:47:04.000Z",
        updatedAt: "2021-12-29T15:47:04.000Z",
        User: {
          id: 3,
          name: "user2",
          email: "user2@example.com",
          password:
            "$2a$10$ht637wTD5MbNfDCBaUhX7e4OGv9SsBaXT7Y51l8eZ9dcFDgqe2/xu",
          isAdmin: false,
          image: null,
          createdAt: "2021-12-29T15:47:04.000Z",
          updatedAt: "2021-12-29T15:47:04.000Z",
        },
      },
    ],
  },
  isFavorited: false,
  isLiked: false,
};
const dummyUser = {
  currentUser: {
    id: 1,
    name: "管理者",
    email: "root@example.com",
    image: "https://i.pravatar.cc/300",
    isAdmin: true,
  },
  isAuthenticated: true,
};
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
        name: "",
        categoryName: "",
        image: "",
        openingHours: "",
        tel: "",
        address: "",
        description: "",
        isFavorited: false,
        isLiked: false,
        // restaurantComments: [],
      },
      currentUser: dummyUser.currentUser,
      restaurantComments: [],
    };
  },
  created() {
    const { id: restaurantId } = this.$route.params;
    this.fetchRestaurant(restaurantId);
  },
  methods: {
    fetchRestaurant(restaurantId) {
      console.log("fetchRestaurant id:", restaurantId);
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
        restaurantComments: dummyData.restaurant.Comments,
      };
      const {
        restaurant: { Comments },
      } = dummyData;
      this.restaurantComments = Comments;
    },
    afterDeleteComment(commentId) {
      this.restaurantComments = this.restaurantComments.filter(
        (comment) => comment.id != commentId
      );
      // console.log('r',this.restaurantComments)
    },
    afterCreateComment(payload) {
      const { commentId, restaurantId, text } = payload;
      this.restaurantComments.push({
        id: commentId,
        RestaurantId: restaurantId,
        User: {
          id: this.currentUser.id,
          name: this.currentUser.name,
        },
        text,
        createdAt: new Date(),
      });
      console.log("r", this.restaurantComments);
    },
  },
};
</script>