// ./src/components/AdminNav.vue
<template>
  <div class="mb-3">
    <h1>Admin System</h1>
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
  font-size: 16px;
  border-radius: 3px 3px 0 0;
}

</style>