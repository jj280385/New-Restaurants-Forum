<template>
  <div class="card">
    <div class="card-header">
      <strong>{{ userFollowers.length }}</strong> followers (追蹤者)
    </div>
    <div class="card-body">
      <a v-for="follower in userFollowers" :key="follower.id" href="/users/2">
        <img :src="follower.image" width="60" height="60" class="avatar mr-1" />
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    userFollowers: {
      type: Array,
      required: true,
    },
  },
};
</script>