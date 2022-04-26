<template>
  <div class="nav-tabs">
    <ul class="bottom-nav">
      <li class="items">
        <router-link to="/restaurants" 
        :class="{active: $route.name === 'home'}"
        >
          <img src="./../assets/icons/home.png">
        </router-link>
      </li>
      <li class="items">
        <router-link to="/restaurants/feeds" 
        :class="{active: $route.name === 'restaurants-feeds'}"
        >
          <img src="./../assets/icons/feedback.png">
        </router-link>
      </li>
      <li class="items">
        <router-link to="/restaurants/top"
        :class="{active: $route.name === 'restaurants-tops'}"
        >
          <img src="./../assets/icons/restaurant.png">
        </router-link>
      </li>
      <li class="items">
        <router-link to="/users/top"
        :class="{active: $route.name === 'users-top'}"
        >
          <img src="./../assets/icons/group.png">
        </router-link>
      </li>
    </ul> 
  </div>
</template>

<style scoped>
ul {
  margin-bottom: 0;
}

li:hover img {
  border: 2px solid #f28705;
  border-radius: 50%;
  background-color: #f28705;
}

img {
  border: 2px solid transparent;
  padding: 5px;
}

.active img {
  border: 2px solid #f28705;
  border-radius: 50%;
  background-color: #f28705;
}

.nav-tabs {
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
</style>