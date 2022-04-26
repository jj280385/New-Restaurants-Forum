// ./src/components/Navbar.vue
// 導覽列
<template>
  <nav class="navbar navbar-expand-lg fixed-top navbar-dark bg-dark">
    <router-link class="navbar-brand" to="/restaurants">
      Restaurant Forum
    </router-link>

    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon" />
    </button>

    <div id="navbarSupportedContent" class="navbar-collapse collapse">
      <div class="ml-auto d-flex align-items-center justify-content-end">
        <!-- is user is admin -->
        <button type="button" class="item my-1 mx-3">
          <router-link
            v-if="currentUser.isAdmin"
            to="/admin"
            class="text-white mr-3"
          >
            Admin System
          </router-link>
        </button>
        <template v-if="isAuthenticated">
          <!-- is user is login -->
          <button type="button" class="item my-1 mx-3">
            <router-link
              :to="{ name: 'users', params: { id: currentUser.id } }"
              class="text-white"
            >
              My Account
            </router-link>
          </button>
          <button type="button" class="item my-1 mx-3" @click="logout">
            Logout
          </button>
        </template>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["currentUser", "isAuthenticated"]),
  },
  methods: {
    logout() {
      this.$store.commit("revokeAuthentication");
      this.$router.push("/signin");
    },
  },
};
</script>

<style scoped>
.navbar {
  animation: slideInDown;
  animation-duration: 2s;
  box-shadow: 0px 2px 20px 0px rgba(0, 0, 0, 0.45);
}

.navbar-toggler {
  min-width: 70px;
  margin-right: 0;
}

nav.bg-dark {
  padding: 12px 18px;
  background-color: rgba(140, 3, 3, 0.8) !important;
}

.navbar-brand,
.text-white,
.item {
  font-family: "Helvetica Neue";
}

.text-white,
.item {
  background-color: transparent;
  color: white;
  border: 1px solid rgba(140, 3, 3, 0.1);
  font-size: 20px;
  text-align: center;
}

.text-white {
  font-size: 20px;
  text-decoration: none;
}

.item:hover {
  border-bottom: 2px solid white;
}

@media (max-width: 575px) {
  .navbar-brand {
    font-size: 22px;
  }

  .text-white,
  .item {
    font-size: 14px;
  }
}

@media (min-width: 576px) and (max-width: 767px) {
  .navbar-brand {
    font-size: 20px;
  }
}

@media (min-width: 768px) and (max-width: 991px) {
  .navbar-brand {
    font-size: 22px;
  }
}

@media (min-width: 992px) {
  .navbar-brand {
    font-size: 25px;
  }

  .ml-auto {
    --animate-duration: 2s;
  }

  .item {
    height: 45px;
    padding: 8px;
    background-color: transparent;
    color: white;
    border: 1px solid rgba(140, 3, 3, 0.1);
    font-size: 20px;
    text-align: center;
  }

  .text-white {
    font-size: 20px;
    text-decoration: none;
  }
}
</style>