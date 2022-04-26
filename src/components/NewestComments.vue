<template>
  <div class="card">
    <div class="card-header default">Newest Comments</div>
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
        <div class="description">
          <p class="text">{{ comment.text }}</p>
        </div>

        <div class="from">
          by
          <router-link
            class="user-name ml-1 mr-3"
            :to="{ name: 'users', params: { id: comment.User.id } }"
          >
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

.card-header,
.card-body {
  border: 1px solid #d5cec0;
}

.name {
  text-decoration: none;
  font-weight: 600;
  display: inline-block;
}

.title {
  margin-bottom: 15px;
}

.title ::after {
  height: 2.2px;
}

.time {
  color: #8c0303;
  font-family: serif;
}

.from {
  display: flex;
  justify-content: flex-end;
  align-content: center;
  margin: 10px 0 15px 0;
  height: 20px;
  font-family: serif;
}

.user-name {
  color: #8c0303;
  font-family: serif;
  text-decoration: none;
}

.name {
  text-decoration: none;
  font-weight: 600;
  display: inline-block;
  transition-duration: 1s;
}

.name {
  color: #595959;
}

.card-item {
  width: 100%;
  margin: 5px 0;
  border-bottom: 1px solid #d5cec0;
}

.card:hover .card-header,
.card:hover .card-body {
  border: 1px solid #8c0303;
  box-shadow: 10px 0 20px rgba(0, 0, 0, 0.2);
  transition-duration: 1s;
}

.card:hover .card-header {
  border-radius: 10px 10px 0 0;
  border-bottom: none;
}

.card:hover .card-body {
  border-radius: 0 10px 10px 10px;
}

.card-item:hover .time,
.card-item:hover .user-name {
  color: #f28705;
}

.card-item:hover {
  border-bottom: 1px solid #595959;
  transition-duration: 1s;
}

@media (min-width: 576px) and (max-width: 767px) {
  .default {
    display: none;
  }

  .name {
    font-size: 22px;
  }

  small {
    font-size: 15px;
  }
}

@media (min-width: 768px) and (max-width: 991px) {
  .for-rwd {
    display: none;
  }

  .default,
  .card-body {
    display: flex;
  }

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

  .text,
  .from,
  .user-name,
  .time {
    font-size: 16px;
  }
}

@media (min-width: 992px) {
  .for-rwd {
    display: none;
  }

  .default,
  .card-body {
    display: flex;
  }

  .card-header {
    width: 55%;
    padding: 15px;
    font-size: 28px;
    font-weight: 600;
  }

  .name {
    font-size: 28px;
  }

  .text,
  .from,
  .user-name,
  .time {
    font-size: 18px;
  }
}

@media (min-width: 1439px) {
  .card-header {
    font-size: 32px;
  }

  .name {
    font-size: 30px;
  }

  .title::after {
    height: 2.5px;
  }

  .text,
  .from,
  .user-name,
  .time {
    font-size: 20px;
  }
}
</style>