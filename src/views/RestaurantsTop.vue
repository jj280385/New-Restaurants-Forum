// ./src/views/RestaurantsTop.vue
<template>
  <div class="container py-5">
    <NavTabs />
    <h1 class="mt-5">人氣餐廳</h1>

    <hr />
    <div class="card mb-3" style="max-width: 540px; margin: auto">
      <div
        class="row no-gutters"
        v-for="restaurant in restaurants"
        :key="restaurant.id"
      >
        <div class="col-md-4">
          <a href="#">
            <img class="card-img" :src="restaurant.image" />
          </a>
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">
              {{ restaurant.name }}
            </h5>
            <span class="badge badge-secondary"
              >收藏數：{{ restaurant.FavoriteCount }}</span
            >
            <p class="card-text">
              {{ restaurant.description }}
            </p>
            <router-link
              href="#"
              class="btn btn-primary mr-2"
              :to="{ name: 'restaurant', params: { id: restaurant.id } }"
              >Show</router-link
            >

            <button
              v-if="restaurant.isFavorited"
              type="button"
              class="btn btn-danger mr-2"
              @click.stop.prevent="deleteFavorite(restaurant)"
            >
              移除最愛
            </button>
            <button
              v-else
              type="button"
              class="btn btn-primary"
              @click.stop.prevent="addFavorite(restaurant)"
            >
              加到最愛
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavTabs from "./../components/NavTabs.vue";

const dummyData = {
  restaurants: [
    {
      id: 50,
      name: "Ryleigh Ullrich MD",
      tel: "1-172-530-1073",
      address: "60005 Ebert Extensions",
      opening_hours: "08:00",
      description: "Rerum modi labore at.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=41.01274672500628",
      viewCounts: 0,
      createdAt: "2022-02-15T03:53:45.000Z",
      updatedAt: "2022-02-15T03:53:45.000Z",
      CategoryId: 4,
      FavoritedUsers: [],
      isFavorited: false,
      FavoriteCount: 0,
    },
    {
      id: 49,
      name: "Ashlynn Hodkiewicz",
      tel: "727-171-4018 x310",
      address: "846 Bechtelar Crossroad",
      opening_hours: "08:00",
      description: "Debitis odit aut eligendi.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=45.80733720908625",
      viewCounts: 0,
      createdAt: "2022-02-15T03:53:45.000Z",
      updatedAt: "2022-02-15T03:53:45.000Z",
      CategoryId: 3,
      FavoritedUsers: [],
      isFavorited: false,
      FavoriteCount: 0,
    },
    {
      id: 48,
      name: "Avery Weissnat",
      tel: "692-031-1856 x56866",
      address: "03535 Ruby Port",
      opening_hours: "08:00",
      description: "Corrupti et dolores ratione. Fuga accusantium et. ",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=63.73601442766341",
      viewCounts: 0,
      createdAt: "2022-02-15T03:53:45.000Z",
      updatedAt: "2022-02-15T03:53:45.000Z",
      CategoryId: 1,
      FavoritedUsers: [],
      isFavorited: false,
      FavoriteCount: 0,
    },
    {
      id: 47,
      name: "Shanelle Yundt",
      tel: "1-805-142-2650",
      address: "9610 Leffler Stream",
      opening_hours: "08:00",
      description: "Et voluptatem neque atque minima. Ex voluptatibus ",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=27.52558173529014",
      viewCounts: 0,
      createdAt: "2022-02-15T03:53:45.000Z",
      updatedAt: "2022-02-15T03:53:45.000Z",
      CategoryId: 3,
      FavoritedUsers: [],
      isFavorited: false,
      FavoriteCount: 0,
    },
    {
      id: 46,
      name: "Ryann Rippin",
      tel: "1-020-874-8995 x0712",
      address: "0938 Pagac Corner",
      opening_hours: "08:00",
      description: "velit perspiciatis est",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=68.43301504377366",
      viewCounts: 0,
      createdAt: "2022-02-15T03:53:45.000Z",
      updatedAt: "2022-02-15T03:53:45.000Z",
      CategoryId: 5,
      FavoritedUsers: [],
      isFavorited: false,
      FavoriteCount: 0,
    },
    {
      id: 45,
      name: "Mr. Chance Klocko",
      tel: "(010) 175-3384 x81049",
      address: "38925 Renner Field",
      opening_hours: "08:00",
      description: "qui",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=98.83661810195544",
      viewCounts: 0,
      createdAt: "2022-02-15T03:53:45.000Z",
      updatedAt: "2022-02-15T03:53:45.000Z",
      CategoryId: 1,
      FavoritedUsers: [],
      isFavorited: false,
      FavoriteCount: 0,
    },
    {
      id: 44,
      name: "Kip Bruen",
      tel: "618.278.3658",
      address: "2245 Goodwin Harbor",
      opening_hours: "08:00",
      description: "Et vero perspiciatis eaque qui dolore nihil harum ",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=4.9144905653760285",
      viewCounts: 0,
      createdAt: "2022-02-15T03:53:45.000Z",
      updatedAt: "2022-02-15T03:53:45.000Z",
      CategoryId: 3,
      FavoritedUsers: [],
      isFavorited: false,
      FavoriteCount: 0,
    },
    {
      id: 43,
      name: "Piper Keeling",
      tel: "877.309.6491 x326",
      address: "3406 Geovanni Isle",
      opening_hours: "08:00",
      description: "Officiis delectus quia incidunt explicabo vel et e",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=59.80624987824663",
      viewCounts: 0,
      createdAt: "2022-02-15T03:53:45.000Z",
      updatedAt: "2022-02-15T03:53:45.000Z",
      CategoryId: 4,
      FavoritedUsers: [],
      isFavorited: false,
      FavoriteCount: 0,
    },
    {
      id: 42,
      name: "Eugene Morissette",
      tel: "697.131.6468 x4940",
      address: "413 Parker Place",
      opening_hours: "08:00",
      description: "Omnis reiciendis asperiores in quia. Perferendis n",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=12.162598113324519",
      viewCounts: 0,
      createdAt: "2022-02-15T03:53:45.000Z",
      updatedAt: "2022-02-15T03:53:45.000Z",
      CategoryId: 2,
      FavoritedUsers: [],
      isFavorited: false,
      FavoriteCount: 0,
    },
    {
      id: 41,
      name: "Quinten Carroll DVM",
      tel: "1-880-877-7492 x6234",
      address: "736 Victor Way",
      opening_hours: "08:00",
      description: "fugiat",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=19.42024888772249",
      viewCounts: 0,
      createdAt: "2022-02-15T03:53:45.000Z",
      updatedAt: "2022-02-15T03:53:45.000Z",
      CategoryId: 3,
      FavoritedUsers: [],
      isFavorited: false,
      FavoriteCount: 0,
    },
  ],
};

export default {
  components: {
    NavTabs,
  },
  data() {
    return {
      restaurants: [],
    };
  },
  created() {
    this.fetchRestaurants();
  },
  methods: {
    fetchRestaurants() {
      this.restaurants = dummyData.restaurants;
    },
    addFavorite(restaurant) {
      restaurant.isFavorited = true
    },
    deleteFavorite(restaurant) {
      restaurant.isFavorited = false
    },
  },
};
</script>