// ./src/views/RestaurantDetail.vue
<template>
  <div class="row">
    <div class="col-md-12">
      <div class="header mx-4">
        <div class="left-column pl-3">
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
          class="btn btn-info collection mr-3"
          @click.stop.prevent="deleteFavorite(restaurant.id)"
        >
          Remove collection
        </button>
        <button
          v-else
          type="button"
          class="btn btn-outline-info collection mr-3"
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
      <div class="col-lg-6 col-md-6 col-sm-4 open-info px-3">
        <div class="contact-info-wrap">
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
      <div class="col-lg-6 col-md-6 col-sm-8 img">
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
        this.restaurant = {
          ...this.restaurant, // 保留餐廳內原有資料
          isFavorited: false,
        };

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

        Toast.fire({
          icon: "success",
          title: "已成功對餐廳按Like",
        });

      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法對餐廳按Like，請稍後再試",
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

        Toast.fire({
          icon: "success",
          title: "已對餐廳取消Like",
        });

      } catch (error) {
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
.main-container:hover .description-content {
  border-left: 2px solid #f28705;
  transition-duration: 1s;
  color: black;
}

.main-container:hover .btn-area {
  border-top: 1px solid #595959;
  border-bottom: 1px solid #595959;
  transition-duration: 1s;
}

.main-container:hover img {
  border-radius: 10px;
  transition-duration: 1s;
}

.col-md-12 {
  height: 100%;
}

.header, .left-column, .btn-area,
.info-img, .img, .col-lg-6 {
  display: flex;
}

.header, .btn-area, .col-lg-6 {
  align-items: center;
}

.left-column {
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
}

.restaurant-title {
  display: inline-block;
  font-weight: 700;
  text-decoration: none;
  color: #595959;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.category-name {
  color: #8c0303;
  background-color: transparent;
  font-family: serif;
}

.btn-area {
  justify-content: center;
  border-top: 1px solid #d5cec0;
  border-bottom: 1px solid #d5cec0;
}

.description-content {
  border-left: 2px solid #d5cec0;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
}

.img {
  object-fit: cover;
justify-content: center;
}

img {
  width: 100%;
  height: 100%;
  opacity: 0.8;
  border-radius: 3px;
}

.col-lg-6 p,
.contact-info-wrap strong {
  font-family: serif;
}

@media (max-width: 576px) {
  .header {
    height: 65%;
    padding-top: 10px;
  }

  .restaurant-title {
    font-size: 40px;
  }

  .category-name {
    font-size: 16px;
    margin-top: 15px;
  }

  .description-content {
    margin: 5%;
    padding-left: 18px;
    font-size: 14px;
  }

  .info-img {
    display: flex;
    flex-direction: column;
  }

  .like, .collection, .dashboard {
    width: 30%;
    font-size: 15px;
  }

  .col-lg-6 p,
  .contact-info-wrap strong {
    font-size: 20px;
    margin-bottom: 10px;
  }

  .contact-info-wrap li {
    font-size: 16px;
  }
}

@media (min-width: 576px) and (max-width: 767px) {
  .header {
    height: 65%;
    padding-top: 10px;
  }

  .restaurant-title {
    font-size: 50px;
  }

  .category-name {
    font-size: 18px;
    margin-top: 15px;
  }

  .description-content {
    margin: 5%;
    padding-left: 22px;
    font-size: 14px;
  }

  .like,
  .collection,
  .dashboard {
    width: 30%;
    font-size: 15px;
  }

  .col-lg-6 p,
  .contact-info-wrap strong {
    font-size: 20px;
    margin-bottom: 10px;
  }

  .contact-info-wrap li {
    font-size: 16px;
  }
}

@media (min-width: 768px) and (max-width: 991px) {
  .header {
    height: 65%;
  }

  .col-md-6 {
    padding: 15px;
  }

  .restaurant-title {
    font-size: 65px;
  }

  .category-name {
    font-size: 20px;
    margin-top: 15px;
  }

  .description-content {
    margin: 6%;
    padding-left: 30px;
    font-size: 18px;
}

  .like,
  .collection,
  .dashboard {
    width: 20%;
    font-size: 16px;
  }

  .col-lg-6 p,
  .contact-info-wrap strong {
    font-size: 25px;
    margin-bottom: 10px;
  }

  .contact-info-wrap li {
    font-size: 18px;
  }
}

@media (min-width: 992px) {
  .header {
    height: 75%;
  }

  .col-lg-6 {
    padding: 30px;
  }

  .restaurant-title {
    font-size: 80px;
  }

  .category-name {
    font-size: 28px;
    margin: 5px 0;
  }

  .description-content {
  margin: 8%;
  padding-left: 30px;
  font-size: 20px;
}

  .like,
  .collection,
  .dashboard {
    width: 25%;
    font-size: 20px;
  }

  .col-lg-6 p,
  .contact-info-wrap strong {
    font-size: 30px;
    margin-bottom: 10px;
  }

  .contact-info-wrap li {
    font-size: 25px;
  }
}
</style>