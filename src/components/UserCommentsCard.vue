<template>
  <div class="card">
    <div class="card-header">
      <strong>{{ userComments.length }}</strong> 已評論餐廳
    </div>
    <div class="card-body">
      <a
        v-for="comment in userComments"
        :key="comment.id"
        href="/restaurants/1"
      >
        <img
          :src="comment.Restaurant.image"
          width="60"
          height="60"
          class="avatar"
        />
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    userComments: {
      type: Array,
      required: true,
    },
  },
};
</script>