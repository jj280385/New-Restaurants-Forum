<template>
  <div class="user-card ml-4 mt-4">
      <div class="user-header px-3 py-3">
        {{followers.length}}&nbsp;Followers
      </div>
      <div class="user-body px-3 py-3">
        <router-link 
            v-for="follower in followers"
            :key="follower.id"
            :to="{name: 'users', params: {id: follower.id}}"
          >
            <img :src="follower.image | emptyImage"
            width="60" height="60" class="mr-1 mb-1 restaurant-avatar"
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
    followers: {
      type: Array,
      required: true,
    }
  },
}
</script>

<style scoped>
.card:hover .card-header,
.card:hover .card-body  {
  border: 1px solid #595959;
  box-shadow: none;
}

.card:hover .card-header {
  border-bottom: none;
}

.card:hover .avatar {
  border-radius: 0;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60%;
  font-size: 20px;
}

.card-body {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  align-items: center;  
  border: 1px solid #D5CEC0;
  border-radius: 0 3px 3px 0;
}
</style>