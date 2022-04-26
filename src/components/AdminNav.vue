// ./src/components/AdminNav.vue
<template>
  <div class="mb-3">
    <h1 class="display-4">Admin System</h1>
    <ul class="nav nav-pills nav-tabs my-3">
      <li class="nav-item">
        <router-link to="/admin/restaurants" class="nav-link">
          Restaurants
        </router-link>
      </li>
      <li>
        <router-link to="/admin/categories" class="nav-link">
          Categories
        </router-link>
      </li>
      <li>
        <router-link to="/admin/users" class="nav-link"> Users </router-link>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.nav-pills {
  border-bottom: 2px solid #f28705;
  display: flex;
  align-items: center;
  animation: fadeInUp;
  animation-duration: 3s;
}

.nav-pills .nav-link.active,
.nav-link:hover,
.nav-pills > .nav-link {
  border-width: 2px;
  color: white;
  background-color: #f28705;
  border: 2px solid #f28705;
  border: 1px solid transparent;
}

.nav-link {
  color: #595959;
  border-radius: 3px 3px 0 0;
}

@media (min-width: 576px) and (max-width: 767px) {
  .nav-link {
    font-size: 16px;
  }
}

@media (min-width: 768px) and (max-width: 991px) {
  .nav-link {
    font-size: 18px;
  }
}

@media (min-width: 992px) {
  .nav-link {
    font-size: 20px;
  }
}
</style>