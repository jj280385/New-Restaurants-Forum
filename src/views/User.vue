<template>
  <div class="main">
    <Spinner v-if="isLoading" class="spinner" />
    <div v-else class="main-container">
      <template>
        <div class="user mb-5">
          <UserProfileCard
            :user="user"
            :is-current-user="currentUser.id === user.id"
            :initial-is-followed="isFollowed"
          />
          <div class="row">
            <div class="col-md-4 col-sm-6 col-12">
              <UserFollowingsCard :followings="user.Followings" />
              <UserFollowersCard :followers="user.Followers" />
            </div>
            <div class="col-md-8 col-sm-6 col-12">
              <UserCommentsCard :comments="user.Comments" />
              <UserFavoritedRestaurantsCard
                :favoritedRestaurants="user.FavoritedRestaurants"
              />
            </div>
          </div>
        </div>
      </template>
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
import UserProfileCard from "../components/UserProfileCard.vue";
import UserFollowingsCard from "../components/UserFollowingsCard.vue";
import UserFollowersCard from "../components/UserFollowersCard.vue";
import UserCommentsCard from "../components/UserCommentsCard.vue";
import UserFavoritedRestaurantsCard from "../components/UserFavoritedRestaurantsCard.vue";
import usersAPI from "./../apis/users";
import { Toast } from "./../utils/helpers";
import { mapState } from "vuex";
import Spinner from "./../components/Spinner";
import BottomNavTabsForPage from "./../components/BottomNavTabsForPage";

export default {
  name: "User",
  components: {
    UserProfileCard,
    UserFollowingsCard,
    UserFollowersCard,
    UserCommentsCard,
    UserFavoritedRestaurantsCard,
    Spinner,
    BottomNavTabsForPage
  },
  created() {
    const { id: userId } = this.$route.params;
    this.fetchUser(userId);
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  beforeRouteUpdate(to, from, next) {
    const { id } = to.params;
    this.fetchUser(id);
    next();
  },
  data() {
    return {
      user: {
        id: -1,
        name: "",
        email: "",
        image: "",
        Comments: [],
        FavoritedRestaurants: [],
        Followers: [],
        Followings: [],
      },
      isFollowed: false,
      isLoading: true,
    };
  },
  methods: {
    async fetchUser(userId) {
      try {
        this.isLoading = true;

        const { data } = await usersAPI.get({ userId });
        const { profile } = data;
        this.user = {
          id: profile.id,
          name: profile.name,
          email: profile.email,
          image: profile.image,
          Comments: profile.Comments,
          FavoritedRestaurants: profile.FavoritedRestaurants,
          Followers: profile.Followers,
          Followings: profile.Followings,
        };
        this.isFollowed = data.isFollowed;
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        Toast.fire({
          icon: "error",
          title: "無法取得該使用者資料，請稍後再試",
        });
      }
    },
  },
};
</script>

<style scoped>
.main-container {
  border: 1px solid #d5cec0;
  animation: zoomIn;
  animation-duration: 3s;
}

.main-container:hover {
  box-shadow: 10px 0 20px rgba(0, 0, 0, 0.2);
  border: 1px solid #8c0303;
  border-radius: 10px;
  transition-duration: 1s;
}

@media (max-width: 575px) {
  .main-container {
    margin: 18% 0 15% 0;
  }

  .back {
    display: none;
  }
}

@media (min-width: 576px) {
  .bottom-navtabs {
    display: none;
  }
}

@media (min-width: 576px) and (max-width: 767px) {
  .col-sm-6 {
    padding: 0 8px;
  }

  .main-container {
    width: 70%;
  }
}

@media (min-width: 768px) and (max-width: 991px) {
  .main-container {
    width: 70%;
  }
}

@media (min-width: 992px) {
  .main-container {
    width: 75%;
  }
}
</style>