// ./src/views/RestaurantsFeeds.vue
<template>
  <div class="main-container">
    <JumbotronForFeed />
    <!-- BottomNavTabs for RWD <576px -->
    <BottomNavTabs class="bottom-nav" />
    <div class="card-container">
      <!-- NavTabs for RWD >576px -->
      <NavTabs />
      <Spinner v-if="isLoading" />
      <template v-else>
        <div class="page-title mt-5 pt-4 ml-4">
          <span> LATEST NEWS </span>
          <p>● Use dropdown to see more.</p>
        </div>
        <div class="row mt-5">
          <div class="col-sm-12 col-md-6">
            <!-- 最新餐廳 NewestRestaurants -->
            <NewestRestaurants :restaurants="restaurants" />
          </div>

          <div class="col-sm-12 col-md-6">
            <!-- 最新評論 NewestComments-->
            <NewestComments :comments="comments" />
          </div>
        </div>
        <!-- collapse for RWD <576px -->
        <div class="col mt-4">
          <p class="hint">● Use dropdown to see more.</p>
          <div class="collapseOne">
            <div class="card-header for-rwd">
              <button
                class="btn btn-light dropdown-toggle"
                type="button"
                data-toggle="collapse"
                data-target="#collapseOne"
                aria-expanded="false"
                aria-controls="collapseOne"
              >
                Newest Restaurants
              </button>
            </div>
            <div class="col-sm-12 col-md-6" id="collapseOne">
              <!-- 最新餐廳 NewestRestaurants -->
              <NewestRestaurants :restaurants="restaurants" />
            </div>
          </div>
          <div class="collapseTwo">
            <div class="card-header for-rwd mt-4">
              <button
                class="btn btn-light dropdown-toggle"
                type="button"
                data-toggle="collapse"
                data-target="#collapseTwo"
                aria-expanded="false"
                aria-controls="collapseTwo"
              >
                Newest Comments
              </button>
            </div>
            <div class="col-sm-12 col-md-6" id="collapseTwo">
              <!-- 最新評論 NewestComments-->
              <NewestComments :comments="comments" />
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import NavTabs from "./../components/NavTabs.vue";
import NewestRestaurants from "./../components/NewestRestaurants";
import NewestComments from "./../components/NewestComments";
import restaurantsAPI from "./../apis/restaurants";
import { Toast } from "./../utils/helpers";
import Spinner from "./../components/Spinner";
import JumbotronForFeed from "./../components/JumbotronForFeed";
import BottomNavTabs from "./../components/BottomNavTabs.vue";

export default {
  components: {
    NavTabs,
    NewestRestaurants,
    NewestComments,
    Spinner,
    JumbotronForFeed,
    BottomNavTabs,
  },
  data() {
    return {
      restaurants: [],
      comments: [],
      isLoading: true,
    };
  },
  created() {
    this.fetchFeeds();
  },
  methods: {
    async fetchFeeds() {
      try {
        const { data, statusText } = await restaurantsAPI.getFeeds();

        if (statusText !== "OK") {
          throw new Error(statusText);
        }

        this.restaurants = data.restaurants;
        this.comments = data.comments.filter((comment) => comment.Restaurant);
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        Toast.fire({
          icon: "error",
          title: "無法取得最新動態，請稍後再試",
        });
      }
    },
  },
};
</script>

<style scoped>
.card-container {
  margin: 3%;
}

.body {
  display: flex;
  justify-content: center;
}

p {
  display: flex;
  justify-content: space-around;
}

.hint {
  width: 50%;
  font-size: 18px;
}

.for-rwd {
  padding: 0;
  background-color: transparent;
}

.btn {
  background-color: transparent;
  border: 1px solid #d5cec0;
  border-bottom: none;
  border-radius: 3px 3px 0 0;
  width: 50%;
  font-size: 20px;
  font-weight: 600;
  color: #595959;
}

.for-rwd:hover .btn {
  border: 1px solid #8c0303;
}

#collapseOne,
#collapseTwo {
  padding: 0;
}

span {
  font-size: 40px;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  font-weight: 500;
}

.page-title {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

p {
  font-style: italic;
  border-bottom: 1px solid #595959;
}

.collapseOne {
  animation: fadeInRight;
  animation-duration: 2s;
}

.collapseTwo {
  animation: fadeInLeft;
  animation-duration: 2s;
}

@media (max-width: 575px) {
  .row,
  .hint {
    display: none;
  }

  .dropdown-toggle {
    width: 62%;
    font-size: 18px;
  }
}

@media (min-width: 576px) {
  .page-title,
  .bottom-nav {
    display: none;
  }
}

@media (min-width: 576px) and (max-width: 767px) {
  .row {
    display: none;
  }

  .btn {
    color: #595959;
  }
}

@media (min-width: 768px) {
  .col {
    display: none;
  }

  .row {
    display: flex;
  }
}
</style>