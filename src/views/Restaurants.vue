// ./src/views/Restaurants.vue
// 首頁 全部餐廳列表
<template>
  <div class="main-container">
    <JumbotronHome />
    <!-- NavTabs for RWD >576px -->
    <NavTabs />
    <!-- BottomNavTabs for RWD <576px -->
    <BottomNavTabs class="bottom-nav" />
    <div class="card-container">
      <Spinner v-if="isLoading" />
      <template v-else>
        <!-- 餐廳類別標籤 RestaurantsNavPills -->
        <RestaurantsNavPills :categories="categories" />
        <div class="row cards">
          <!-- 餐廳卡片 RestaurantCard-->
          <RestaurantCard
            v-for="restaurant in restaurants"
            :key="restaurant.id"
            :initial-restaurant="restaurant"
          />
        </div>

        <!-- 分頁標籤 RestaurantPagination -->
        <RestaurantsPagination
          v-if="totalPage.length > 1"
          :current-page="currentPage"
          :total-page="totalPage"
          :category-id="categoryId"
          :previous-page="previousPage"
          :next-page="nextPage"
        />
        <div v-if="restaurants.length < 1" class="no-restaurant">
          ～ 此類別目前無餐廳資料 ～
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import NavTabs from "./../components/NavTabs.vue";
import RestaurantCard from "./../components/RestaurantCard.vue";
import RestaurantsNavPills from "./../components/RestaurantsNavPills";
import RestaurantsPagination from "./../components/RestaurantsPagination";
import restaurantsAPI from "./../apis/restaurants";
import { Toast } from "./../utils/helpers";
import Spinner from "./../components/Spinner";
import JumbotronHome from "./../components/JumbotronHome";
import BottomNavTabs from "./../components/BottomNavTabs.vue";

export default {
  components: {
    NavTabs,
    RestaurantCard,
    RestaurantsNavPills,
    RestaurantsPagination,
    Spinner,
    JumbotronHome,
    BottomNavTabs,
  },
  data() {
    return {
      restaurants: [],
      categories: [],
      categoryId: -1,
      currentPage: 1,
      totalPage: 0,
      previousPage: -1,
      nextPage: -1,
      isLoading: true,
    };
  },
  created() {
    const { page = "", categoryId = "" } = this.$route.query;
    this.fetchRestaurants({ queryPage: page, queryCategoryId: categoryId });
  },
  // 使用 beforeRouteUpdate 方法取得使用者路由變化
  beforeRouteUpdate(to, from, next) {
    const { page = "", categoryId = "" } = to.query;
    this.fetchRestaurants({ queryPage: page, queryCategoryId: categoryId });
    next();
  },
  methods: {
    async fetchRestaurants({ queryPage, queryCategoryId }) {
      try {
        this.isLoading = true;
        const response = await restaurantsAPI.getRestaurants({
          page: queryPage,
          categoryId: queryCategoryId,
        });
        const {
          restaurants,
          categories,
          categoryId,
          page,
          totalPage,
          prev,
          next,
        } = response.data;
        this.restaurants = restaurants;
        this.categories = categories;
        this.categoryId = categoryId;
        this.currentPage = page;
        this.totalPage = totalPage;
        this.previousPage = prev;
        this.nextPage = next;
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
@media (min-width: 576px) {
  .bottom-nav, .page-title {
    display: none;
  }
}
</style>
