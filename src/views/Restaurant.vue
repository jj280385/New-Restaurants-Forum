// ./src/views/Restaurant.vue
<template>
  <div class="main">
    <Spinner v-if="isLoading" class="spinner" />
    <div v-else class="main-container">
      <template>
        <!-- 餐廳資訊頁 RestaurantDetail -->
        <RestaurantDetail :initial-restaurant="restaurant" />

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
      </template>
    </div>

    <div class="back">
      <button type="button" class="btn btn-link back-btn" @click="$router.back()">
        <img src="./../assets/icons/back.png" class="back-icon">
      </button>
    </div>
    <BottomNavTabsForPage class="bottom-navtabs" />
  </div>
</template>

<script>
import RestaurantDetail from "../components/RestaurantDetail.vue";
import RestaurantComments from "./../components/RestaurantComments";
import CreateComment from "./../components/CreateComment";
import restaurantsAPI from "./../apis/restaurants";
import { Toast } from "./../utils/helpers";
import { mapState } from "vuex";
import Spinner from "./../components/Spinner";
import BottomNavTabsForPage from "./../components/BottomNavTabsForPage";

export default {
  components: {
    RestaurantDetail,
    RestaurantComments,
    CreateComment,
    Spinner,
    BottomNavTabsForPage,
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
      },
      restaurantComments: [],
      isLoading: true,
    };
  },
  created() {
    const { id: restaurantId } = this.$route.params;
    this.fetchRestaurant(restaurantId);
  },
  beforeRouteUpdate(to, from, next) {
    const { id: restaurantId } = to.params;
    this.fetchRestaurant(restaurantId);
    next();
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  methods: {
    async fetchRestaurant(restaurantId) {
      try {
        this.isLoading = true;

        const { data } = await restaurantsAPI.getRestaurant({ restaurantId });

        const { restaurant, isFavorited, isLiked } = data;

        const {
          id,
          name,
          Category,
          image,
          opening_hours,
          tel,
          address,
          description,
          Comments,
        } = restaurant;

        this.restaurant = {
          id,
          name,
          categoryName: Category ? Category.name : "uncategorized",
          image,
          opening_hours,
          tel,
          address,
          description,
          isFavorited,
          isLiked,
        };
        this.restaurantComments = Comments;
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;

        Toast.fire({
          icon: "error",
          title: "無法取得餐廳資料，請稍後再試",
        });
      }
    },
    afterDeleteComment(commentId) {
      // 以filter保留未被選擇的comment.id
      this.restaurantComments = this.restaurantComments.filter(
        (comment) => comment.id !== commentId
      );
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
        text, //text: text 的縮寫
        createdAt: new Date(), //直接抓當下的時間
      });
    },
  },
};
</script>

<style scoped>
.main-container {
  border: 1px solid #d5cec0;
  animation: zoomIn;
  animation-duration: 3s;
}

.main-container:hover {
  box-shadow: 10px 0 20px rgba(0, 0, 0, 0.2);
  border: 1px solid #8c0303;
  border-radius: 10px;
  transition-duration: 1s;
}

@media (max-width: 576px) {
  .back {
    display: none;
  }

  .bottom-navtabs {
    animation: fadeInUp;
    animation-duration: 3s;
  }

  .main-container {
    margin: 20% 0;
    width: 95%;
  }
}

@media (min-width: 576px) {
  .bottom-navtabs {
    display: none;
  }
}

@media (min-width: 576px) and (max-width: 767px) {
  .main-container {
    width: 75%;
  }
}

@media (min-width: 768px) and (max-width: 991px) {
  .main-container {
    width: 75%;
  }
}

@media (min-width: 992px) {
  .main-container {
    width: 75%;
  }
}
</style>

