<template>
  <div class="py-5">
    <Spinner v-if="isLoading" />
    <template v-else>
      <div class="container">
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