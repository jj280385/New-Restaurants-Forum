<template>
  <div class="card">
    <div class="card-header">
      <strong>{{ userFollowings.length }}</strong> followings (追蹤者)
    </div>
    <div class="card-body">
      <a
        v-for="following in userFollowings"
        :key="following.id"
        href="/users/2"
      >
        <img
          :src="following.image"
          width="60"
          height="60"
          class="avatar mr-1"
        />
      </a>
    </div>
  </div>
</template>
<style scoped>
/* .card-body {
    display: flex;
    flex-direction: row;
    margin: 0;
    padding: 0;
  } */
</style>
<script>
export default {
  props: {
    userFollowings: {
      type: Array,
      required: true,
    },
  },
};
</script>