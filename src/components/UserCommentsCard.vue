<template>
  <div class="card">
    <div class="card-header">
      <strong>{{ commentedRestaurants.length }}</strong> 已評論餐廳
    </div>
    <div class="card-body">
      <router-link
        v-for="restaurant in commentedRestaurants"
        :key="restaurant.id"
        :to="{name: 'restaurant', params: { id: restaurant.id }}"
      >
        <img
          :src="restaurant.Restaurant.image | emptyImage"
          width="60"
          height="60"
          class="mr-1 mb-1"
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
    initialUser: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      user : this.initialUser,
      commentedRestaurants:[],
    }
  },
    created(){
    this.fetchCommentedRestaurants()
  },
  methods: {
    fetchCommentedRestaurants() {
      this.commentedRestaurants.push(...this.user.profile.Comments)
    }
  }
}
</script>