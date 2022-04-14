// ./src/components/NavTabs.vue
<template>
  <div class="tabs-container">
    <ul class="nav nav-tabs">
      <li v-for="tab in tabs" :key="tab.id" class="nav-item">
        <router-link 
        :to="tab.path" 
        class="nav-link"  
        :class="{ 'active': tab.title === 'HOME' && $route.name === 'restaurants'}"
        >
          {{ tab.title }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { v4 as uuidv4 } from "uuid";
import "animate.css";

export default {
  data() {
    return {
      tabs: [
        {
          id: uuidv4(),
          title: "HOME",
          path: "/restaurants",
        },
        {
          id: uuidv4(),
          title: "NEWS FEED",
          path: "/restaurants/feeds",
        },
        {
          id: uuidv4(),
          title: "TOP 10 RESTAURANTS",
          path: "/restaurants/top",
        },
        {
          id: uuidv4(),
          title: "FOODIES",
          path: "/users/top",
        },
      ],
    };
  },
};
</script>

<style scoped>
.tabs-container {
  position: absolute;
  top: 78%;
  left: 50%;
  transform: translate(-50%);
  width: 90%;
  height: 100px;
  border-radius: 5px;
  background-color: rgba(105, 2, 2, 1);
  box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
}

.nav-tabs {
  border: none;
  animation: fadeIn; 
  animation-duration: 3s;
}

.nav-tabs .nav-link:focus,
.nav-tabs .nav-link:hover,
.nav-tabs .nav-item.show .nav-link,
.nav-tabs .nav-link.active {
  border-color: white;
  background-color: transparent;
  color: white;
  border-radius: 3px;
}

.nav {
  width: 100%;
  height: 50px;
  justify-content: space-evenly;
}

.nav-link {
  color: rgba(255, 255, 255, 0.7);
  font-size: 20px;
  font-family: "Helvetica Neue";
  animation-duration: 2s;
}

</style>