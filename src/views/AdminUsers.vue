<template>
  <div>
    <div class="admin-container py-3 px-2">
      <AdminNav />
      <Spinner v-if="isLoading" class="admin-spinner" />
      <table v-else class="table my-4">
        <thead class="thead">
          <tr class="tr-header">
            <th scope="col" class="column pl-3 col-1 col-sm-1" width="100">ID</th>
            <th scope="col" class="column col-6 col-sm-6">Email</th>
            <th scope="col" width="150" class="column col-2 col-sm-2">Role</th>
            <th scope="col" width="150" class="column col-3 col-sm-3">Action</th>
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
                class="btn btn-link toggle"
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
    <div class="back">
      <button type="button" class="btn btn-link back-btn" @click="$router.back()">
        <img src="./../assets/icons/back.png" class="back-icon">
      </button>
    </div>
    <BottomNavTabsForPage class="bottom-navtabs"/>
  </div>
</template>

<script>
import AdminNav from "./../components/AdminNav";
import { mapState } from "vuex";
import adminAPI from "./../apis/admin";
import { Toast } from "./../utils/helpers";
import Spinner from "./../components/Spinner";
import BottomNavTabsForPage from "./../components/BottomNavTabsForPage";


export default {
  components: {
    AdminNav,
    Spinner,
    BottomNavTabsForPage
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

        Toast.fire({
          icon: "success",
          title: "已成功更新會員角色",
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
.btn {
    text-decoration: none;
    font-weight: 400;
    border: 2px solid transparent;
  }

  .btn-link:hover {
    border-bottom: 2px solid #f28705;
  }

@media (max-width: 576px) {
  .back {
    display: none;
  }

  .bottom-navtabs {
    animation: fadeInUp;
    animation-duration: 3s;
  }

  .admin-container {
    border: none;
    margin: 20% 0;
    width: 100%;
  }

  .column, .email {
    font-size: 18px;
  }

  .role, .btn {
    font-size: 16px;
  }

  .toggle{
    padding: 0;
  }
}

@media (min-width: 576px) {
  .bottom-navtabs {
    display: none;
  }
}

@media (min-width: 576px) and (max-width: 767px) {
  .column, .email {
    font-size: 18px;
  }

  .role, .btn {
    font-size: 16px;
  }
}

@media (min-width: 768px) and (max-width: 991px) {
  .column, .email {
    font-size: 20px;
  }

  .role, .btn {
    font-size: 18px;
  }
}

@media (min-width: 992px) {
  .column, .email {
    font-size: 22px;
  }

  .role, .btn {
    font-size: 20px;
  }
}
</style>
