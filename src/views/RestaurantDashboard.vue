<template>
  <div class="main">
    <Spinner v-if="isLoading" class="spinner" />
    <div v-else class="main-container py-5 px-5">
      <template>
        <div class="header pb-4">
          <span class="name">{{ restaurant.name }}</span>
          <span class="badge ml-4">
            {{ restaurant.categoryName }}
          </span>
        </div>
        <ul class="count mt-5">
          <li>Comments count ： {{ restaurant.commentsLength }}</li>
          <li>View count ： {{ restaurant.viewCounts }}</li>
        </ul>
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
import restaurantsAPI from "../apis/restaurants";
import { Toast } from "../utils/helpers";
import Spinner from "./../components/Spinner";
import BottomNavTabsForPage from "./../components/BottomNavTabsForPage";

export default {
  name: "RestaurantDashboard",
  components: {
    Spinner,
    BottomNavTabsForPage,
  },
  data() {
    return {
      restaurant: {
        id: -1,
        name: "",
        categoryName: "",
        commentsLength: 0,
        viewCounts: 0,
      },
      isLoading: true,
    };
  },
  created() {
    const { id: restaurantId } = this.$route.params;
    this.fetchRestaurant(restaurantId);
  },
  beforeRouteUpdate(to, from, next) {
    // 路由改變時重新抓取資料
    const { id } = to.params;
    this.fetchRestaurant(id);
    next();
  },
  methods: {
    async fetchRestaurant(restaurantId) {
      try {
        this.isLoading = true;

        const { data } = await restaurantsAPI.getRestaurant({
          restaurantId,
        });

        if (data.status === "error") {
          throw new Error(data.message);
        }

        const { restaurant } = data;
        this.restaurant = {
          id: restaurant.id,
          name: restaurant.name,
          categoryName: restaurant.Category.name,
          viewCounts: restaurant.viewCounts,
          commentsLength: restaurant.Comments.length,
        };
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;

        Toast.fire({
          icon: "error",
          title: "無法取得餐廳資料，請稍後再試",
        });
      }
    },
  },
};
</script>

<style scoped>
.main-container {
  border: 1px solid #d5cec0;
  border-radius: 3px;
  margin: 10%;
  animation: zoomIn;
  animation-duration: 3s;
}

.main-container:hover {
  border: 1px solid #8c0303;
  box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  transition-duration: 1s;
}

.main-container:hover .name {
  color: black;
}

.main-container:hover .badge {
  color: #f28705;
}

.main-container:hover .header {
  border-bottom: 1px solid #595959;
  transition-duration: 1s;
}

.header {
  display: flex;
  align-items: flex-end;
  border-bottom: 1px solid #d5cec0;
}

.name {
  font-size: 40px;
  font-weight: 600;
  color: #595959;
}

.badge {
  color: #8c0303;
  font-size: 16px;
  padding-bottom: 11px;
  font-family: serif;
}

li {
  font-size: 20px;
  margin-bottom: 10px;
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
</style>