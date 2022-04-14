// ./src/views/RestaurantDetail.vue
<template>
  <div class="row">
    <div class="col-md-12">
      <div class="header mx-4">
        <div class="left-column pl-5">
          <h1 class="restaurant-title">{{ restaurant.name }}</h1>
          <p class="badge badge-secondary category-name">
            {{ restaurant.categoryName }}
          </p>
        </div>
        <div class="description-content">
          {{ restaurant.description }}
        </div>
      </div>
      <div class="btn-area py-4 mx-3 my-3">
        <router-link
          class="btn btn-outline-warning dashboard my-2 mr-3"
          :to="{
            name: 'restaurant-dashboard',
            params: { id: restaurant.id },
          }"
        >
          Dashboard
        </router-link>
        <button
          v-if="restaurant.isFavorited"
          type="button"
          class="btn btn-outline-info collection mr-3"
          @click.stop.prevent="deleteFavorite(restaurant.id)"
        >
          Remove collection
        </button>
        <button
          v-else
          type="button"
          class="btn btn-info collection mr-3"
          @click.stop.prevent="addFavorite(restaurant.id)"
        >
          Add to collection
        </button>
        <button
          v-if="restaurant.isLiked"
          type="button"
          class="btn btn-danger like mr-3"
          @click.stop.prevent="deleteLike(restaurant.id)"
        >
          UNLIKE
        </button>
        <button
          v-else
          type="button"
          class="btn btn-outline-danger like mr-3"
          @click.stop.prevent="addLike(restaurant.id)"
        >
          LIKE
        </button>
      </div>
    </div>
    <div class="info-img col-lg-12">
      <div class="col-lg-6 open-info px-5 ">
        <div class="contact-info-wrap ">
          <ul class="list-unstyled">
            <li>
              <strong>Opening Hour :</strong>
              {{ restaurant.openingHours }}
            </li>
            <li>
              <strong>Tel:</strong>
              {{ restaurant.tel }}
            </li>
            <li>
              <strong>Address:</strong>
              {{ restaurant.address }}
            </li>
          </ul>
        </div>
      </div>
      <div class="col-lg-6 img">
        <img
          class="img-responsive center-block"
          :src="restaurant.image | emptyImage"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { emptyImageFilter } from "./../utils/mixins";
import usersAPI from "./../apis/users";
import { Toast } from "./../utils/helpers";

export default {
  mixins: [emptyImageFilter],
  props: {
    initialRestaurant: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      restaurant: this.initialRestaurant,
    };
  },
  watch: {
    initialRestaurant(newValue) {
      this.restaurant = {
        ...this.restaurant,
        ...newValue,
      };
    },
  },
  methods: {
    async addFavorite(restaurantId) {
      try {
        const { data } = await usersAPI.addFavorite({ restaurantId });

        if (data.status === "error") {
          throw new Error(data.message);
        }

        this.restaurant = {
          ...this.restaurant, // 保留餐廳內原有資料
          isFavorited: true,
        };
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法將餐廳加入最愛，請稍後再試",
        });
      }
    },
    async deleteFavorite(restaurantId) {
      try {
        const { data } = await usersAPI.deleteFavorite({ restaurantId });
        if (data.status !== "success") {
          throw new Error(data.message);
        }
        this.restaurant = {
          ...this.restaurant, // 保留餐廳內原有資料
          isFavorited: false,
        };
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法將餐廳移除最愛，請稍後再試",
        });
      }
    },
    async addLike(restaurantId) {
      try {
        const { data } = await usersAPI.addLike({ restaurantId });

        if (data.status !== "success") {
          throw new Error(data.message);
        }

        this.restaurant = {
          ...this.restaurant,
          isLiked: true,
        };
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法對餐廳按讚，請稍後再試",
        });
      }
    },
    async deleteLike(restaurantId) {
      try {
        const { data } = await usersAPI.deleteLike({ restaurantId });

        if (data.status !== "success") {
          throw new Error(data.message);
        }

        this.restaurant = {
          ...this.restaurant,
          isLiked: false,
        };
      } catch (error) {
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
.main-container:hover .description-content {
  border-left: 2px solid #f28705;
  transition-duration: 2s;
}

.header, .left-column, .btn-area, .info-img,
.img, .col-lg-6 {
  display: flex;
}

.header, .btn-area, .col-lg-6  {
  align-items: center;
}

.col-lg-6 {
  padding: 30px;
}

.col-md-12 {
  height: 100%;
}

.header {
  height: 75%;
}

.left-column {
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
}

.restaurant-title {
  display: inline-block;
  font-size: 80px;
  font-weight: 700;
  text-decoration: none;
  color: #595959;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.category-name {
  font-size: 28px;
  margin: 5px 0;
  color: #8c0303;
  background-color: transparent;
  font-family: serif;
}

.btn-area {
  justify-content: center;
  border-top: 1px solid #595959;
  border-bottom: 1px solid #595959;
}

.btn {
  font-size: 20px;
}

.like,
.collection,
.dashboard {
  width: 25%;
}

.description-content {
  border-left: 2px solid #595959;
  margin: 8%;
  padding-left: 30px;
  font-size: 20px;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
}

.img {
  object-fit: cover;
  justify-content: flex-end;
}

img { 
  width: 500px;
  height: 300px;
  opacity: 0.8;
  border-radius: 3px;
}

.col-lg-6 p,
.contact-info-wrap strong {
  font-family: serif;
  font-size: 30px;
  margin-bottom: 10px;
}

.contact-info-wrap li {
  font-size: 20px;
}
</style>