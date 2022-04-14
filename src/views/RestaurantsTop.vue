// ./src/views/RestaurantsTop.vue
<template>
  <div class="main-container">
    <JumbotronForTop10 />
    <NavTabs />
    <div class="card-container row cards">
      <Spinner v-if="isLoading" />
      <template v-else>
        <div class="row cards">
          <div
            class="card col-md-6 col-lg-4 my-3"
            v-for="restaurant in restaurants"
            :key="restaurant.id"
          >
            <div class="content-border">
              <img class="card-img-top" :src="restaurant.image" />
              <div class="card-body">
                <p class="title my-1">
                  <router-link
                    class="title"
                    :to="{ name: 'restaurant', params: { id: restaurant.id } }"
                  >
                    {{ restaurant.name }}
                  </router-link>
                </p>
                <span class="badge badge-secondary"
                  >{{ restaurant.FavoriteCount }} person adds this to the
                  collection.
                </span>
                <div class="card-footer mt-3">
                    <router-link
                    href="#"
                    class="btn btn-info mr-3"
                    :to="{ name: 'restaurant', params: { id: restaurant.id } }"
                    >
                    MORE
                    </router-link>
                  <button
                    v-if="restaurant.isFavorited"
                    type="button"
                    class="btn btn-danger mr-2"
                    @click.stop.prevent="deleteFavorite(restaurant.id)"
                  >
                    Remove collection
                  </button>
                  <button
                    v-else
                    type="button"
                    class="btn btn-primary"
                    @click.stop.prevent="addFavorite(restaurant.id)"
                  >
                    Add to collection
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import NavTabs from "./../components/NavTabs.vue";
import restaurantsAPI from "./../apis/restaurants";
import usersAPI from "./../apis/users";
import { Toast } from "./../utils/helpers";
import { emptyImageFilter } from "./../utils/mixins";
import Spinner from "./../components/Spinner";
import JumbotronForTop10 from "./../components/JumbotronForTop10";

export default {
  mixins: [emptyImageFilter],
  components: {
    NavTabs,
    Spinner,
    JumbotronForTop10,
  },
  data() {
    return {
      restaurants: [],
      isLoading: true,
    };
  },
  created() {
    this.fetchRestaurants();
  },
  methods: {
    async fetchRestaurants() {
      try {
        this.isLoading = true;

        const { data } = await restaurantsAPI.getTopRestaurants();
        console.log(data);
        if (data.status === "error") {
          throw new Error(data.message);
        }
        this.restaurants = data.restaurants;
        this.isLoading = false;
      } catch (error) {
        console.log("error", error);
        this.isLoading = false;
        Toast.fire({
          icon: "error",
          title: "無法取得熱門餐廳資料，請稍後再試",
        });
      }
    },
    async addFavorite(restaurantId) {
      try {
        const { data } = await usersAPI.addFavorite({ restaurantId });

        if (data.status !== "success") {
          throw new Error(data.message);
        }
        this.restaurants = this.restaurants.map((restaurant) => {
          if (restaurant.id !== restaurantId) {
            return restaurant;
          }
          return {
            ...restaurant, // 保留餐廳內原有資料
            isFavorited: true,
            FavoriteCount: restaurant.FavoriteCount + 1,
          };
        });
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法將餐廳加入最愛，請稍後再試",
        });
        console.log("error", error);
      }
    },
    async deleteFavorite(restaurantId) {
      try {
        const { data } = await usersAPI.deleteFavorite({ restaurantId });
        if (data.status !== "success") {
          throw new Error(data.message);
        }
        this.restaurants = this.restaurants.map((restaurant) => {
          if (restaurant.id !== restaurantId) {
            return restaurant;
          }
          return {
            ...restaurant, // 保留餐廳內原有資料
            isFavorited: false,
            FavoriteCount: restaurant.FavoriteCount - 1,
          };
        });
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法將餐廳移除最愛，請稍後再試",
        });
        console.log("error", error);
      }
    },
  },
};
</script>

<style scoped>
.cards {
  animation: zoomIn;
  animation-duration: 3s;
}

.card:hover .content-border {
  box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  border: 1px solid #8c0303;
}

.card:hover .badge {
  color: #f28705;
}

.title ::after {
  height: 2px;
}

.content-border {
  border: 1px solid #d5cec0;
  border-radius: 3px;
  padding: 30px;
  margin: 10px 0;
}

.card-body {
  padding: 0;
  justify-content: space-around;
}

.title {
  display: inline-block;
  font-size: 30px;
  font-weight: 600;
  text-decoration: none;
  color: #595959;
}

.badge.badge-secondary {
  color: #8c0303;
  background-color: transparent;
  font-size: 18px;
  font-weight: 400;
  margin: 5px 0;
  padding: 0;
  letter-spacing: 0.2px;
}

.btn {
  font-size: 16px;
}

</style>