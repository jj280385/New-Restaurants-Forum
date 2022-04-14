<template>
  <div class="user-card mb-3 ml-4">
      <div class="user-header px-3 py-3">
        {{followings.length}}&nbsp;Followings
      </div>
      <div class="user-body px-3 py-3">
        <router-link 
            v-for="following in followings"
            :key="following.id"
            :to="{name: 'users', params: {id: following.id}}"
          >
            <img 
            :src="following.image | emptyImage"
            width="60" height="60" 
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
    followings: {
      type: Array,
      required: true,
    }
  },
}
</script>
