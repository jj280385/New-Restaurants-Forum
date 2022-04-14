// ./src/views/AdminRestaurantNew.vue
<template>
  <div class="form">
    <div class="form-container py-3 px-5 mb-5">
      <AdminRestaurantForm
        :is-processing="isProcessing"
        @after-submit="handleAfterSubmit"
      />
    </div>
    <button type="button" class="btn btn-link back" @click="$router.back()">
      &lt; GO BACK
    </button>
  </div>
</template>

<script>
import AdminRestaurantForm from "./../components/AdminRestaurantForm.vue";
import adminAPI from "./../apis/admin";
import { Toast } from "./../utils/helpers";

export default {
  components: {
    AdminRestaurantForm,
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
  margin: 8% 8% 1% 8%;
}

.back {
  text-decoration: none;
}

</style>