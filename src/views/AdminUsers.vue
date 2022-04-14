<template>
  <div>
    <div class="admin-container py-3 px-5">
      <!-- AdminNav Component -->
      <AdminNav />
      <Spinner v-if="isLoading" class="admin-spinner" />
      <table v-else class="table my-4">
        <thead class="thead">
          <tr class="tr-header">
            <th scope="col" class="column pl-3" width="100">ID</th>
            <th scope="col" class="column">Email</th>
            <th scope="col" width="150" class="column">Role</th>
            <th scope="col" width="150" class="column">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id" class="tr-item">
            <th scope="row" class="id pl-4">{{ user.id }}</th>
            <td class="email">{{ user.email }}</td>
            <td class="role">{{ user.isAdmin ? "admin" : "user" }}</td>
            <td class="d-flex justify-content-between">
              <button
                v-if="currentUser.id !== user.id"
                type="button"
                class="btn btn-link"
                @click="
                  toggleUserRole({ userId: user.id, isAdmin: user.isAdmin })
                "
              >
                {{ user.isAdmin ? "set as user" : "set as admin" }}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <button type="button" class="btn btn-link back" @click="$router.back()">
      &lt; GO BACK
    </button>
  </div>
</template>

<script>
import AdminNav from "./../components/AdminNav";
import { mapState } from "vuex";
import adminAPI from "./../apis/admin";
import { Toast } from "./../utils/helpers";
import Spinner from "./../components/Spinner";

export default {
  components: {
    AdminNav,
    Spinner,
  },
  data() {
    return {
      users: [],
      isLoading: true,
    };
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  created() {
    this.fetchUser();
  },
  methods: {
    async fetchUser() {
      try {
        const { data } = await adminAPI.users.get();

        if (data.status === "error") {
          throw new Error(data.message);
        }

        this.users = data.users;
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        Toast.fire({
          icon: "error",
          title: "無法取得該會員資料，請稍後再試",
        });
      }
    },
    async toggleUserRole({ userId, isAdmin }) {
      try {
        const { data } = await adminAPI.users.update({
          userId,
          isAdmin: (!isAdmin).toString(),
        });

        if (data.status === "error") {
          throw new Error(data.message);
        }

        this.users = this.users.map((user) => {
          if (user.id === userId) {
            return {
              ...user,
              isAdmin: !isAdmin,
            };
          }
          return user;
        });
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法更新會員角色，請稍後再試",
        });
      }
    },
  },
};
</script>

<style scoped>
.email,
.role,
.btn {
  font-size: 18px;
}

.btn {
  text-decoration: none;
  font-weight: 400;
  border: 2px solid transparent;
}

.btn-link:hover {
  border-bottom: 2px solid #f28705;
}

.back {
  position: fixed;
  bottom: 0;
  left: 5%;
  border-radius: 5px 5px 0 0;
  border: 1px solid #f28705;
  border-bottom: none;
  color: #595959;
  font-size: 20px;
  font-weight: 500;
  animation: fadeInUp; 
  animation-duration: 5s;
}

.back:hover {
  color: white;
  background-color: #f28705;
  border-bottom: none;
  border-radius: 5px 5px 0 0;
}
</style>
