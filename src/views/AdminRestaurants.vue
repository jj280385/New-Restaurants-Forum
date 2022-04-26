// ./src/views/AdminRestaurants.vue
<template>
  <div>
    <div class="admin-container py-3 px-2 mb-5">
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
      <!-- Table for RWD >576px -->
      <!-- 後台餐廳列表 AdminRestaurantsTable -->
      <AdminRestaurantsTable class="table"/>
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
import AdminNav from "./../components/AdminNav";
import AdminRestaurantsTable from "./../components/AdminRestaurantsTable";
import BottomNavTabsForPage from "./../components/BottomNavTabsForPage";

export default {
  components: {
    AdminNav,
    AdminRestaurantsTable,
    BottomNavTabsForPage
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

@media (max-width: 576px) {
  .back {
    display: none;
  }

  .bottom-navtabs {
    animation: fadeInUp;
    animation-duration: 3s;
  }

  .admin-container {
    border: none;
    margin: 20% 0;
    width: 100%;
  }

  .back, .btn-outline-info{
    font-size: 14px;
  }
}

@media (min-width: 576px) {
  .bottom-navtabs {
    display: none;
  }
}

@media (min-width: 576px) and (max-width: 767px) {
  .back, .btn-outline-info{
    font-size: 16px;
  }
}

@media (min-width: 768px) and (max-width: 991px) {
  .back, .btn-outline-info{
    font-size: 18px;
  }
}

@media (min-width: 992px) {
  .admin-container {
    margin-bottom: 10%;
  }

  .btn-outline-info {
    font-size: 18px;
  }
}
</style>