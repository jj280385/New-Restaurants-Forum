// ./src/views/AdminRestaurantNew.vue
<template>
  <div class="form">
    <div class="form-container py-3 px-3">
      <AdminRestaurantForm
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
import BottomNavTabsForPage from "./../components/BottomNavTabsForPage";


export default {
  components: {
    AdminRestaurantForm,
    BottomNavTabsForPage
  },
  data() {
    return {
      isProcessing: false,
    };
  },
  methods: {
    async handleAfterSubmit(formData) {
      try {
        this.isProcessing = true;
        const { data } = await adminAPI.restaurants.create({ formData });

        if (data.status === "error") {
          throw new Error(data.message);
        }

        // 若成功則轉址至
        this.$router.push({ name: "admin-restaurants" });

        Toast.fire({
          icon: "success",
          title: "已成功建立新餐廳資料！",
        });

      } catch (error) {
        this.isProcessing = false;
        Toast.fire({
          icon: "error",
          title: "無法建立餐廳，請稍後再試",
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