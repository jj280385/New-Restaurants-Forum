// ./src/components/NavTabs.vue
<template>
  <div class="tabs-container">
    <ul class="nav nav-tabs">
      <li v-for="tab in tabs" :key="tab.id" class="nav-item">
        <router-link
          :to="tab.path"
          class="nav-link"
          :class="{
            active: tab.title === 'HOME' && $route.name === 'home',
          }"
        >
          {{ tab.title }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { v4 as uuidv4 } from "uuid";

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
          title: "LATEST NEWS",
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
  top: 80%;
  left: 50%;
  transform: translate(-50%);
  border-radius: 5px;
  background-color: rgba(105, 2, 2, 1);
  box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  animation: fadeIn;
  animation-duration: 3s;
}

.nav-tabs {
  border: none;
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
  justify-content: space-evenly;
  align-items: center;
}

.nav-link {
  color: rgba(255, 255, 255, 0.7);
  font-family: "Helvetica Neue";
  animation-duration: 3s;
  display: flex;
  align-items: center;
}

@media (max-width: 575px) {
  .tabs-container {
    display: none;
  }
}

@media (min-width: 576px) and (max-width: 767px) {
  .tabs-container {
    width: 85%;
    height: 50px;
    top: 35%;
  }

  .nav {
    height: 30px;
  }

  .nav-link {
    font-size: 14px;
    height: 30px;
  }
}

@media (min-width: 768px) and (max-width: 991px) {
  .tabs-container {
    width: 85%;
    height: 60px;
    top: 44%;
  }

  .nav {
    height: 40px;
  }

  .nav-link {
    font-size: 16px;
    height: 38px;
  }
}

@media (min-width: 992px) {
  .tabs-container {
    width: 90%;
    height: 75px;
    top: 52%;
  }

  .nav {
    height: 50px;
  }

  .nav-link {
    font-size: 20px;
    height: 48px;
  }
}

@media (min-width: 1439px) {
  .tabs-container {
    width: 90%;
    height: 85px;
    top: 55%;
  }
  
  .nav-link {
    font-size: 22px;
    height: 50px;
  }
}
</style>


