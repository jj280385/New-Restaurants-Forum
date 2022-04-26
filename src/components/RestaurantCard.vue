// ./src/components/RestaurantCard.vue
<template>
  <div class="col-sm-6 col-md-6 col-lg-4">
    <div v-show="!isLoading" class="card my-3">
      <div class="card-body">
        <img
          class="card-img-top"
          :src="restaurant.image"
          alt="Card image cap"
          @load="changeLoading"
        />
        <div class="info-area">
          <p class="title-content my-1">
            <router-link
              class="title"
              :to="{ name: 'restaurant', params: { id: restaurant.id } }"
            >
              {{ restaurant.name }}
            </router-link>
          </p>
          <span class="badge badge-secondary">
            {{ restaurant.Category ? restaurant.Category.name : "uncategorized" }}
          </span>
          <p class="card-text text-truncate">
            {{ restaurant.description }}
          </p>
        </div>
      </div>
      <div class="card-footer mt-1">
        <button
          v-if="restaurant.isFavorited"
          type="button"
          class="card-btn btn btn-info favorite mr-3"
          :disabled="isProcessing"
          @click.stop.prevent="deleteFavorite(restaurant.id)"
        >
          Remove collection
        </button>
        <button
          v-else
          type="button"
          class="card-btn btn btn-outline-info favorite mr-3"
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
          class="card-btn btn btn-outline-danger like mr-3"
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

        Toast.fire({
          icon: "success",
          title: "已成功將此餐廳加入collection",
        });

        this.isProcessing = false;
      } catch (error) {
        this.isProcessing = false;
        Toast.fire({
          icon: "error",
          title: "無法將餐廳加入collection中，請稍後再試",
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

        Toast.fire({
          icon: "success",
          title: "已從collection中取消該餐廳",
        });

        this.isProcessing = false;
      } catch (error) {
        this.isProcessing = false;
        Toast.fire({
          icon: "error",
          title: "無法將餐廳從collection中移除，請稍後再試",
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

        Toast.fire({
          icon: "success",
          title: "已成功對餐廳按Like",
        });

        this.isProcessing = false;
      } catch (error) {
        this.isProcessing = false;
        Toast.fire({
          icon: "error",
          title: "無法對餐廳按Like，請稍後再試",
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

        Toast.fire({
          icon: "success",
          title: "已對餐廳取消Like",
        });

        this.isProcessing = false;
      } catch (error) {
        this.isProcessing = false;
        Toast.fire({
          icon: "error",
          title: "無法對餐廳取消按Like，請稍後再試",
        });
      }
    },
  },
};
</script>

<style scoped>
.col-sm-6, .col-md-6 {
  animation: zoomIn;
  animation-duration: 3s;
  display: flex;
  justify-content: center;
}

.card {
  border: 1px solid #d5cec0;
}

.card-body {
  padding: 0;
  justify-content: space-around;
}

.title-content {
  width: fit-content;
}

.title-content ::after {
  content: "";
  display: block;
  width: 0;
  background: #f28705;
  transition: width 1s;
}

.title-content :hover::after {
  width: 100%;
}

.title-content ::after {
  height: 2.2px;
}

.title {
  display: inline-block;
  font-weight: 600;
  text-decoration: none;
  color: #595959;
  width: 100%;
}

.badge.badge-secondary {
  color: #8c0303;
  background-color: transparent;
  font-weight: 400;
  padding: 0;
  letter-spacing: 0.2px;
  font-family: serif;
}

.info-area{
  width: 100%;
}

.card-text {
  color: #595959;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: block;
  overflow: hidden;
}

.card:hover {
  box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  border: 1px solid #8c0303;
  transition-duration: 1s;
}

.card:hover .text-truncate,
.card:hover .title {
  color: black;
  transition-duration: 1s;
}

@media (max-width: 575px) {
  .card {
    padding: 10px;
  }

  .card, .info-area {
    display: flex;
    flex-direction: column;
  }

  .card-body, .info-area {
    justify-content: flex-start;
  }

  .card-body {
    display: flex;
    flex-direction: row;
  }

  .info-area {
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
    font-size: 22px;
    margin-top: 15px;
    font-style: italic;
  }

  .card-text {
    width: 90%;
    margin-top: 20px;
  }

  .card-footer {
    display: flex;
    align-items: center;
  }

  .card-btn {
    margin-top: 10px;
    font-size: 16px;
  }
}

@media (min-width: 576px) {
  .card-header {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
}

@media (min-width: 576px) and (max-width: 767px) {
  .card {
    height: 360px;
    padding: 10px 10px 5px 10px;
  }

  .title {
    font-size: 32px;
  }

  .card-text {
    visibility: hidden;
  }

  .badge.badge-secondary {
    font-size: 28px;
  }

  .card-btn {
    font-size: 16px;
  }

  .btn,
  .btn-border.btn:hover {
    margin: 3px 0;
  }
}

@media (min-width: 768px) and (max-width: 991px) {
  .col-md-6 {
    padding: 0;
  }

  .card {
    width: 90%;
    height: 430px;
    padding: 10px 15px 5px 15px;
  }

  .title {
    font-size: 34px;
  }

  .badge.badge-secondary {
    font-size: 30px;
  }

  .card-btn {
    font-size: 15px;
  }

  .btn,
  .btn-border.btn:hover {
    margin: 5px 10px 5px 0;
  }
}

@media (min-width: 992px) {
  .col-md-6 {
    padding-right: 15px;
    padding-left: 15px;
  }

  .card {
    width: 100%;
    height: 520px;
    padding: 10px 15px 10px 15px;
  }

  .title {
    font-size: 34px;
  }

  .badge.badge-secondary {
    font-size: 18px;
  }

  .card-text {
    margin-top: 10px;
  }

  .card-btn {
    font-size: 15px;
  }

  .btn,
  .btn-border.btn:hover {
    margin: 7px 14px 7px 0;
  }
}

@media (min-width: 1439px) {
  .col-md-6 {
    padding-right: 15px;
    padding-left: 15px;
  }

  .card {
    width: 100%;
    height: 580px;
    padding: 10px 20px 10px 20px;
  }

  .title {
    font-size: 40px;
  }

  .title-content ::after {
    height: 2.5px;
  }

  .badge.badge-secondary {
    font-size: 25px;
  }

  .card-btn {
    font-size: 18px;
  }
}
</style>