<template>
  <div class="main">
      <button 
      type="button" 
      class="btn btn-link back" 
      @click="$router.back()"
      >
        &lt; GO BACK
      </button>
    <Spinner v-if="isLoading" class="spinner"/>
    <div v-else class="main-container">
    <template >
      <div class="user mb-5">
        <UserProfileCard
          :user="user"
          :is-current-user="currentUser.id === user.id"
          :initial-is-followed="isFollowed"
        />
        <div class="row">
          <div class="col-md-4">
            <UserFollowingsCard :followings="user.Followings" />
            <UserFollowersCard :followers="user.Followers" />
          </div>
          <div class="col-md-8">
            <UserCommentsCard :comments="user.Comments" />
            <UserFavoritedRestaurantsCard
              :favoritedRestaurants="user.FavoritedRestaurants"
            />
          </div>
        </div>
      </div>
    </template>
    </div>

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

export default {
  name: "User",
  components: {
    UserProfileCard,
    UserFollowingsCard,
    UserFollowersCard,
    UserCommentsCard,
    UserFavoritedRestaurantsCard,
    Spinner,
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

        console.log("error", error);
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
/* .main {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 8%;
  animation: zoomIn; 
  animation-duration: 3s;
} */

.back {
  text-decoration: none;
}

.main-container {
  border: 1px solid #D5CEC0;
  width: 75%;
  animation: zoomIn; 
  animation-duration: 3s;
}

.main-container:hover {
  box-shadow: 10px 0 20px rgba(0, 0, 0, 0.2);
  border: 1px solid #8c0303;
  border-radius: 10px;
  transition-duration: 2s;
}

</style>