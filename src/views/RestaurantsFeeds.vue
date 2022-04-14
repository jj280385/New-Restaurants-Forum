// ./src/views/RestaurantsFeeds.vue
<template>
  <div class="main-container">
    <JumbotronForFeed />
    <div class="card-container">
      <!-- 使用 NavTabs 元件 -->
      <NavTabs />
      <Spinner v-if="isLoading" />
      <template v-else>
        <!-- <h1 class="mt-5">最新動態</h1>
        <hr /> -->
        <div class="row">
          <div 
          class="col-md-6">
            <!-- 最新餐廳 NewestRestaurants -->
            <NewestRestaurants :restaurants="restaurants" />
          </div>
          <div 
          class="col-md-6">
            <!-- 最新評論 NewestComments-->
            <NewestComments :comments="comments" />
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import NavTabs from "./../components/NavTabs.vue";
import NewestRestaurants from "./../components/NewestRestaurants";
import NewestComments from "./../components/NewestComments";
import restaurantsAPI from "./../apis/restaurants";
import { Toast } from "./../utils/helpers";
import Spinner from "./../components/Spinner";
import JumbotronForFeed from "./../components/JumbotronForFeed";

export default {
  components: {
    NavTabs,
    NewestRestaurants,
    NewestComments,
    Spinner,
    JumbotronForFeed,
  },
  data() {
    return {
      restaurants: [],
      comments: [],
      isLoading: true,
    };
  },
  created() {
    this.fetchFeeds();
  },
  methods: {
    async fetchFeeds() {
      try {
        const { data, statusText } = await restaurantsAPI.getFeeds();

        if (statusText !== "OK") {
          throw new Error(statusText);
        }

        this.restaurants = data.restaurants;
        this.comments = data.comments.filter((comment) => comment.Restaurant);
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        Toast.fire({
          icon: "error",
          title: "無法取得最新動態，請稍後再試",
        });
      }
    },
  },
};
</script>

<style scoped>
h2 {
  border: 1px solid #D5CEC0;
  border-radius: 5px 5px 0 0;
  width: 25%;
  padding: 10px 0;
  margin-bottom: 0;
  text-align: center;
}

.col-md-6 {
  animation: zoomIn; 
  animation-duration: 3s;
}
</style>