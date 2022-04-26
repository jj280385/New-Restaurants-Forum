// ./src/views/RestaurantsTop.vue
<template>
  <div class="main-container">
    <JumbotronForTop10 />
    <!-- NavTabs for RWD >576px -->
    <NavTabs />
    <!-- BottomNavTabs for RWD <576px -->
    <BottomNavTabs class="bottom-nav" />
    <div class="card-container row px-3">
      <Spinner v-if="isLoading" class="spinner" />
      <template v-else>
        <div class="page-title ml-4">
          <span> TOP 10 RESTAURANTS </span>
          <p>● Click the MORE button to see more information.</p>
        </div>
        <div class="row cards">
          <div
            class="card col-sm-6 col-md-6 col-lg-4"
            v-for="restaurant in restaurants"
            :key="restaurant.id"
          >
            <div class="content-border">
              <div class="card-body">
                <img class="card-img-top" :src="restaurant.image" />
                <div class="restaurant-title">
                  <p class="title my-1">
                    <router-link
                      class="title"
                      :to="{
                        name: 'restaurant',
                        params: { id: restaurant.id },
                      }"
                    >
                      {{ restaurant.name }}
                    </router-link>
                  </p>
                  <span class="badge badge-secondary"
                    >In {{ restaurant.FavoriteCount }} person's collection
                  </span>
                </div>
              </div>
              <div class="card-footer mt-3">
                <router-link
                  href="#"
                  class="btn btn-outline-warning mr-3 mb-2"
                  :to="{ name: 'restaurant', params: { id: restaurant.id } }"
                >
                  MORE
                </router-link>
                <button
                  v-if="restaurant.isFavorited"
                  type="button"
                  class="btn btn-info mr-2 mb-2"
                  @click.stop.prevent="deleteFavorite(restaurant.id)"
                >
                  Remove collection
                </button>
                <button
                  v-else
                  type="button"
                  class="btn btn-outline-info mb-2"
                  @click.stop.prevent="addFavorite(restaurant.id)"
                >
                  Add to collection
                </button>
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
import BottomNavTabs from "./../components/BottomNavTabs.vue";

export default {
  mixins: [emptyImageFilter],
  components: {
    NavTabs,
    Spinner,
    JumbotronForTop10,
    BottomNavTabs,
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

        if (data.status === "error") {
          throw new Error(data.message);
        }
        this.restaurants = data.restaurants;
        this.isLoading = false;
      } catch (error) {
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

        Toast.fire({
          icon: "success",
          title: "已成功將此餐廳加入collection",
        });
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法將餐廳加入collection中，請稍後再試",
        });
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

        Toast.fire({
          icon: "success",
          title: "已從collection中取消該餐廳",
        });
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法將餐廳從collection中移除，請稍後再試",
        });
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

.card {
  border: none;
}

.content-border {
  border: 1px solid #d5cec0;
  height: 100%;
}

.card:hover .content-border {
  box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  border: 1px solid #8c0303;
  transition-duration: 1s;
}

.card:hover .badge {
  color: #f28705;
  transition-duration: 1s;
}

.card:hover .title {
  color: black;
}

.card-body {
  padding: 0;
  justify-content: space-around;
}

.title ::after {
  height: 2.2px;
}

.title {
  display: inline-block;
  font-weight: 600;
  text-decoration: none;
  color: #595959;
}

.badge.badge-secondary {
  color: #8c0303;
  background-color: transparent;
  font-weight: 400;
  margin: 5px 0;
  padding: 0;
  letter-spacing: 0.2px;
}

span {
  font-size: 40px;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  font-weight: 500;
}

p {
  font-style: italic;
  width: 85%;
}

@media (max-width: 575px) {
  .card-container {
    margin-top: 15%;
  }

  .card {
    margin: 15px 0;
  }

  .content-border {
    padding: 10px;
  }

  .card-body {
    display: flex;
    flex-direction: row;
  }

  .restaurant-title {
    width: 50%;
    height: 100%;
    margin-left: 10px;
    align-items: flex-start;
    animation: fadeInRight;
    animation-duration: 2s;
  }

  .title {
    font-size: 34px;
    font-weight: 500;
  }

  .badge {
    font-size: 18px;
    margin-top: 15px;
    font-style: italic;
  }

  .card-footer {
    display: flex;
    align-items: center;
  }

  .btn {
    font-size: 14px;
  }
}

@media (min-width: 576px) {
  .bottom-nav,
  .page-title {
    display: none;
  }
}

@media (min-width: 576px) and (max-width: 767px) {
  .card-container {
    margin-top: 3%;
  }

  .col-sm-6 {
    padding: 0;
  }

  .card {
    width: 350px;
    padding: 15px;
    height: fit-content;
  }

  .content-border {
    padding: 15px;
  }

  .title {
    font-size: 36px;
  }

  .badge.badge-secondary {
    font-size: 22px;
  }

  .btn {
    font-size: 14px;
  }
}

@media (min-width: 768px) and (max-width: 991px) {
  .card-container {
    margin-top: 3%;
  }

  .col-md-6 {
    padding: 0;
  }

  .card {
    width: 85%;
    padding: 15px 20px;
    height: fit-content;
  }

  .content-border {
    padding: 18px;
    height: 100%;
  }

  .title {
    font-size: 38px;
  }

  .badge.badge-secondary {
    font-size: 24px;
  }

  .btn {
    font-size: 16px;
  }
}

@media (min-width: 992px) {
  .card-container {
    margin-top: 5%;
  }

  .card {
    width: 100%;
    padding: 0 20px;
    height: fit-content;
  }

  .content-border {
    width: 100%;
    height: 100%;
    border: 1px solid #d5cec0;
    border-radius: 3px;
    padding: 15px;
    margin: 15px 0;
  }

  .card-body {
    padding: 0;
    justify-content: space-around;
  }

  .title {
    font-size: 40px;
  }

  .badge.badge-secondary {
    font-size: 20px;
  }

  .btn {
    font-size: 18px;
  }
}

@media (min-width: 1439px) {
  .card-container {
    margin-top: 3%;
  }

  .card {
    width: 100%;
    padding: 0 20px;
    height: fit-content;
  }

  .content-border {
    width: 100%;
    border: 1px solid #d5cec0;
    border-radius: 3px;
    padding: 15px;
    margin: 15px 0;
  }

  .title {
    font-size: 45px;
  }

  .title ::after {
    height: 2.5px;
  }

  .badge.badge-secondary {
    font-size: 25px;
  }

  .btn {
    font-size: 20px;
  }
}
</style>