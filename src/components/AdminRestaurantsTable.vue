// ./src/components/AdminRestaurantsTable.vue
<template>
  <Spinner v-if="isLoading" class="admin-spinner" />
  <table class="table mt-3 mb-5" v-else>
    <thead class="thead">
      <tr class="tr-header">
        <th scope="col" class="column pl-3">ID</th>
        <th scope="col" class="column">Category</th>
        <th scope="col" class="column">Name</th>
        <th scope="col" class="column">Action</th>
      </tr>
    </thead>
    <tbody v-show="!isLoading">
      <tr
        v-for="restaurant in restaurants"
        :key="restaurant.id"
        class="tr-item"
      >
        <th scope="row" class="id pl-4">
          {{ restaurant.id }}
        </th>
        <td class="category">
          {{ restaurant.Category ? restaurant.Category.name : "uncategorized" }}
        </td>
        <td class="restaurant-name">
          <router-link
            class="title"
            :to="{ name: 'restaurant', params: { id: restaurant.id } }"
          >
            {{ restaurant.name }}
          </router-link>
        </td>
        <td class="d-flex justify-content-between">
          <router-link
            :to="{ name: 'admin-restaurant', params: { id: restaurant.id } }"
            class="btn btn-link"
            >Show</router-link
          >

          <router-link
            :to="{
              name: 'admin-restaurant-edit',
              params: {
                id: restaurant.id,
              },
            }"
            class="btn btn-link"
          >
            Edit
          </router-link>

          <button
            type="button"
            class="btn delete"
            @click.stop.prevent="deleteRestaurant(restaurant.id)"
          >
            Delete
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import adminAPI from "./../apis/admin";
import { Toast } from "./../utils/helpers";
import Spinner from "./../components/Spinner";

export default {
  components: {
    Spinner,
  },
  data() {
    return {
      restaurants: [],
      isLoading: true,
    };
  },
  created() {
    this.fetchRestaurants();
  },
  methods: {
    // 取得餐廳列表
    async fetchRestaurants() {
      try {
        const { data } = await adminAPI.restaurants.get();

        if (data.status === "error") {
          throw new Error(data.message);
        }

        this.restaurants = data.restaurants;
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;

        Toast.fire({
          icon: "error",
          title: "無法取得餐廳資料，請稍後再試",
        });
      }
    },

    // 刪除餐廳資料
    async deleteRestaurant(restaurantId) {
      try {
        const { data } = await adminAPI.restaurants.deleteRestaurant({
          restaurantId,
        });

        if (data.status === "error") {
          throw new Error(data.message);
        }

        // 運用 filter 重新過濾一次資料陣列，把「不是 restaurant.id 的資料保留下來」。
        this.restaurants = this.restaurants.filter(
          (restaurant) => restaurant.id !== restaurantId
        );

        Toast.fire({
          icon: "success",
          title: "刪除餐廳成功",
        });
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法刪除餐廳，請稍後再試",
        });
      }
    },
  },
};
</script>

<style scoped>
.table {
  margin-bottom: 100px;
}

.title,
.btn-link {
  text-decoration: none;
}

.title {
  font-weight: 500;
  display: inline-block;
}

.btn-link {
  font-weight: 400;
  border: 2px solid transparent;
}

.title:hover {
  color: black;
}

.title::after {
  content: "";
  display: block;
  width: 0;
  background: #f28705;
  transition: width 1s;
}

.title:hover::after {
  width: 100%;
}

.title::after {
  height: 2.5px;
}

.btn-link:hover {
  border-bottom: 2px solid #f28705;
}

@media (max-width: 576px) {
  .column, .title {
    font-size: 16px;
  }

  .id, .category, .btn-link, 
  .delete {
    font-size: 14px;
  }

  .table td {
    padding: 5px 0;
    text-align: center;
  }

  .btn {
    padding: 0 8px 0 0;
  }
}

@media (min-width: 576px) and (max-width: 767px) {
  .column, .title, .id, 
  .category, .btn-link, .delete {
    font-size: 16px;
  }

  .btn {
    padding: 0 5px 0 0;
  }
}

@media (min-width: 768px) and (max-width: 991px) {
  .column, .title {
    font-size: 20px;
  }

  .id, .category, .btn-link, 
  .delete {
    font-size: 18px;
  }
}

@media (min-width: 992px) {
  .column, .title {
    font-size: 22px;
  }

  .id, .category, .btn-link, 
  .delete {
    font-size: 20px;
  }
}
</style>