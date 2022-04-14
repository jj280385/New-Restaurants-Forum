<template>
  <div class="card mt-3">
    <div class="card-header">Newest Comments</div>
    <div class="card-body">
      <div class="card-item" v-for="comment in comments" :key="comment.id">
        <div class="title">
          <router-link
            class="name"
            :to="{ name: 'restaurant', params: { id: comment.Restaurant.id } }"
          >
            {{ comment.Restaurant.name }}
          </router-link>
        </div>
        <p class="description">{{ comment.text }}</p>
        
        <div class="from">
          by
          <router-link 
          class="user-name ml-1 mr-3" 
          :to="{ name: 'users', params: { id: comment.User.id } }">
            {{ comment.User.name }}
          </router-link>
          at
          <p class="time mx-2">
            {{ comment.createdAt | fromNow }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 載入撰寫好的 mixin
import { fromNowFilter } from "./../utils/mixins";

export default {
  // 透過 mixins 屬性將撰寫好的 mixin 放入
  mixins: [fromNowFilter],
  props: {
    comments: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.card-header {
  width: 40%;
}

.card-body {
  border: 1px solid #d5cec0;
}

.card:hover .card-header, 
.card:hover .card-body {
  border: 1px solid #8c0303;
  box-shadow: 10px 0 20px rgba(0, 0, 0, 0.2);
  transition-duration: 2s;
}

.card:hover .card-header {
  border-bottom: none;
  border-radius: 10px 10px 0 0;
}

.card:hover .card-body {
  border-radius: 0 10px 10px 10px;
}

.title {
  margin-bottom: 15px;
}

.name {
  text-decoration: none;
}

.title ::after {
  height: 2px;
}

.from {
  display:flex;
  justify-content: flex-end;
  margin: 10px 0 15px 0;
  height: 20px;
}

.card:hover .user-name {
  color: #f28705;
}

.user-name {
  color: #8c0303;
}
</style>