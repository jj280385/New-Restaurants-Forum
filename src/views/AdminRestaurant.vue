// ./src/views/AdminRestaurant.vue
<template>
  <div>
    <div class="show-page">
      <Spinner v-if="isLoading" class="admin-spinner"/>
      <div v-else class="row show-container">
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
        </div>
        <div class="info-img col-lg-12">
          <div class="col-lg-6 open-info px-5">
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
          <div class="col-lg-6 img">
            <img
              class="img-responsive center-block"
              :src="restaurant.image | emptyImage"
            />
          </div>
        </div>
      </div>
    </div>
    <button type="button" class="btn btn-link back" @click="$router.back()">
      &lt; GO BACK
    </button>
  </div>
</template>

<script>
import { emptyImageFilter } from "../utils/mixins";
import adminAPI from "./../apis/admin";
import { Toast } from "./../utils/helpers";
import Spinner from "./../components/Spinner";

export default {
  name: "AdminRestaurant",
  mixins: [emptyImageFilter],
  components: {
    Spinner,
  },
  data() {
    return {
      restaurant: {
        id: -1,
        name: "",
        categoryName: "",
        image: "",
        openingHours: "",
        tel: "",
        address: "",
        description: "",
      },
      isLoading: true,
    };
  },

  mounted() {
    const { id: restaurantId } = this.$route.params;
    this.fetchRestaurant(restaurantId);
  },
  methods: {
    // 取得餐廳詳細資料
    async fetchRestaurant(restaurantId) {
      try {
        this.isLoading = true;
        const { data } = await adminAPI.restaurants.getDetail({ restaurantId });

        if (data.status === "error") {
          throw new Error(data.message);
        }

        const { restaurant } = data;
        this.restaurant = {
          ...this.restaurant,
          id: restaurant.id,
          name: restaurant.name,
          categoryName: restaurant.Category.name,
          image: restaurant.image,
          openingHours: restaurant.opening_hours,
          tel: restaurant.tel,
          address: restaurant.address,
          description: restaurant.description,
        };
        this.isLoading = false;
      } catch (error) {
        this.isLoading = true;
        console.error(error.message);
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
.show-container:hover .description-content {
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
  border-bottom: 1px solid #D5CEC0;
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

.back {
  text-decoration: none;
}
</style>