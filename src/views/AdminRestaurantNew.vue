<template>
  <div class="container py-5">
    <!-- 餐廳表單 AdminRestaurantForm -->
    <AdminRestaurantForm
      @after-submit="handleAfterSubmit"
      :is-processing="isProcessing"
    />
  </div>
</template>

<script>
import AdminRestaurantForm from "../components/AdminRestaurantForm.vue";
import { Toast } from "./../utils/helpers";
import adminAPI from "./../apis/admin";

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
        //  在這裡要將傳回來的formData傳到伺服器上去，但因為目前我們尚未連結API，因此先沒有這個操作
        const { data } = await adminAPI.restaurants.create({ formData });
        this.isProcessing = true;
        if (data.status === "error") {
          throw new Error(data.message);
        }
        // back to the host page
        this.$router.push({ name: "admin-restaurants" });
      } catch (error) {
        console.log(error);
        this.isProcessing = false;

        Toast.fire({
          icon: "error",
          title: "無法成功建立餐廳資料，請稍等！",
        });
      }
    },
  },
};
</script>