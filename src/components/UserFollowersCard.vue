<template>
  <div class="card">
      <div class="card-header">
        <strong>{{followers.length}}</strong> followers (追隨者)
      </div>
      <div class="card-body">
        <router-link 
            v-for="follower in followers"
            :key="follower.id"
            :to="{name: 'user', params: {id: follower.id}}"
          >
            <img :src="follower.image | emptyImage"
            width="60" height="60" class="avatar"
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
      followers: []
    }
  },
  created(){
    this.fetchFollowers()
  },
  methods: {
    fetchFollowers() {
      this.followers.push(...this.user.profile.Followers)
    }
  }
}
</script>