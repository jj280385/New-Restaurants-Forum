// ./src/views/AdminRestaurants.vue
<template>
  <div>
    <div class="admin-container py-3 px-5">
      <!-- 後台導覽頁籤 AdminNav -->
      <AdminNav />
      <div class="add-btn">
        <router-link
          to="/admin/restaurants/new"
          class="btn btn-outline-info mt-2"
        >
          Add New Restaurant
        </router-link>
      </div>
      <!-- 後台餐廳列表 AdminRestaurantsTable -->
      <AdminRestaurantsTable />
    </div>
    <button type="button" class="btn btn-link back" @click="$router.back()">
      &lt; GO BACK
    </button>
  </div>
</template>

<script>
import AdminNav from "./../components/AdminNav";
import AdminRestaurantsTable from "./../components/AdminRestaurantsTable";

export default {
  components: {
    AdminNav,
    AdminRestaurantsTable,
  },
};
</script>

<style scoped>
.add-btn {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  animation: fadeInUp;
  animation-duration: 3s;
}

.back {
  text-decoration: none;
}
</style>