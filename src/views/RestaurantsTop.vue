<template>
  <div class="container py-5">
    <NavTabs />
    <h1 class="mt-5">人氣餐廳</h1>
    <hr />
    <div class="card mb-3" style="max-width: 540px; margin: auto">
      <div
        v-for="restaurant in topRestaurants"
        :key="restaurant.id"
        class="row no-gutters"
      >
        <div class="col-md-4">
          <a :href="restaurant.image">
            <img class="card-img" :src="restaurant.image" />
          </a>
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">Mrs. Mckenzie Johnston</h5>
            <span class="badge badge-secondary"
              >收藏數：{{ restaurant.FavoriteCount }}</span
            >
            <p class="card-text">
              {{ restaurant.description }}
            </p>
            <a href="#" class="btn btn-primary mr-2">Show</a>

            <button
              v-if="restaurant.isFavorited"
              @click.stop.prevent="removeFavorited(restaurant.id)"
              type="button"
              class="btn btn-danger mr-2"
            >
              移除最愛
            </button>
            <button
              v-else
              @click.stop.prevent="addFavorited(restaurant.id)"
              type="button"
              class="btn btn-primary"
            >
              加到最愛
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import NavTabs from "./../components/NavTabs.vue";
import { Toast } from "./../utils/helpers";
import restaurantAPI from "./../apis/restaurants";
import usersAPI from "./../apis/users";

export default {
  components: {
    NavTabs,
  },
  data() {
    return {
      topRestaurants: [],
    };
  },
  created() {
    this.fetchRestaurants();
  },
  methods: {
    async fetchRestaurants() {
      try {
        const { data } = await restaurantAPI.getTopRestaurant();
        const { restaurants } = data;
        if (data.status === "error") {
          throw new Error(data.message);
        }
        console.log("topRestaurants", data);
        this.topRestaurants = restaurants;
        this.topRestaurants = this.topRestaurants.map((restaurant) => {
          return {
            id: restaurant.id,
            image: restaurant.image,
            FavoriteCount: restaurant.FavoriteCount,
            description: restaurant.description,
            isFavorited: restaurant.isFavorited,
          };
        });
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "無法成功載入餐廳資料，請稍候！",
        });
      }
    },
    async addFavorited(restaurantId) {
      try {
        const { data } = await usersAPI.addFavorite({ restaurantId });
        console.log("data", data);

        if (data.status === "error") {
          throw new Error(data.message);
        }
        this.topRestaurants = this.topRestaurants
          .map((restaurant) => {
            if (restaurant.id === restaurantId) {
              return {
                ...restaurant,
                FavoriteCount: restaurant.FavoriteCount + 1,
                isFavorited: true,
              };
            } else {
              return restaurant;
            }
          })
          .sort((a, b) => b.FavoriteCount - a.FavoriteCount);
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "無法成功加入最愛，請稍候！",
        });
      }
    },
    async removeFavorited(restaurantId) {
      try {
        const { data } = await usersAPI.deleteFavorite({ restaurantId });
        if (data.status === "error") {
          throw new Error(data.message);
        }
        this.topRestaurants = this.topRestaurants
          .map((restaurant) => {
            if (restaurant.id === restaurantId) {
              return {
                ...restaurant,
                FavoriteCount: restaurant.FavoriteCount - 1,
                isFavorited: false,
              };
            } else {
              return restaurant;
            }
          })
          .sort((a, b) => b.FavoriteCount - a.FavoriteCount);
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "無法成功移除最愛，請稍候！",
        });
      }
    },
  },
};
</script>