// ./src/components/NewestRestaurants.vue
<template>
  <div class="card mt-3">
    <div class="card-header">Newest Restaurants</div>
    <div class="card-body">
      <div class="card-item" v-for="restaurant in restaurants" :key="restaurant.id">
      <div class="title-area">
        <div class="title">
          <router-link
            class="name"
            :to="{ name: 'restaurant', params: { id: restaurant.id } }"
            >{{ restaurant.name }}
          </router-link>
        </div>
          &nbsp;
          <small>{{
            restaurant.Category ? restaurant.Category.name : "未分類"
          }}</small>
      </div>
        <p class="description">{{ restaurant.description }}</p>
        <p class="time">{{ restaurant.createdAt | fromNow }}</p>
        <!-- <hr /> -->
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
    restaurants: {
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

.title-area {
  display: flex;
  margin-bottom: 15px;
  align-items: center;
}

.name {
  text-decoration: none;
}

.title ::after {
  height: 2px;
}

.time {
  margin: 15px 0;
}

.card:hover .time,
.card:hover small {
  color: #f28705
}

</style>