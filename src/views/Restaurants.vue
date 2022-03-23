// ./src/views/Restaurants.vue
// ./src/views/Restaurants.vue
<template>
  <div class="container py-5">
    <NavTabs />
    <!-- 餐廳類別標籤 RestaurantsNavPills -->
    <RestaurantsNavPills :categories="categories" />

    <div class="row">
      <!-- 餐廳卡片 RestaurantCard-->
      <RestaurantCard
        v-for="restaurant in restaurants"
        :key="restaurant.id"
        :initial-restaurant="restaurant"
      />
    </div>

    <!-- 分頁標籤 RestaurantPagination -->
    <RestaurantsPagination
      v-if="totalPage.length > 1"
      :current-page="currentPage"
      :total-page="totalPage"
      :category-id="categoryId"
      :previous-page="previousPage"
      :next-page="nextPage"
    />
  </div>
</template>

<script>
import NavTabs from "./../components/NavTabs.vue";
import RestaurantCard from "./../components/RestaurantCard.vue";
import RestaurantsNavPills from "./../components/RestaurantsNavPills";
import RestaurantsPagination from "./../components/RestaurantsPagination";

const dummyData = {
  restaurants: [
    {
      id: 1,
      name: "Sylvester Hauck",
      tel: "(813) 367-7905",
      address: "1690 Turner Well",
      opening_hours: "08:00",
      description: "Quam autem accusamus eos laboriosam.\nCorporis reru",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=57.31300539537876",
      viewCounts: 1,
      createdAt: "2022-02-15T03:53:45.000Z",
      updatedAt: "2022-02-26T23:39:20.000Z",
      CategoryId: 1,
      Category: {
        id: 1,
        name: "中式料理",
        createdAt: "2022-02-15T03:53:45.000Z",
        updatedAt: "2022-02-15T03:53:45.000Z",
      },
      isFavorited: false,
      isLiked: false,
    },
    {
      id: 2,
      name: "Ms. Daisy Lowe",
      tel: "757-985-2239 x557",
      address: "94611 Legros Street",
      opening_hours: "08:00",
      description: "aut sunt totam",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=32.748984211089",
      viewCounts: 0,
      createdAt: "2022-02-15T03:53:45.000Z",
      updatedAt: "2022-02-15T03:53:45.000Z",
      CategoryId: 3,
      Category: {
        id: 3,
        name: "義大利料理",
        createdAt: "2022-02-15T03:53:45.000Z",
        updatedAt: "2022-02-15T03:53:45.000Z",
      },
      isFavorited: false,
      isLiked: false,
    },
    {
      id: 3,
      name: "Fausto Schultz",
      tel: "(828) 973-9305 x76105",
      address: "719 Mayert Tunnel",
      opening_hours: "08:00",
      description: "Fugit blanditiis quia aspernatur eos at possimus v",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=33.706516124447546",
      viewCounts: 0,
      createdAt: "2022-02-15T03:53:45.000Z",
      updatedAt: "2022-02-15T03:53:45.000Z",
      CategoryId: 3,
      Category: {
        id: 3,
        name: "義大利料理",
        createdAt: "2022-02-15T03:53:45.000Z",
        updatedAt: "2022-02-15T03:53:45.000Z",
      },
      isFavorited: false,
      isLiked: false,
    },
    {
      id: 4,
      name: "Vickie Heller",
      tel: "296.006.0097",
      address: "06757 Powlowski Ways",
      opening_hours: "08:00",
      description: "Sapiente fugiat esse eos nemo nesciunt earum. Repu",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=89.56567944747414",
      viewCounts: 0,
      createdAt: "2022-02-15T03:53:45.000Z",
      updatedAt: "2022-02-15T03:53:45.000Z",
      CategoryId: 5,
      Category: {
        id: 5,
        name: "素食料理",
        createdAt: "2022-02-15T03:53:45.000Z",
        updatedAt: "2022-02-15T03:53:45.000Z",
      },
      isFavorited: false,
      isLiked: false,
    },
    {
      id: 5,
      name: "Angie Breitenberg",
      tel: "358-310-1839 x887",
      address: "48693 Kilback View",
      opening_hours: "08:00",
      description: "eum",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=26.857058197885753",
      viewCounts: 0,
      createdAt: "2022-02-15T03:53:45.000Z",
      updatedAt: "2022-02-15T03:53:45.000Z",
      CategoryId: 2,
      Category: {
        id: 2,
        name: "日本料理",
        createdAt: "2022-02-15T03:53:45.000Z",
        updatedAt: "2022-02-15T03:53:45.000Z",
      },
      isFavorited: false,
      isLiked: false,
    },
    {
      id: 6,
      name: "Mrs. Tatum Sanford",
      tel: "157-267-1571 x935",
      address: "581 Judah Union",
      opening_hours: "08:00",
      description: "Animi rerum vitae.\nLaboriosam impedit et quis nobi",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=95.40942893654156",
      viewCounts: 0,
      createdAt: "2022-02-15T03:53:45.000Z",
      updatedAt: "2022-02-15T03:53:45.000Z",
      CategoryId: 1,
      Category: {
        id: 1,
        name: "中式料理",
        createdAt: "2022-02-15T03:53:45.000Z",
        updatedAt: "2022-02-15T03:53:45.000Z",
      },
      isFavorited: false,
      isLiked: false,
    },
    {
      id: 7,
      name: "Vladimir Kihn",
      tel: "406-315-9660",
      address: "5043 Cary Crescent",
      opening_hours: "08:00",
      description: "Blanditiis sequi ea laborum hic. Accusamus officia",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=71.37537519668544",
      viewCounts: 0,
      createdAt: "2022-02-15T03:53:45.000Z",
      updatedAt: "2022-02-15T03:53:45.000Z",
      CategoryId: 3,
      Category: {
        id: 3,
        name: "義大利料理",
        createdAt: "2022-02-15T03:53:45.000Z",
        updatedAt: "2022-02-15T03:53:45.000Z",
      },
      isFavorited: false,
      isLiked: false,
    },
    {
      id: 8,
      name: "Reece Roberts DDS",
      tel: "885-527-5377 x46555",
      address: "98359 Ashlynn Hills",
      opening_hours: "08:00",
      description: "Dolor doloremque explicabo illum suscipit nesciunt",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=84.80575162646599",
      viewCounts: 0,
      createdAt: "2022-02-15T03:53:45.000Z",
      updatedAt: "2022-02-15T03:53:45.000Z",
      CategoryId: 3,
      Category: {
        id: 3,
        name: "義大利料理",
        createdAt: "2022-02-15T03:53:45.000Z",
        updatedAt: "2022-02-15T03:53:45.000Z",
      },
      isFavorited: false,
      isLiked: false,
    },
    {
      id: 9,
      name: "Norma White",
      tel: "836.195.0729 x7509",
      address: "0314 Genevieve Place",
      opening_hours: "08:00",
      description: "Corrupti soluta reiciendis est. Suscipit velit rec",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=3.1766814872193905",
      viewCounts: 0,
      createdAt: "2022-02-15T03:53:45.000Z",
      updatedAt: "2022-02-15T03:53:45.000Z",
      CategoryId: 3,
      Category: {
        id: 3,
        name: "義大利料理",
        createdAt: "2022-02-15T03:53:45.000Z",
        updatedAt: "2022-02-15T03:53:45.000Z",
      },
      isFavorited: false,
      isLiked: false,
    },
    {
      id: 10,
      name: "Green Marquardt",
      tel: "779.692.8187 x0619",
      address: "65962 Izabella Mission",
      opening_hours: "08:00",
      description: "itaque",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=73.67512243532543",
      viewCounts: 0,
      createdAt: "2022-02-15T03:53:45.000Z",
      updatedAt: "2022-02-15T03:53:45.000Z",
      CategoryId: 2,
      Category: {
        id: 2,
        name: "日本料理",
        createdAt: "2022-02-15T03:53:45.000Z",
        updatedAt: "2022-02-15T03:53:45.000Z",
      },
      isFavorited: false,
      isLiked: false,
    },
  ],
  categories: [
    {
      id: 1,
      name: "中式料理",
      createdAt: "2022-02-15T03:53:45.000Z",
      updatedAt: "2022-02-15T03:53:45.000Z",
    },
    {
      id: 2,
      name: "日本料理",
      createdAt: "2022-02-15T03:53:45.000Z",
      updatedAt: "2022-02-15T03:53:45.000Z",
    },
    {
      id: 3,
      name: "義大利料理",
      createdAt: "2022-02-15T03:53:45.000Z",
      updatedAt: "2022-02-15T03:53:45.000Z",
    },
    {
      id: 4,
      name: "墨西哥料理",
      createdAt: "2022-02-15T03:53:45.000Z",
      updatedAt: "2022-02-15T03:53:45.000Z",
    },
    {
      id: 5,
      name: "素食料理",
      createdAt: "2022-02-15T03:53:45.000Z",
      updatedAt: "2022-02-15T03:53:45.000Z",
    },
    {
      id: 6,
      name: "美式料理",
      createdAt: "2022-02-15T03:53:45.000Z",
      updatedAt: "2022-02-15T03:53:45.000Z",
    },
    {
      id: 7,
      name: "複合式料理",
      createdAt: "2022-02-15T03:53:45.000Z",
      updatedAt: "2022-02-15T03:53:45.000Z",
    },
  ],
  categoryId: "",
  page: 1,
  totalPage: [1, 2, 3, 4, 5],
  prev: 1,
  next: 2,
};

export default {
  components: {
    NavTabs,
    RestaurantCard,
    RestaurantsNavPills,
    RestaurantsPagination,
  },
  data() {
    return {
      restaurants: [],
      categories: [],
      categoryId: -1,
      currentPage: 1,
      totalPage: [],
      previousPage: -1,
      nextPage: -1,
    };
  },
  created() {
    this.fetchRestaurants();
  },
  methods: {
    fetchRestaurants() {
      const {
        restaurants,
        categories,
        categoryId,
        page,
        totalPage,
        prev,
        next,
      } = dummyData;
      this.restaurants = restaurants;
      this.categories = categories;
      this.categoryId = categoryId;
      this.currentPage = page;
      this.totalPage = totalPage;
      this.previousPage = prev;
      this.nextPage = next;
    },
  },
};
</script>