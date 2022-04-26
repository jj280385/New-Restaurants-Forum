// ./src/views/AdminRestaurant.vue
<template>
  <div>
    <div class="show-page">
      <Spinner v-if="isLoading" class="admin-spinner" />
      <div v-else class="row show-container">
        <div class="col-md-12 col-sm-12">
          <div class="header mx-2">
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
        </div>
        <div class="info-img col-lg-12">
          <div class="col-md-5 open-info py-3 px-3">
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
          <div class="col-md-7 img py-3 px-3">
            <img
              class="img-responsive center-block"
              :src="restaurant.image | emptyImage"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="back">
      <button type="button" class="btn btn-link back-btn" @click="$router.back()">
        <img src="./../assets/icons/back.png" class="back-icon">
      </button>
    </div>
    <BottomNavTabsForPage class="bottom-navtabs"/>
  </div>
</template>

<script>
import { emptyImageFilter } from "../utils/mixins";
import adminAPI from "./../apis/admin";
import { Toast } from "./../utils/helpers";
import Spinner from "./../components/Spinner";
import BottomNavTabsForPage from "./../components/BottomNavTabsForPage";

export default {
  name: "AdminRestaurant",
  mixins: [emptyImageFilter],
  components: {
    Spinner,
    BottomNavTabsForPage
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
  transition-duration: 1s;
}

.header, .left-column, .btn-area,
.info-img, .img, .col-md-6 {
  display: flex;
}

.header, .btn-area, .col-md-6 {
  align-items: center;
}

.col-md-12 {
  height: 100%;
}

.header {
  height: 75%;
  border-bottom: 1px solid #d5cec0;
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
  margin-top: 15px;
}

.btn-area {
  justify-content: center;
  border-top: 1px solid #595959;
  border-bottom: 1px solid #595959;
}

.description-content {
  color: #595959;
  border-left: 2px solid #595959;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
}

.img {
  object-fit: cover;
  justify-content: flex-end;
}

img {
  opacity: 0.8;
  border-radius: 3px;
  width: 100%;
  height: 100%;
}

@media (max-width: 576px) {
  .back {
    display: none;
  }

  .bottom-navtabs {
    animation: fadeInUp;
    animation-duration: 3s;
  }

  .header {
    border-bottom: 1px solid #595959;
    display: flex;
    flex-direction: column;  
    padding-top: 15px;
  }
  
  .left-column {
    align-items: center;
  }

  .restaurant-title {
    font-size: 36px;
  }

  .category-name {
    font-size: 16px;
    margin: 0;
  }

  .description-content {
    margin: 5%;
    padding: 15px 0;
    font-size: 16px;
    border: none;
  }

  .show-container:hover .description-content {
    border-left: none;
  }

  .info-img {
    display: flex;
    flex-direction: column;
  }

  .contact-info-wrap strong {
    font-family: serif;
    font-size: 20px;
    margin-bottom: 10px;
  }

  .contact-info-wrap li {
    font-size: 18px;
  }

  .img { 
    width: 100%;
    height: 100%;
  }
}

@media (min-width: 576px) {
  .bottom-navtabs {
    display: none;
  }
}

@media (min-width: 576px) and (max-width: 767px) {
  .header {
    height: 80%;
  }

  .restaurant-title {
    font-size: 50px;
  }

  .category-name {
    font-size: 23px;
  }

  .btn {
    font-size: 16px;
  }

  .description-content {
    margin: 5%;
    padding-left: 25px;
    font-size: 14px;
  }

  .contact-info-wrap strong {
    font-family: serif;
    font-size: 22px;
    margin-bottom: 10px;
  }

  .contact-info-wrap li {
    font-size: 18px;
  }
}

@media (min-width: 768px) and (max-width: 991px) {
  .header {
    height: 80%;
  }

  .restaurant-title {
    font-size: 60px;
  }

  .category-name {
    font-size: 25px;
  }

  .btn {
    font-size: 18px;
  }

  .description-content {
    margin: 8%;
    padding-left: 30px;
    font-size: 16px;
  }

  .contact-info-wrap strong {
    font-family: serif;
    font-size: 25px;
    margin-bottom: 10px;
  }

  .contact-info-wrap li {
    font-size: 20px;
  }
}

@media (min-width: 992px) {
  .header {
    height: 75%;
  }

  .restaurant-title {
    font-size: 80px;
  }

  .category-name {
    font-size: 28px;
  }

  .btn {
    font-size: 20px;
  }

  .description-content {
    margin: 8%;
    padding-left: 30px;
    font-size: 20px;
  }

  .contact-info-wrap strong {
    font-family: serif;
    font-size: 30px;
    margin-bottom: 10px;
  }

  .contact-info-wrap li {
    font-size: 25px;
  }
}

@media (min-width: 1439px) {
  .restaurant-title {
    font-size: 88px;
  }

  .category-name {
    font-size: 30px;
  }

  .description-content {
    margin: 8%;
    padding-left: 30px;
    font-size: 28px;
  }

  .contact-info-wrap strong {
    font-family: serif;
    font-size: 35px;
    margin-bottom: 10px;
  }

  .contact-info-wrap li {
    font-size: 30px;
  }
}
</style>