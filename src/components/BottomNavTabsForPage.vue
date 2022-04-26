<template>
  <div class="tabs">
    <ul class="bottom-nav">
      <li class="items">
        <button
          type="button"
          class="btn btn-link back-icon"
          @click="$router.back()"
        >
          <img src="./../assets/icons/back.png" />
        </button>
      </li>
      <li class="items">
        <router-link to="/restaurants">
          <img src="./../assets/icons/home.png" />
        </router-link>
      </li>
    </ul>
  </div>
</template>

<style scoped>
ul {
  margin-bottom: 0;
}

img {
  border: 2px solid transparent;
  padding: 5px;
}

li:hover img {
  border: 2px solid #f28705;
  border-radius: 50%;
  background-color: #f28705;
}

.tabs {
  z-index: 999;
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: rgba(105, 2, 2, 1);
}

.bottom-nav {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 5px 0;
}

.back {
  border: none;
  animation: none;
}
</style>