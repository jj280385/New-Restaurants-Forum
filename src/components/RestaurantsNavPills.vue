// ./src/components/RestaurantsNavPills.vue
<template>
  <ul class="nav nav-pills nav-tabs mb-4">
    <li class="nav-item">
      <router-link
        class="nav-link"
        :to="{ name: 'restaurants' }"
      >
        ALL
      </router-link>
    </li>

    <li
      v-for="category in categories"
      :key="category.id"
      class="nav-item"
    >
      <router-link
        class="nav-link"
        :to="{ name: 'restaurants', query: { categoryId: category.id } }"
      >
        {{ category.name }}
      </router-link>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    categories: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
.nav-pills {
  margin: 60px 0 50px 0;
  display: flex;
  align-items: center;
  animation: fadeInUp; 
  animation-duration: 3s;
}

.nav-tabs {
  border-bottom: 2px solid #F28705;
  animation-duration: 3s;
}

.nav-pills .nav-link {
  padding: 10px 15px 5px 15px;
  color: #595959;
  transition: none;
  font-size: 18px;
  border-radius: 3px 3px 0 0;
  border: 2px solid transparent;
}

.nav-pills .nav-link.active,.nav-link:hover,
.nav-pills .show > .nav-link {
  border-width: 2px;
  color: white;
  background-color: #F28705;
  border: 2px solid #F28705;
}

.nav-item {
  font-size: 22px;
}

</style>