// ./src/components/RestaurantCard.vue
<template>
  <div 
  class="col-md-6 col-lg-4">
    <div v-show="!isLoading" class="card my-3">
      <img
        class="card-img-top"
        :src="restaurant.image"
        alt="Card image cap"
        @load="changeLoading"
      />
      <div class="card-body">
        <p class="title my-1">
          <router-link
            class="title"
            :to="{ name: 'restaurant', params: { id: restaurant.id } }"
          >
            {{ restaurant.name }}
          </router-link>
        </p>
        <span class="badge badge-secondary card-text">
          {{ restaurant.Category ? restaurant.Category.name : "未分類" }}
        </span>
        <p class="card-text text-truncate">
          {{ restaurant.description }}
        </p>
      </div>
      <div class="card-footer mt-3">
        <button
          v-if="restaurant.isFavorited"
          type="button"
          class="card-btn btn btn-outline-info favorite mr-3"
          :disabled="isProcessing"
          @click.stop.prevent="deleteFavorite(restaurant.id)"
        >
          Remove collection
        </button>
        <button
          v-else
          type="button"
          class="card-btn btn btn-info favorite mr-3"
          :disabled="isProcessing"
          @click.stop.prevent="addFavorite(restaurant.id)"
        >
          Add to collection
        </button>
        <button
          v-if="restaurant.isLiked"
          type="button"
          class="card-btn btn btn-danger like mr-3"
          :disabled="isProcessing"
          @click.stop.prevent="deleteLike(restaurant.id)"
        >
          UNLIKE
        </button>
        <button
          v-else
          type="button"
          class="card-btn btn btn-outline-danger like mr-2"
          :disabled="isProcessing"
          @click.stop.prevent="addLike(restaurant.id)"
        >
          LIKE
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import usersAPI from "./../apis/users";
import { Toast } from "./../utils/helpers";

export default {
  props: {
    initialRestaurant: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      restaurant: this.initialRestaurant,
      isLoading: true,
      isProcessing: false,
    };
  },
  methods: {
    changeLoading(event) {
      console.log("event", event);
      this.isLoading = false;
    },
    async addFavorite(restaurantId) {
      try {
        this.isProcessing = true;
        const { data } = await usersAPI.addFavorite({ restaurantId });
        if (data.status !== "success") {
          throw new Error(data.message);
        }

        this.restaurant = {
          ...this.restaurant, // 保留餐廳內原有資料
          isFavorited: true,
        };
        this.isProcessing = false;
      } catch (error) {
        this.isProcessing = false;
        Toast.fire({
          icon: "error",
          title: "無法將餐廳加入最愛，請稍後再試",
        });
      }
    },
    async deleteFavorite(restaurantId) {
      try {
        this.isProcessing = true;
        const { data } = await usersAPI.deleteFavorite({ restaurantId });
        if (data.status !== "success") {
          throw new Error(data.message);
        }
        this.restaurant = {
          ...this.restaurant, // 保留餐廳內原有資料
          isFavorited: false,
        };
        this.isProcessing = false;
      } catch (error) {
        this.isProcessing = false;
        Toast.fire({
          icon: "error",
          title: "無法將餐廳移除最愛，請稍後再試",
        });
      }
    },
    async addLike(restaurantId) {
      try {
        this.isProcessing = true;
        const { data } = await usersAPI.addLike({ restaurantId });

        if (data.status !== "success") {
          throw new Error(data.message);
        }

        this.restaurant = {
          ...this.restaurant,
          isLiked: true,
        };
        this.isProcessing = false;
      } catch (error) {
        this.isProcessing = false;
        Toast.fire({
          icon: "error",
          title: "無法對餐廳按讚，請稍後再試",
        });
      }
    },
    async deleteLike(restaurantId) {
      try {
        this.isProcessing = true;
        const { data } = await usersAPI.deleteLike({ restaurantId });

        if (data.status !== "success") {
          throw new Error(data.message);
        }

        this.restaurant = {
          ...this.restaurant,
          isLiked: false,
        };
        this.isProcessing = false;
      } catch (error) {
        this.isProcessing = false;
        Toast.fire({
          icon: "error",
          title: "無法對餐廳取消按讚，請稍後再試",
        });
      }
    },
  },
};
</script>

<style scoped>
.col-md-6 {
  animation: zoomIn; 
  animation-duration: 3s;
}

.card {
  width: 100%;
  height: 520px;
  padding: 30px 30px 10px 30px;
  border: 1px solid #D5CEC0;
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

.title ::after {
  height: 2px;
}

.badge.badge-secondary {
  color: #8C0303;
  background-color: transparent;
  font-size: 20px;
  font-weight: 400;
  padding: 0;
  letter-spacing: 0.2px;
}

.card-text {
  color: #595959;
}

.card:hover {
  box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  border: 1px solid #8c0303;
}

.card:hover .text-truncate {
  color: black;
}

.card-btn {
  font-size: 16px;
}

.btn,
.btn-border.btn:hover {
  margin: 7px 14px 7px 0;
}


</style>