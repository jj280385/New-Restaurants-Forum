// ./src/views/AdminRestaurantEdit.vue
<template>
  <div class="form">
    <Spinner v-if="isLoading" class="form-spinner" />
    <div v-else class="form-container py-3 px-3 mb-5">
      <AdminRestaurantForm
        :initial-restaurant="restaurant"
        :is-processing="isProcessing"
        @after-submit="handleAfterSubmit"
      />
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
import AdminRestaurantForm from "./../components/AdminRestaurantForm.vue";
import adminAPI from "./../apis/admin";
import { Toast } from "./../utils/helpers";
import Spinner from "./../components/Spinner";
import BottomNavTabsForPage from "./../components/BottomNavTabsForPage";


export default {
  name: "AdminRestaurantEdit",
  components: {
    AdminRestaurantForm,
    Spinner,
    BottomNavTabsForPage
  },
  data() {
    return {
      restaurant: {
        id: -1,
        name: "",
        categoryId: "",
        tel: "",
        address: "",
        description: "",
        image: "",
        openingHours: "",
      },
      isProcessing: false,
      isLoading: true,
    };
  },
  created() {
    const { id } = this.$route.params;
    this.fetchRestaurant(id);
  },
  beforeRouteUpdate(to, from, next) {
    // 路由改變時重新抓取資料
    const { id } = to.params;
    this.fetchRestaurant(id);
    next();
  },
  methods: {
    // 更新編輯後的餐廳資料
    async handleAfterSubmit(formData) {
      try {
        this.isProcessing = true;
        const { data } = await adminAPI.restaurants.update({
          restaurantId: this.restaurant.id,
          formData,
        });

        if (data.status === "error") {
          throw new Error(data.message);
        }

        this.$router.push({ name: "admin-restaurants" });
        Toast.fire({
          icon: "success",
          title: "已成功修改該餐廳資料！",
        });

      } catch (error) {
        this.isProcessing = false;
        Toast.fire({
          icon: "error",
          title: "無法更新餐廳資料，請稍後再試",
        });
      }
    },

    // 取得餐廳詳細資料
    async fetchRestaurant(restaurantId) {
      try {
        const { data } = await adminAPI.restaurants.getDetail({ restaurantId });

        const { restaurant } = data;
        this.restaurant = {
          ...this.restaurant,
          id: restaurant.id,
          name: restaurant.name,
          categoryId: restaurant.CategoryId,
          tel: restaurant.tel,
          address: restaurant.address,
          description: restaurant.description,
          image: restaurant.image,
          openingHours: restaurant.opening_hours,
        };
        this.isLoading = false;
      } catch (error) {
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
.form {
  display: flex;
  justify-content: center;
  align-items: center;
}

@media (max-width: 576px) {
  .form-container {
    margin: 18% 0;
    border: none;
  }

  .back {
    display: none;
  }

  .bottom-navtabs {
    animation: fadeInUp;
    animation-duration: 3s;
  }
}

@media (min-width: 576px) {
  .bottom-navtabs {
    display: none;
  }
}

@media (min-width: 576px) and (max-width: 767px) {
  .form {
    margin: 12% 0 3% 12%;
  }
}

@media (min-width: 768px) and (max-width: 991px) {
  .form {
    margin: 12% 8% 3% 8%;
  }
}

@media (min-width: 992px) {
  .form {
    margin: 8% 8% 3% 8%;
  }
}
</style>