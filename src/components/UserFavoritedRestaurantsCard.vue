<template>
  <div class="card">
    <div class="card-header">
      <strong>{{ favoritedComments.length }}</strong> 收藏的餐廳
    </div>
    <div class="card-body">
      <a
        v-for="comment in favoritedComments"
        :key="comment.id"
        href="/restaurants/2"
      >
        <img :src="comment.image" width="60" height="60" class="avatar" />
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    favoritedComments: {
      type: Array,
      required: true,
    },
  },
};
</script>