<template>
  <div class="user-card mr-4">
    <div class="user-header px-3 py-3">
      Comments&nbsp;{{ comments.length }}&nbsp;restaurants
    </div>
    <div class="user-body px-3 py-3">
      <router-link
        v-for="comment in comments"
        :key="comment.id"
        :to="{name: 'restaurant', params: { id: comment.Restaurant.id }}"
      >
        <img
          :src="comment.Restaurant.image | emptyImage"
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
  name: "userCommentsCard",
  mixins: [emptyImageFilter],
  props: {
    comments: {
      type: Array ,
      required: true,
    }
  }
}
</script>
