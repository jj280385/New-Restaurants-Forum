<template>
  <div class="user-card mb-3 ml-3">
    <div class="user-header px-3 py-3">
      {{ followings.length }}&nbsp;Followings
    </div>
    <div class="user-body px-3 py-3">
      <router-link
        v-for="following in followings"
        :key="following.id"
        :to="{ name: 'users', params: { id: following.id } }"
      >
        <img
          :src="following.image | emptyImage"
          class="mr-1 mb-1 user-avatar"
        />
      </router-link>
    </div>
  </div>
</template>

<script>
import { emptyImageFilter } from "./../utils/mixins";

export default {
  mixins: [emptyImageFilter],
  props: {
    followings: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.card:hover .card-header,
.card:hover .card-body {
  border: 1px solid #595959;
  box-shadow: none;
}

.card:hover .card-header {
  border-bottom: none;
}

.card:hover .avatar {
  border-radius: 0;
}

.user-header {
  display: flex;
  align-items: center;
  justify-content: center;
}

.user-body {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  align-items: center;
  border: 1px solid #d5cec0;
  border-radius: 0 3px 3px 0;
}

.user-avatar {
  width: 50px;
  height: 50px;
}

@media (max-width: 575px) {
  .user-card {
    margin-right: 15px;
  }
}

@media (min-width: 576px) and (max-width: 767px) {
  .user-header {
    width: 70%;
    font-size: 15px;
  }
}

@media (min-width: 768px) and (max-width: 991px) {
  .user-header {
    width: 75%;
    font-size: 15px;
  }
}

@media (min-width: 992px) {
  .user-header {
    width: 70%;
    font-size: 20px;
  }

  .user-avatar {
    width: 60px;
    height: 60px;
  }
}
</style>
