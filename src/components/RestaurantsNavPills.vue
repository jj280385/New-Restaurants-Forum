// ./src/components/RestaurantsNavPills.vue
<template>
  <div>
    <ul class="nav nav-pills nav-tabs">
      <li class="nav-item">
        <router-link class="nav-link" :to="{ name: 'restaurants' }">
          ALL
        </router-link>
      </li>

      <li v-for="category in categories" :key="category.id" class="nav-item">
        <router-link
          class="nav-link"
          :to="{ name: 'restaurants', query: { categoryId: category.id } }"
        >
          {{ category.name }}
        </router-link>
      </li>
    </ul>
    <!-- dropdown-toggle for RWD <576px -->
    <div class="header">
      <div class="title-area mt-5 pt-3 mx-3">
        <div class="page-title ml-4">
          <span> HOME </span>
        </div>
        <div class="dropdown">
          <button
            class="btn dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Toggle Category
          </button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <li class="nav-item">
              <router-link 
              class="nav-link" 
              :to="{ name:  'restaurants'}">
                ALL
              </router-link>
            </li>
            <li
              v-for="category in categories"
              :key="category.id"
              class="nav-item"
            >
              <router-link
                class="nav-link"
                :to="{
                  name: 'restaurants',
                  query: { categoryId: category.id },
                }"
              >
                {{ category.name }}
              </router-link>
            </li>
          </div>
        </div>
      </div>
      <p class="ml-5">● Use dropdown to toggle category.</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    categories: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.active, .dropdown-toggle {
  background-color: #f28705;
  color: white;
}

.active, .nav-link.active {  
  color: white;
}

/* nav-pills for RWD >576px */
.nav-pills {
  display: flex;
  align-items: center;
  animation: fadeInUp;
  animation-duration: 3s;
  margin: 0 30px;
}

.nav-tabs {
  border-bottom: 2px solid #f28705;
  animation-duration: 3s;
}

.nav-pills .nav-link {
  color: #595959;
  transition: none;
  border-radius: 3px 3px 0 0;
  border: 2px solid transparent;
}

.nav-pills .nav-link.active,
.nav-link:hover,
.nav-pills .show > .nav-link {
  border-width: 2px;
  color: white;
  background-color: #f28705;
  border: 2px solid #f28705;
}

/* dropdown-toggle for RWD <576px */
.header {
  animation: fadeInLeft;
  animation-duration: 3s;
}

.title-area {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

span {
  font-size: 50px;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  font-weight: 500;
}

.btn {
  color: white;
}

.nav-link {
  color: #595959;
}

.nav-link:hover .nav-link {
  color: #f28705;
}

p {
  font-style: italic;
  width: 67%;
  border-bottom: 1px solid #595959;
}

@media (max-width: 575px) {
  .nav {
    display: none;
  }
}

@media (min-width: 576px) {
  .header {
    display: none;
  }
}

@media (min-width: 576px) and (max-width: 767px) {
  .nav-pills {
    margin: 30px 8px 5px 8px;
  }

  .nav-pills .nav-link {
    padding: 5px 5px 2px 5px;
    font-size: 14px;
  }
}

@media (min-width: 768px) and (max-width: 991px) {
  .nav-pills {
    margin: 40px 30px 10px 30px;
  }

  .nav-pills .nav-link {
    padding: 5px 10px 2px 10px;
    font-size: 16px;
  }
}

@media (min-width: 992px) {
  .nav-pills {
    margin: 60px 0 15px 0;
  }

  .nav-pills .nav-link {
    padding: 5px 15px 5px 15px;
    font-size: 18px;
  }
}

@media (min-width: 1439px) {
  .nav-pills {
    margin: 68px 30px 10px 30px;
  }

  .nav-pills .nav-link {
    padding: 5px 15px 5px 15px;
    font-size: 20px;
  }
}
</style>