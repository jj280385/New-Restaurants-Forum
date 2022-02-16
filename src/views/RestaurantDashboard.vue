<template>
  <div class="container py-5">
    <div>
      <h1>{{ restaurant.name }}</h1>
      <span class="badge badge-secondary mt-1 mb-3">
        {{ restaurant.Category.name }}
      </span>
    </div>

    <hr />

    <ul>
      <li>評論數： {{ restaurant.Comments.length }}</li>
      <li>瀏覽次數： {{ restaurant.viewCounts }}</li>
    </ul>

    <button type="button" class="btn btn-link" @click="$router.back()">
      回上一頁
    </button>
  </div>
</template>

<script>
const dummyData = {
  restaurant: {
    id: 1,
    name: "Albert Gottlieb DVM",
    tel: "747-225-7090",
    address: "76818 Jerde Course",
    opening_hours: "08:00",
    description:
      "Officiis repellat repellendus reiciendis dolore esse.\nIpsa culpa ducimus voluptatum tenetur.",
    image:
      "https://loremflickr.com/320/240/restaurant,food/?random=52.83383915249684",
    viewCounts: 7,
    createdAt: "2021-12-29T15:47:04.000Z",
    updatedAt: "2022-01-02T15:05:21.000Z",
    CategoryId: 4,
    Category: {
      id: 4,
      name: "墨西哥料理",
      createdAt: "2021-12-29T15:47:04.000Z",
      updatedAt: "2021-12-29T15:47:04.000Z",
    },
    Comments: [],
  },
};

export default {
  name: "RestaurantDashboard",
  data() {
    return {
      restaurant: {},
    };
  },
  created() {
    this.fetchRestaurant();
  },
  methods: {
    fetchRestaurant() {
      const { restaurant } = dummyData;
      this.restaurant = restaurant;
    },
  },
};
</script>