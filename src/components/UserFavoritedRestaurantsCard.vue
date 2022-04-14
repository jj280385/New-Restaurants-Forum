<template>
  <div class="user-card mr-4 mt-4">
    <div class="user-header px-3 py-3">
      Collection&nbsp;{{ favoritedRestaurants.length }}&nbsp;restaurants
    </div>
    <div class="user-body px-3 py-3">
      <router-link
        v-for="favoritedRestaurant in favoritedRestaurants"
        :key="favoritedRestaurant.id"
        :to="{ name: 'restaurant', params: { id: favoritedRestaurant.id } }"
      >
        <img
          :src="favoritedRestaurant.image | emptyImage"
          width="60"
          height="60"
          class="mr-1 mb-1 restaurant-avatar"
        >
      </router-link>
    </div>
  </div>
</template>

<script>
import { emptyImageFilter } from './../utils/mixins'

export default {
  mixins: [emptyImageFilter],
  props: {
    favoritedRestaurants: {
      type: Array,
      required: true,
    }
  }
}
</script>

