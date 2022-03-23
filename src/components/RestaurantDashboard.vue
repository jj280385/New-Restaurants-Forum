<template>
  <div class="container py-5">
    <div>
      <h1>{{ restaurant.name }}</h1>
      <span class="badge badge-secondary mt-1 mb-3">
        {{ restaurant.categoryName }}
      </span>
    </div>

    <hr />

    <ul>
      <li>評論數： {{ restaurant.commentsLength }}</li>
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
    name: "Sylvester Hauck",
    tel: "(813) 367-7905",
    address: "1690 Turner Well",
    opening_hours: "08:00",
    description:
      "Quam autem accusamus eos laboriosam.\nCorporis rerum voluptatibus dolores facere nihil.\nEveniet ut debitis fuga praesentium.\nConsequuntur voluptate non hic similique vero dolor quia saepe.",
    image:
      "https://loremflickr.com/320/240/restaurant,food/?random=57.31300539537876",
    viewCounts: 2,
    createdAt: "2022-02-15T03:53:45.000Z",
    updatedAt: "2022-03-22T13:42:42.000Z",
    CategoryId: 1,
    Category: {
      id: 1,
      name: "中式料理",
      createdAt: "2022-02-15T03:53:45.000Z",
      updatedAt: "2022-02-15T03:53:45.000Z",
    },
    Comments: [
      {
        id: 51,
        text: "Temporibus unde a voluptatem nostrum et qui.",
        UserId: 1,
        RestaurantId: 1,
        createdAt: "2022-02-15T03:53:45.000Z",
        updatedAt: "2022-02-15T03:53:45.000Z",
        User: {
          id: 1,
          name: "root",
          email: "root@example.com",
          password:
            "$2a$10$Yxrxlf8.uVNrnfxgfflfCe1KWFgxZOOZxc9E2X6806ZEuW4LH5WbW",
          isAdmin: true,
          image: null,
          createdAt: "2022-02-15T03:53:45.000Z",
          updatedAt: "2022-02-15T03:53:45.000Z",
        },
      },
      {
        id: 101,
        text: "Neque est aliquid modi.",
        UserId: 1,
        RestaurantId: 1,
        createdAt: "2022-02-15T03:53:45.000Z",
        updatedAt: "2022-02-15T03:53:45.000Z",
        User: {
          id: 1,
          name: "root",
          email: "root@example.com",
          password:
            "$2a$10$Yxrxlf8.uVNrnfxgfflfCe1KWFgxZOOZxc9E2X6806ZEuW4LH5WbW",
          isAdmin: true,
          image: null,
          createdAt: "2022-02-15T03:53:45.000Z",
          updatedAt: "2022-02-15T03:53:45.000Z",
        },
      },
      {
        id: 1,
        text: "Minima a nihil nam sed similique adipisci fugiat necessitatibus eum.",
        UserId: 2,
        RestaurantId: 1,
        createdAt: "2022-02-15T03:53:45.000Z",
        updatedAt: "2022-02-15T03:53:45.000Z",
        User: {
          id: 2,
          name: "user1",
          email: "user1@example.com",
          password:
            "$2a$10$Qm5VdQxvP1RW.FwtkSx3Je1dThQIrZmMld2Hr2YwetRIXvESBr70q",
          isAdmin: false,
          image: null,
          createdAt: "2022-02-15T03:53:45.000Z",
          updatedAt: "2022-02-15T03:53:45.000Z",
        },
      },
    ],
  },
};
export default {
  data() {
    return {
      restaurant: {
        id: -1,
        name: "",
        categoryName: "",
        commentsLength: 0,
        viewCounts: 0,
      },
    };
  },
  created() {
    this.fetchRestaurant();
  },
  methods: {
    fetchRestaurant() {
      const { id, name, Category, Comments, viewCounts } = dummyData.restaurant;
      this.restaurant = {
        ...this.restaurant,
        id,
        name,
        categoryName: Category ? Category.name : "未分類",
        commentsLength: Comments.length,
        viewCounts,
      };
    },
  },
};
</script>