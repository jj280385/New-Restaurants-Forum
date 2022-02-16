<template>
  <table class="table">
    <thead class="thead-dark">
      <tr>
        <th scope="col">#</th>
        <th scope="col">Category</th>
        <th scope="col">Name</th>
        <th scope="col" width="300">操作</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="restaurant in restaurants" :key="restaurant.id">
        <th scope="row">
          {{ restaurant.id }}
        </th>
        <td>{{ restaurant.Category ? restaurant.Category.name : "未分類" }}</td>
        <td>{{ restaurant.name }}</td>
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
            >Edit</router-link
          >

          <button
            type="button"
            class="btn btn-link"
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
import { Toast } from "./../utils/helpers";
import adminAPI from "./../apis/admin";

export default {
  data() {
    return {
      restaurants: [],
    };
  },
  created() {
    this.fetchAdminRestaurants();
  },
  methods: {
    async fetchAdminRestaurants() {
      try {
        const { data } = await adminAPI.restaurants.get();
        console.log("table", data);
        if (data.status === "error") {
          throw new Error(data.message);
        }

        const { restaurants } = data;
        this.restaurants = restaurants;
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "無法成功新增餐廳資料到後台！",
        });
      }
    },
    async deleteRestaurant(restaurantId) {
      try {
        const { data } = await adminAPI.restaurants.delete({ restaurantId });

        if (data.status === "error") {
          throw new Error(data.message);
        }

        this.restaurants = this.restaurants.filter(
          (restaurant) => restaurant.id !== restaurantId
        );

        Toast.fire({
          icon: "success",
          title: "成功刪除餐廳！",
        });
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "無法成功將餐廳移除，請稍等！",
        });
      }
    },
  },
};
</script>