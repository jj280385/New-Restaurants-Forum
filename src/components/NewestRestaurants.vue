// ./src/components/NewestRestaurants.vue
<template>
  <div class="card">
    <div class="card-header default">Newest Restaurants</div>
    <div class="card-body">
      <div
        class="card-item"
        v-for="restaurant in restaurants"
        :key="restaurant.id"
      >
        <div class="newest-title">
          <div class="title">
            <router-link
              class="name"
              :to="{ name: 'restaurant', params: { id: restaurant.id } }"
              >{{ restaurant.name }}
            </router-link>
          </div>
          &nbsp;
          <small>{{
            restaurant.Category ? restaurant.Category.name : "uncategorized"
          }}</small>
        </div>
        <div class="description">
          <p class="text mt-3">{{ restaurant.description }}</p>
        </div>
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
.card {
  border: none;
}

.card-header {
  border-bottom: 0;
  margin-bottom: 0;
  text-align: center;
  background-color: transparent;
  color: #595959;
}

.newest-title {
  display: flex;
  align-items: flex-end;
}

.card-header, .card-body {
  border: 1px solid #d5cec0;
}

.card-item {
  width: 100%;
  margin: 5px 0;
  border-bottom: 1px solid #d5cec0;
}

.name {
  text-decoration: none;
  font-weight: 600;
  display: inline-block;
  transition-duration: 1s;
  color: #595959;
}

.title ::after {
  height: 2.2px;
}

small {
  margin: 0 0 3px 20px;
  color: #8c0303;
  font-family: serif;
  font-weight: 500;
}

.time {
  display: flex;
  justify-content: flex-end;
  margin: 15px 0;
  color: #8c0303;
  font-family: serif;
  transition-duration: 1s;
}

.card:hover .card-header,
.card:hover .card-body {
  border: 1px solid #8c0303;
  box-shadow: 10px 0 20px rgba(0, 0, 0, 0.2);
  transition-duration: 1s;
}

.card:hover .card-header {
  border-radius: 10px 10px 0 0;
}

.card:hover .card-body {
  border-radius: 0 10px 10px 10px;
}

.card-item:hover {
  border-bottom: 1px solid #595959;
  transition-duration: 1s;
}

.card-item:hover .time,
.card-item:hover small {
  color: #f28705;
}

@media (max-width: 575px) {
  .default {
    display: none;
  }

  .card-body {
    margin-bottom: 10px;
    margin: 0;
  }

  .name {
    font-size: 20px;
  }

  small {
    font-size: 13px;
  }
}

@media (min-width: 576px) and (max-width: 767px) { 
  .default {
    display: none;
  }

  .card-body {
    margin-bottom: 10px;
    margin: 0;
  }

  .name {
    font-size: 22px;
  }

  small {
    font-size: 13px;
  }
}

@media (min-width: 768px) and (max-width: 991px) {
  .card:hover .card-header {
    border-bottom: none;
  }

  .card-header {
    width: 55%;
    padding: 10px;
    font-size: 20px;
    font-weight: 600;
  }

  .name {
    font-size: 25px;
  }

  small {
    font-size: 15px;
  }
}

@media (min-width: 992px) {
  .card-header {
    width: 55%;
    padding: 15px;
    font-size: 28px;
    font-weight: 600;
  }

  .card:hover .card-header {
    border-bottom: none;
  }

  .name {
    font-size: 28px;
  }

  .title::after {
    height: 2.2px;
  }

  small {
    font-size: 18px;
  }
}

@media (min-width: 1439px) {
  .card-header {
    font-size: 32px;
  }

  .card:hover .card-header {
    border-bottom: none;
  }

  .name {
    font-size: 30px;
  }

  .title::after {
    height: 2.5px;
  }

  small {
    font-size: 20px;
  }

  .text, .time {
    font-size: 20px;
  }
}
</style>